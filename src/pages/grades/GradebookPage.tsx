import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Download,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  Edit2,
  FileSpreadsheet,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { GradeRecord } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const GradebookPage: React.FC = () => {
  const navigate = useNavigate();
  const { grades, subjects, classes, updateGradeRecord } = useStore();

  const [selectedSubjectId, setSelectedSubjectId] = useState('subj-info-xi');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGrade, setEditingGrade] = useState<GradeRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Edit form state
  const [assignmentAvg, setAssignmentAvg] = useState(90);
  const [quizAvg, setQuizAvg] = useState(85);
  const [midterm, setMidterm] = useState(90);
  const [finalExam, setFinalExam] = useState(90);
  const [teacherNotes, setTeacherNotes] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredGrades = grades.filter((g) => {
    const matchesSubject = selectedSubjectId === 'all' || g.subjectId === selectedSubjectId;
    const matchesSearch =
      g.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.studentNis.includes(searchQuery);
    return matchesSubject && matchesSearch;
  });

  const handleOpenEdit = (grade: GradeRecord) => {
    setEditingGrade(grade);
    setAssignmentAvg(grade.assignmentsAverage);
    setQuizAvg(grade.quizAverage);
    setMidterm(grade.midtermExam);
    setFinalExam(grade.finalExam);
    setTeacherNotes(grade.teacherNotes);
    setIsEditModalOpen(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGrade) return;

    // Recalculate final score: 30% assignments + 20% quiz + 25% UTS + 25% UAS
    const newFinalScore = Math.round(
      assignmentAvg * 0.3 + quizAvg * 0.2 + midterm * 0.25 + finalExam * 0.25
    );
    const newLetter: 'A' | 'B' | 'C' | 'D' =
      newFinalScore >= 85 ? 'A' : newFinalScore >= 75 ? 'B' : newFinalScore >= 60 ? 'C' : 'D';

    updateGradeRecord(editingGrade.id, {
      assignmentsAverage: Number(assignmentAvg),
      quizAverage: Number(quizAvg),
      midtermExam: Number(midterm),
      finalExam: Number(finalExam),
      finalScore: newFinalScore,
      letterGrade: newLetter,
      teacherNotes,
    });

    setIsEditModalOpen(false);
    triggerToast(`Nilai ${editingGrade.studentName} berhasil diperbarui.`);
  };

  const handleExportSimulation = () => {
    triggerToast('Simulasi ekspor buku nilai (.xlsx) berhasil diunduh.');
  };

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
          { label: 'Penilaian', href: '/gradebook' },
          { label: 'Buku Nilai (Gradebook)' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Gradebook & Rekap Nilai Akademik
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Matriks evaluasi nilai tugas, kuis, UTS, dan UAS per mata pelajaran dan rombongan belajar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportSimulation}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Excel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/reports')}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Cetak Rapor Digital
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa atau NISN..."
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

      {/* Grade Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Mata Pelajaran</th>
                <th className="py-3.5 px-4 text-center">Rata-rata Tugas</th>
                <th className="py-3.5 px-4 text-center">Kuis</th>
                <th className="py-3.5 px-4 text-center">UTS</th>
                <th className="py-3.5 px-4 text-center">UAS</th>
                <th className="py-3.5 px-4 text-center">Nilai Akhir</th>
                <th className="py-3.5 px-4 text-center">Predikat</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrades.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    Tidak ada data nilai yang cocok.
                  </td>
                </tr>
              ) : (
                filteredGrades.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{g.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{g.studentNis}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {g.subjectName}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {g.assignmentsAverage}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {g.quizAverage}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {g.midtermExam}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {g.finalExam}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-sm text-[#142B50] font-mono">
                        {g.finalScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={g.letterGrade === 'A' ? 'success' : 'primary'} size="sm">
                        Predikat {g.letterGrade}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(g)}
                        leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                      >
                        Ubah
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit Nilai */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Nilai: ${editingGrade?.studentName || ''}`}
        description="Perbarui nilai komponen evaluasi tugas, kuis, UTS, dan UAS."
      >
        <form onSubmit={handleSaveGrade} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rata-rata Tugas (30%)
              </label>
              <input
                type="number"
                value={assignmentAvg}
                onChange={(e) => setAssignmentAvg(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rata-rata Kuis (20%)
              </label>
              <input
                type="number"
                value={quizAvg}
                onChange={(e) => setQuizAvg(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ujian Tengah Semester (25%)
              </label>
              <input
                type="number"
                value={midterm}
                onChange={(e) => setMidterm(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ujian Akhir Semester (25%)
              </label>
              <input
                type="number"
                value={finalExam}
                onChange={(e) => setFinalExam(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Kemajuan Belajar Guru
            </label>
            <textarea
              rows={3}
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              placeholder="Tuliskan catatan deskripsi capaian kompetensi siswa..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Simpan Nilai Akhir
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
