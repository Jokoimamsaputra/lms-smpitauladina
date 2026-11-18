import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  PlusCircle,
  Printer,
  Edit3,
  Trash2,
  Search,
  Clock,
  Users,
  CheckCircle2,
  FileText,
  Filter,
  Check,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TeacherJournal } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const TeacherJournalPage: React.FC = () => {
  const {
    journals,
    addJournal,
    updateJournal,
    deleteJournal,
    currentUser,
    classes,
    subjects,
    schoolProfile,
  } = useStore();

  const isTeacher = currentUser.role === 'guru';
  const isAdminOrPrincipal = currentUser.role === 'admin' || currentUser.role === 'kepala';

  const [selectedMonth, setSelectedMonth] = useState('11');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [filterClassId, setFilterClassId] = useState('all');
  const [filterSubjectId, setFilterSubjectId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [editingJournalId, setEditingJournalId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    classId: classes[0]?.id || 'class-xi-mipa-1',
    className: classes[0]?.name || 'XI MIPA 1',
    subjectId: subjects[0]?.id || 'subj-info-xi',
    subjectName: subjects[0]?.name || 'Informatika',
    journalDate: '2026-11-18',
    dayName: 'Rabu',
    periodTime: 'Jam 1-2 (07.15 - 08.45 WIB)',
    materialTopic: '',
    activityDescription: '',
    learningMedia: 'Laptop, LCD Proyektor, Modul Ajar Digital',
    presentCount: 35,
    absentCount: 1,
    attendanceNotes: '1 siswa izin sakit',
    notes: '',
    status: 'selesai' as 'selesai' | 'tertunda',
  });

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingJournalId(null);
    setFormData({
      classId: classes[0]?.id || 'class-xi-mipa-1',
      className: classes[0]?.name || 'XI MIPA 1',
      subjectId: subjects[0]?.id || 'subj-info-xi',
      subjectName: subjects[0]?.name || 'Informatika',
      journalDate: '2026-11-18',
      dayName: 'Rabu',
      periodTime: 'Jam 1-2 (07.15 - 08.45 WIB)',
      materialTopic: '',
      activityDescription: '',
      learningMedia: 'Laptop, LCD Proyektor, Modul Ajar Digital',
      presentCount: 35,
      absentCount: 1,
      attendanceNotes: 'Semua siswa hadir tertib',
      notes: '',
      status: 'selesai',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (journal: TeacherJournal) => {
    setEditingJournalId(journal.id);
    setFormData({
      classId: journal.classId,
      className: journal.className,
      subjectId: journal.subjectId,
      subjectName: journal.subjectName,
      journalDate: journal.journalDate,
      dayName: journal.dayName,
      periodTime: journal.periodTime,
      materialTopic: journal.materialTopic,
      activityDescription: journal.activityDescription,
      learningMedia: journal.learningMedia,
      presentCount: journal.presentCount,
      absentCount: journal.absentCount,
      attendanceNotes: journal.attendanceNotes,
      notes: journal.notes || '',
      status: journal.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.materialTopic || !formData.activityDescription) {
      triggerToast('Mohon lengkapi topik materi dan ringkasan aktivitas.');
      return;
    }

    const selectedCls = classes.find((c) => c.id === formData.classId);
    const selectedSubj = subjects.find((s) => s.id === formData.subjectId);

    const payload = {
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      classId: formData.classId,
      className: selectedCls ? selectedCls.name : formData.className,
      subjectId: formData.subjectId,
      subjectName: selectedSubj ? selectedSubj.name : formData.subjectName,
      journalDate: formData.journalDate,
      dayName: formData.dayName,
      periodTime: formData.periodTime,
      materialTopic: formData.materialTopic,
      activityDescription: formData.activityDescription,
      learningMedia: formData.learningMedia,
      presentCount: Number(formData.presentCount),
      absentCount: Number(formData.absentCount),
      attendanceNotes: formData.attendanceNotes,
      notes: formData.notes,
      status: formData.status,
    };

    if (editingJournalId) {
      updateJournal(editingJournalId, payload);
      triggerToast('Jurnal mengajar berhasil diperbarui.');
    } else {
      addJournal(payload);
      triggerToast('Jurnal mengajar pertemuan baru berhasil disimpan.');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, topic: string) => {
    if (window.confirm(`Hapus jurnal mengajar topik "${topic}"?`)) {
      deleteJournal(id);
      triggerToast('Jurnal mengajar berhasil dihapus.');
    }
  };

  // Filtered Journals
  const filteredJournals = journals.filter((j) => {
    const matchClass = filterClassId === 'all' || j.classId === filterClassId;
    const matchSubject = filterSubjectId === 'all' || j.subjectId === filterSubjectId;
    const matchSearch =
      !searchQuery ||
      j.materialTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.activityDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.className.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSubject && matchSearch;
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
          { label: isTeacher ? 'Dashboard Guru' : 'Akademik', href: isTeacher ? '/teacher/dashboard' : '/admin/dashboard' },
          { label: 'Jurnal Mengajar Guru' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Jurnal Mengajar Guru & Agenda Kelas
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pencatatan resmi kegiatan belajar mengajar harian, ketercapaian silabus, dan presensi rombel di SMA Techsoe.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPrintModalOpen(true)}
            leftIcon={<Printer className="w-4 h-4" />}
            className="flex-1 sm:flex-initial justify-center min-h-[40px]"
          >
            Cetak Rekap Bulanan
          </Button>
          {(isTeacher || isAdminOrPrincipal) && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAdd}
              leftIcon={<PlusCircle className="w-4 h-4" />}
              className="flex-1 sm:flex-initial justify-center min-h-[40px]"
            >
              Isi Jurnal Mengajar Baru
            </Button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px] text-slate-400">Total Sesi Bulan Ini</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{filteredJournals.length} Sesi</div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">Terdata pada sistem KBM</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px] text-slate-400">Ketercapaian Materi</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">98.4%</div>
          <p className="text-[11px] text-slate-400 mt-1">Sesuai alur tujuan pembelajaran</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px] text-slate-400">Rata-rata Kehadiran Kelas</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">35.4 Siswa</div>
          <p className="text-[11px] text-slate-400 mt-1">Dari rata-rata 36 siswa per rombel</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px] text-slate-400">Beban Mengajar Efektif</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">24 Jam / Pekan</div>
          <p className="text-[11px] text-slate-400 mt-1">Standar pemenuhan sertifikasi</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium text-slate-700"
            >
              <option value="11">November 2026</option>
              <option value="10">Oktober 2026</option>
              <option value="09">September 2026</option>
              <option value="08">Agustus 2026</option>
            </select>
          </div>

          <div>
            <select
              value={filterClassId}
              onChange={(e) => setFilterClassId(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium text-slate-700"
            >
              <option value="all">Semua Rombel</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterSubjectId}
              onChange={(e) => setFilterSubjectId(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium text-slate-700"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi atau topik..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] bg-white"
          />
        </div>
      </div>

      {/* Journal Table List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4">Tanggal & Jam</th>
                <th className="py-3.5 px-4">Rombel & Mapel</th>
                <th className="py-3.5 px-4">Materi Pembelajaran</th>
                <th className="py-3.5 px-4">Aktivitas KBM & Media</th>
                <th className="py-3.5 px-4 text-center">Presensi Siswa</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJournals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-slate-600">Belum ada catatan jurnal mengajar pada filter ini</p>
                    <p className="text-[11px] mt-1">Klik tombol 'Isi Jurnal Mengajar Baru' untuk mendokumentasikan KBM.</p>
                  </td>
                </tr>
              ) : (
                filteredJournals.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 text-center font-medium text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <p className="font-bold text-slate-900">{item.dayName}, {item.journalDate}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.periodTime}</span>
                      </p>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge variant="primary" size="sm" className="mb-1">
                        {item.className}
                      </Badge>
                      <p className="font-semibold text-slate-800">{item.subjectName}</p>
                      <p className="text-[10px] text-slate-400">Pendidik: {item.teacherName}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-900 leading-snug">{item.materialTopic}</p>
                      {item.notes && (
                        <p className="text-[11px] text-slate-500 italic mt-0.5">Catatan: {item.notes}</p>
                      )}
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-slate-700 leading-relaxed text-[11px] line-clamp-2">
                        {item.activityDescription}
                      </p>
                      <span className="text-[10px] text-blue-600 font-medium block mt-1">
                        Media: {item.learningMedia}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <p className="font-bold text-emerald-700">{item.presentCount} Hadir</p>
                      <p className="text-[10px] text-slate-400">{item.absentCount} Tidak Hadir</p>
                      <span className="text-[10px] text-amber-600 block mt-0.5">{item.attendanceNotes}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={item.status === 'selesai' ? 'success' : 'warning'} size="sm">
                        {item.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Jurnal"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.materialTopic)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Jurnal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Input / Edit Jurnal Mengajar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJournalId ? 'Edit Catatan Jurnal Mengajar' : 'Isi Jurnal Mengajar Guru (KBM Harian)'}
        description="Dokumentasikan materi, metode kegiatan, dan capaian presensi kelas yang baru saja selesai."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rombongan Belajar (Kelas)
              </label>
              <select
                value={formData.classId}
                onChange={(e) => {
                  const cls = classes.find((c) => c.id === e.target.value);
                  setFormData({ ...formData, classId: e.target.value, className: cls ? cls.name : formData.className });
                }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-medium"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Pelajaran
              </label>
              <select
                value={formData.subjectId}
                onChange={(e) => {
                  const subj = subjects.find((s) => s.id === e.target.value);
                  setFormData({ ...formData, subjectId: e.target.value, subjectName: subj ? subj.name : formData.subjectName });
                }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-medium"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal KBM
              </label>
              <input
                type="date"
                value={formData.journalDate}
                onChange={(e) => setFormData({ ...formData, journalDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hari
              </label>
              <select
                value={formData.dayName}
                onChange={(e) => setFormData({ ...formData, dayName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jam Pelajaran
              </label>
              <input
                type="text"
                value={formData.periodTime}
                onChange={(e) => setFormData({ ...formData, periodTime: e.target.value })}
                placeholder="mis. Jam 1-2 (07.15 - 08.45 WIB)"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Materi Pokok / Topik Pembelajaran
            </label>
            <input
              type="text"
              value={formData.materialTopic}
              onChange={(e) => setFormData({ ...formData, materialTopic: e.target.value })}
              placeholder="mis. Struktur Kontrol Perulangan dan Algoritma Binary Search"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ringkasan Aktivitas Belajar Mengajar
            </label>
            <textarea
              rows={3}
              value={formData.activityDescription}
              onChange={(e) => setFormData({ ...formData, activityDescription: e.target.value })}
              placeholder="Jelaskan secara ringkas kegiatan pembuka, inti eksplorasi materi, dan penutup pembelajaran..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alat / Media Pembelajaran yang Digunakan
            </label>
            <input
              type="text"
              value={formData.learningMedia}
              onChange={(e) => setFormData({ ...formData, learningMedia: e.target.value })}
              placeholder="mis. LCD Proyektor, Google Colab, Buku Teks Kemendikdasmen"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Siswa Hadir
              </label>
              <input
                type="number"
                value={formData.presentCount}
                onChange={(e) => setFormData({ ...formData, presentCount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Siswa Absen
              </label>
              <input
                type="number"
                value={formData.absentCount}
                onChange={(e) => setFormData({ ...formData, absentCount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status KBM
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="selesai">Selesai (Tuntas)</option>
                <option value="tertunda">Tertunda</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Siswa Tidak Hadir / Kejadian Khusus
            </label>
            <input
              type="text"
              value={formData.attendanceNotes}
              onChange={(e) => setFormData({ ...formData, attendanceNotes: e.target.value })}
              placeholder="mis. 1 siswa izin sakit (Doni Pratama), kelas tertib dan aktif"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingJournalId ? 'Simpan Perubahan Jurnal' : 'Simpan Jurnal KBM'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Cetak Rekap Bulanan Jurnal Mengajar */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Rekapitulasi Jurnal Mengajar Guru (Siap Cetak / Supervisi)"
        description="Format lembar kendali KBM resmi untuk dokumen akreditasi dan supervisi Kepala Sekolah."
      >
        <div className="space-y-4">
          {/* Header Kop Surat Sekolah */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
            <h3 className="font-extrabold text-sm text-[#142B50] tracking-wide uppercase">
              {schoolProfile.name}
            </h3>
            <p className="text-[11px] text-slate-600">
              NPSN: {schoolProfile.npsn} • Akreditasi: {schoolProfile.accreditation} • {schoolProfile.address}
            </p>
            <div className="pt-2 border-t border-slate-200 mt-2">
              <span className="font-bold text-xs text-slate-800 uppercase block">
                BUKU AGENDA & JURNAL KELAS MENGAJAR BULANAN
              </span>
              <span className="text-[10px] text-slate-500">
                Bulan: November 2026 • Tahun Ajaran {schoolProfile.activeAcademicYear} ({schoolProfile.activeSemester})
              </span>
            </div>
          </div>

          {/* Teacher Summary Details */}
          <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-lg bg-blue-50/60 border border-blue-200/60">
            <div>
              <span className="text-slate-500 block text-[10px]">Nama Guru Pengampu:</span>
              <p className="font-bold text-[#142B50]">{currentUser.name}</p>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">NIP / NUPTK:</span>
              <p className="font-mono text-slate-700">{currentUser.identifierNumber}</p>
            </div>
          </div>

          {/* Compact Mini Table of Records */}
          <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-2 px-2.5">Tgl & Hari</th>
                  <th className="py-2 px-2.5">Kelas</th>
                  <th className="py-2 px-2.5">Materi Pokok</th>
                  <th className="py-2 px-2.5 text-center">Hadir</th>
                  <th className="py-2 px-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJournals.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-2.5 whitespace-nowrap">{item.dayName}, {item.journalDate}</td>
                    <td className="py-2 px-2.5 font-semibold text-slate-700">{item.className}</td>
                    <td className="py-2 px-2.5 font-medium text-slate-900">{item.materialTopic}</td>
                    <td className="py-2 px-2.5 text-center text-emerald-700 font-bold">{item.presentCount}</td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature Block */}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 text-center text-xs">
            <div>
              <span className="text-slate-500 text-[10px]">Mengetahui,</span>
              <p className="font-semibold text-slate-800 mt-1">Kepala SMA Techsoe</p>
              <div className="h-12 flex items-center justify-center text-slate-400 italic text-[10px]">
                (Tanda Tangan Digital)
              </div>
              <p className="font-bold text-slate-900">{schoolProfile.principalName}</p>
              <span className="text-[10px] text-slate-500 font-mono">NIP 197405101999031002</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px]">Jakarta, 18 November 2026</span>
              <p className="font-semibold text-slate-800 mt-1">Guru Mata Pelajaran</p>
              <div className="h-12 flex items-center justify-center text-slate-400 italic text-[10px]">
                (Tanda Tangan Digital)
              </div>
              <p className="font-bold text-slate-900">{currentUser.name}</p>
              <span className="text-[10px] text-slate-500 font-mono">{currentUser.identifierNumber}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPrintModalOpen(false)}
            >
              Tutup
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                triggerToast('Format rekap bulanan jurnal berhasil dikirim ke antrian cetak / PDF.');
                setIsPrintModalOpen(false);
              }}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Unduh Berkas PDF Resmi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
