import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  PlusCircle,
  Search,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Assignment } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const AssignmentListPage: React.FC = () => {
  const navigate = useNavigate();
  const { assignments, submissions, subjects, classes, addAssignment, currentUser } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New assignment form
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'subj-info-xi');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-11-30T23:59');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const subj = subjects.find((s) => s.id === subjectId) || subjects[0];
    addAssignment({
      subjectId: subj.id,
      subjectName: subj.name,
      classId: subj.classId,
      className: subj.className,
      teacherId: currentUser.id,
      title,
      description,
      instructions: [
        'Baca dengan seksama instruksi tugas di lembar kerja.',
        'Unggah berkas jawaban format PDF atau source code.',
        'Kumpulkan sebelum tenggat waktu berakhir.',
      ],
      dueDate: new Date(dueDate).toISOString(),
      maxScore: 100,
      status: 'published',
    });

    setIsAddModalOpen(false);
    triggerToast(`Tugas baru "${title}" berhasil dipublikasikan ke rombel.`);
  };

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.className.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubjectId === 'all' || a.subjectId === selectedSubjectId;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B50] text-white px-4 py-3 rounded-xl shadow-modal flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'Pembelajaran', href: '/virtual-classes' },
          { label: 'Manajemen Tugas Siswa' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Penugasan & Proyek Pembelajaran
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pantau batas pengumpulan tugas, kumpulkan lembar kerja, dan lakukan penilaian tugas siswa.
          </p>
        </div>

        {currentUser.role === 'guru' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Buat Tugas Baru
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul tugas atau mata pelajaran..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 shrink-0 font-medium">Mata Pelajaran:</span>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-white text-slate-700 w-full sm:w-auto"
          >
            <option value="all">Semua Mata Pelajaran</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.className})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignment List Cards */}
      <div className="space-y-3">
        {filteredAssignments.map((asg) => {
          const totalSubms = submissions.filter((s) => s.assignmentId === asg.id);
          const gradedSubms = totalSubms.filter((s) => s.status === 'graded');
          const studentSubm = totalSubms.find((s) => s.studentId === currentUser.id);

          return (
            <div
              key={asg.id}
              onClick={() => navigate(`/assignments/${asg.id}`)}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#142B50] hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {asg.subjectName}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{asg.className}</span>
                  <Badge variant="default" size="sm">Maks: {asg.maxScore} Poin</Badge>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{asg.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-1">{asg.description}</p>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-amber-700 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Tenggat: {new Date(asg.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                  </span>
                </div>
              </div>

              {/* Status & Submissions Meta */}
              <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 justify-between md:justify-end">
                {currentUser.role === 'siswa' ? (
                  <div>
                    {studentSubm ? (
                      studentSubm.status === 'graded' ? (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Nilai Anda</span>
                          <span className="text-base font-bold text-emerald-600">{studentSubm.score} / 100</span>
                        </div>
                      ) : (
                        <Badge variant="warning">Telah Dikumpulkan</Badge>
                      )
                    ) : (
                      <Badge variant="danger">Belum Dikumpulkan</Badge>
                    )}
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Pengumpulan
                    </span>
                    <span className="text-xs font-bold text-[#142B50]">
                      {totalSubms.length} Terkumpul ({gradedSubms.length} Dinilai)
                    </span>
                  </div>
                )}

                <Button variant="outline" size="sm">
                  Detail Tugas →
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Tambah Tugas Baru */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Buat Penugasan Baru"
        description="Publikasikan instruksi dan tenggat pengumpulan tugas kepada siswa."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Judul Tugas
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Praktik Algoritma Sorting Python"
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Pelajaran & Kelas
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.className})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tenggat Waktu (Due Date)
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi & Instruksi Pengerjaan
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan petunjuk pengerjaan dan kriteria penilaian..."
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publikasikan Tugas
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
