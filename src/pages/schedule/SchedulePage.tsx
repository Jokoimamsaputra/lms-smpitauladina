import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  PlusCircle,
  Filter,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Sparkles,
  School,
  FileText,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ScheduleItem } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    classes,
    subjects,
    users,
    schedules,
    addSchedule,
    deleteSchedule,
    schoolProfile,
  } = useStore();

  const isTeacher = currentUser.role === 'guru';
  const isStudent = currentUser.role === 'siswa';
  const isAdmin = currentUser.role === 'admin';
  const isStaff = isTeacher || isAdmin || currentUser.role === 'kepala';

  const daysList: ('Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat')[] = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
  ];

  // Determine current day in Indonesian
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayIndex = new Date().getDay();
  const rawToday = dayNames[todayIndex];
  const initialDay = daysList.includes(rawToday as any) ? rawToday : 'Senin';

  const [selectedDay, setSelectedDay] = useState<string>(initialDay);
  const [filterClassId, setFilterClassId] = useState<string>(
    isStudent ? currentUser.classId || 'cls-1' : 'all'
  );
  const [filterTeacherId, setFilterTeacherId] = useState<string>(
    isTeacher ? currentUser.id : 'all'
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [formDay, setFormDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');
  const [formPeriod, setFormPeriod] = useState('07.15 - 08.45 (Jam 1-2)');
  const [formClassId, setFormClassId] = useState(classes[0]?.id || 'cls-1');
  const [formSubjectId, setFormSubjectId] = useState(subjects[0]?.id || 'sub-1');
  const [formTeacherId, setFormTeacherId] = useState(
    isTeacher ? currentUser.id : users.find((u) => u.role === 'guru')?.id || 'usr-2'
  );
  const [formRoom, setFormRoom] = useState('Ruang 11-A (Gedung Sains)');

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filtered schedules
  const filteredSchedules = schedules.filter((item) => {
    if (selectedDay !== 'Semua' && item.day !== selectedDay) return false;
    if (filterClassId !== 'all' && item.classId !== filterClassId) return false;
    if (filterTeacherId !== 'all' && item.teacherId !== filterTeacherId) return false;
    return true;
  });

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const selClass = classes.find((c) => c.id === formClassId);
    const selSub = subjects.find((s) => s.id === formSubjectId);
    const selTeacher = users.find((u) => u.id === formTeacherId);

    addSchedule({
      day: formDay,
      period: formPeriod,
      classId: formClassId,
      className: selClass?.name || 'IX JavaScript',
      subjectId: formSubjectId,
      subjectName: selSub?.name || 'Mata Pelajaran',
      teacherId: formTeacherId,
      teacherName: selTeacher?.name || 'Guru Pengampu',
      room: formRoom,
    });

    setIsAddModalOpen(false);
    showNotification('Jadwal pelajaran berhasil ditambahkan ke kalender KBM.');
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Portal Akademik', href: '/' },
          { label: 'Jadwal Pelajaran & KBM' },
        ]}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center space-x-3 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#142B50] tracking-tight">
              {isTeacher
                ? 'Jadwal Mengajar Guru'
                : isStudent
                ? 'Jadwal Pelajaran Mingguan'
                : 'Jadwal KBM & Alokasi Ruang Kelas'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#142B50]/10 text-[#142B50]">
              T.A. {schoolProfile.activeAcademicYear} ({schoolProfile.activeSemester})
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isTeacher
              ? 'Agenda tatap muka mengajar per kelas dengan akses cepat jurnal harian & absensi.'
              : 'Kalender sesi belajar tatap muka kelas XI MIPA dengan detail ruang laboratorium dan guru.'}
          </p>
        </div>

        {isStaff && (
          <Button
            variant="primary"
            className="bg-[#142B50] hover:bg-[#0E1E38] text-xs font-bold rounded-xl flex items-center gap-1.5 min-h-[44px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Jadwal KBM</span>
          </Button>
        )}
      </div>

      {/* Day Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setSelectedDay('Semua')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap min-h-[44px] flex items-center gap-1.5 ${
            selectedDay === 'Semua'
              ? 'bg-[#142B50] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Semua Hari ({schedules.length})</span>
        </button>

        {daysList.map((day) => {
          const count = schedules.filter((s) => s.day === day).length;
          const isToday = rawToday === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap min-h-[44px] flex items-center gap-1.5 ${
                selectedDay === day
                  ? 'bg-[#142B50] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{day}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedDay === day
                    ? 'bg-white/20 text-white'
                    : isToday
                    ? 'bg-blue-100 text-[#142B50]'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count} {isToday ? '• Hari Ini' : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Rombel / Kelas:</span>
            <select
              value={filterClassId}
              onChange={(e) => setFilterClassId(e.target.value)}
              disabled={isStudent}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20 disabled:opacity-75"
            >
              {!isStudent && <option value="all">Semua Kelas</option>}
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {!isStudent && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Guru Pengampu:</span>
              <select
                value={filterTeacherId}
                onChange={(e) => setFilterTeacherId(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                <option value="all">Semua Guru</option>
                {users
                  .filter((u) => u.role === 'guru')
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <strong className="text-slate-900">{filteredSchedules.length}</strong> sesi jam KBM
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#142B50]/40 transition space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header card: Day & Period */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#142B50] text-white">
                      {item.day}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                      {item.className}
                    </span>
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Hapus sesi jadwal KBM ini?')) {
                          deleteSchedule(item.id);
                          showNotification('Jadwal berhasil dihapus.');
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Hapus Jadwal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Subject & Time info */}
                <div className="mt-3 space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#142B50]" />
                    <span>{item.subjectName}</span>
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">{item.period}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.room}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Guru: <strong className="text-slate-800">{item.teacherName}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {isTeacher && item.teacherId === currentUser.id ? (
                  <button
                    type="button"
                    onClick={() => navigate('/teacher/journal')}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#142B50] font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Isi Jurnal Mengajar</span>
                  </button>
                ) : isStudent ? (
                  <button
                    type="button"
                    onClick={() => navigate('/materials')}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Materi Belajar</span>
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between text-[11px] text-slate-400">
                    <span>Status: Aktif</span>
                    <span className="font-semibold text-[#142B50]">Semester Ganjil</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 bg-white p-12 text-center rounded-2xl border border-slate-200/90 text-slate-400">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-sm">Tidak ada jadwal KBM pada hari atau filter ini.</p>
            <p className="text-xs mt-1">Pilih hari lain atau sesuaikan filter kelas di atas.</p>
          </div>
        )}
      </div>

      {/* Modal: Tambah Jadwal KBM */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Jadwal KBM Baru"
      >
        <form onSubmit={handleSaveSchedule} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hari</label>
              <select
                value={formDay}
                onChange={(e) => setFormDay(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                {daysList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alokasi Waktu (Jam Pelajaran)
              </label>
              <input
                type="text"
                value={formPeriod}
                onChange={(e) => setFormPeriod(e.target.value)}
                placeholder="Contoh: 07.15 - 08.45 (Jam 1-2)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kelas / Rombel</label>
              <select
                value={formClassId}
                onChange={(e) => setFormClassId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <select
                value={formSubjectId}
                onChange={(e) => setFormSubjectId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Guru Pengampu</label>
              <select
                value={formTeacherId}
                onChange={(e) => setFormTeacherId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                {users
                  .filter((u) => u.role === 'guru')
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ruang Kelas / Lab</label>
              <input
                type="text"
                value={formRoom}
                onChange={(e) => setFormRoom(e.target.value)}
                placeholder="Contoh: Ruang 11-A (Gedung Sains)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="text-xs"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" className="bg-[#142B50] text-xs">
              Simpan Jadwal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
