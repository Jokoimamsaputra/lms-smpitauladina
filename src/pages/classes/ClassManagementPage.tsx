import React, { useState } from 'react';
import {
  GraduationCap,
  PlusCircle,
  Search,
  Users,
  Edit,
  Trash2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SchoolClass } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const ClassManagementPage: React.FC = () => {
  const { classes, addClass, updateClass, deleteClass, users } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form states
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('11');
  const [educationLevel, setEducationLevel] = useState<'SD' | 'SMP' | 'SMA' | 'SMK'>('SMA');
  const [homeroomTeacherId, setHomeroomTeacherId] = useState('user-guru-1');
  const [studentCount, setStudentCount] = useState(36);

  const teachers = users.filter((u) => u.role === 'guru');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.homeroomTeacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setClassName('');
    setGrade('10');
    setEducationLevel('SMA');
    setHomeroomTeacherId(teachers[0]?.id || 'user-guru-1');
    setStudentCount(36);
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className) return;

    const teacher = teachers.find((t) => t.id === homeroomTeacherId);
    addClass({
      name: className,
      grade,
      educationLevel,
      homeroomTeacherId,
      homeroomTeacherName: teacher ? teacher.name : 'Siti Rahmawati, M.Pd.',
      studentCount: Number(studentCount),
      academicYearId: 'ay-2026',
    });

    setIsAddModalOpen(false);
    triggerToast(`Kelas ${className} berhasil ditambahkan.`);
  };

  const handleOpenEdit = (cls: SchoolClass) => {
    setSelectedClass(cls);
    setClassName(cls.name);
    setGrade(cls.grade);
    setEducationLevel(cls.educationLevel);
    setHomeroomTeacherId(cls.homeroomTeacherId);
    setStudentCount(cls.studentCount);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    const teacher = teachers.find((t) => t.id === homeroomTeacherId);
    updateClass(selectedClass.id, {
      name: className,
      grade,
      educationLevel,
      homeroomTeacherId,
      homeroomTeacherName: teacher ? teacher.name : selectedClass.homeroomTeacherName,
      studentCount: Number(studentCount),
    });

    setIsEditModalOpen(false);
    triggerToast(`Perubahan data rombel ${className} berhasil disimpan.`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus kelas ${name}?`)) {
      deleteClass(id);
      triggerToast(`Rombel ${name} telah dihapus.`);
    }
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

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Data Kelas & Rombel' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Data Kelas & Rombongan Belajar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan rombel kelas, wali kelas penanggung jawab, dan distribusi kapasitas siswa.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Tambah Kelas Baru
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama kelas atau wali kelas..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Total: <strong>{filteredClasses.length} Rombel</strong>
        </span>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-[#142B50] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="primary">Tingkat {cls.grade}</Badge>
                <span className="text-[10px] text-slate-400 font-medium">
                  {cls.educationLevel}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-3">{cls.name}</h3>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{cls.studentCount} Siswa Terdaftar</span>
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Wali Kelas:</span>
                <span className="font-semibold text-slate-800 mt-0.5 block line-clamp-1">
                  {cls.homeroomTeacherName}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Aktif
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(cls)}
                  className="p-1.5 text-slate-500 hover:text-[#142B50] hover:bg-slate-100 rounded cursor-pointer"
                  title="Edit Rombel"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cls.id, cls.name)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                  title="Hapus Rombel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Kelas */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Rombongan Belajar Baru"
        description="Buat kelas baru dan tentukan wali kelas penanggung jawab."
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Rombel / Kelas
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Contoh: XI MIPA 3, XII IPS 1"
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Kelas
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
              >
                <option value="10">Kelas 10</option>
                <option value="11">Kelas 11</option>
                <option value="12">Kelas 12</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kapasitas Siswa
              </label>
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                min={1}
                max={50}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pilih Wali Kelas
            </label>
            <select
              value={homeroomTeacherId}
              onChange={(e) => setHomeroomTeacherId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.subjectSpecialization || 'Guru'})
                </option>
              ))}
            </select>
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
              Simpan Kelas
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Kelas */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Ubah Data Rombongan Belajar"
        description="Perbarui informasi kelas dan wali kelas."
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Rombel
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Kelas
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
              >
                <option value="10">Kelas 10</option>
                <option value="11">Kelas 11</option>
                <option value="12">Kelas 12</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jumlah Siswa
              </label>
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Wali Kelas
            </label>
            <select
              value={homeroomTeacherId}
              onChange={(e) => setHomeroomTeacherId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
