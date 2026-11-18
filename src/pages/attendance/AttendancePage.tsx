import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  CheckCircle2,
  Users,
  Search,
  Filter,
  Save,
  AlertCircle,
  Calendar,
  Clock,
  UserCheck,
  GraduationCap,
  Download,
  PlusCircle,
  FileText,
  MapPin,
  LogIn,
  LogOut,
  Briefcase,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AttendanceRecord, TeacherAttendanceRecord } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const AttendancePage: React.FC = () => {
  const {
    classes,
    users,
    attendance,
    markAttendance,
    studentSelfCheckIn,
    teacherAttendance,
    markTeacherAttendance,
    teacherCheckIn,
    teacherCheckOut,
    submitTeacherLeave,
    currentUser,
  } = useStore();

  const isStudent = currentUser.role === 'siswa';
  const isParent = currentUser.role === 'orangtua';
  const isTeacher = currentUser.role === 'guru';
  const isAdminOrPrincipal = currentUser.role === 'admin' || currentUser.role === 'kepala';

  const [activeTab, setActiveTab] = useState<'siswa' | 'guru' | 'mandiri' | 'rekap'>('siswa');
  const [selectedClassId, setSelectedClassId] = useState('class-xi-mipa-1');
  const [selectedDate, setSelectedDate] = useState('2026-11-18');
  const [currentTime, setCurrentTime] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState<'izin' | 'sakit' | 'dinas_luar'>('dinas_luar');
  const [leaveNotes, setLeaveNotes] = useState('Menghadiri Rapat Koordinasi Kurikulum di Balai Guru Penggerak');

  // Student Leave Modal
  const [isStudentLeaveModalOpen, setIsStudentLeaveModalOpen] = useState(false);
  const [studentLeaveType, setStudentLeaveType] = useState<'sakit' | 'izin'>('sakit');
  const [studentLeaveStartDate, setStudentLeaveStartDate] = useState('2026-11-19');
  const [studentLeaveEndDate, setStudentLeaveEndDate] = useState('2026-11-19');
  const [studentLeaveReason, setStudentLeaveReason] = useState('Demam tinggi dan disarankan dokter beristirahat di rumah');

  // Real-time clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const students = users.filter((u) => u.role === 'siswa' && u.className === selectedClass.name);
  const teachers = users.filter((u) => u.role === 'guru');

  // Local student attendance status map for selected date
  const [studentStatusMap, setStudentStatusMap] = useState<Record<string, 'hadir' | 'izin' | 'sakit' | 'alfa'>>({
    'user-siswa-1': 'hadir',
    'user-siswa-2': 'hadir',
    'user-siswa-3': 'hadir',
    'user-siswa-4': 'sakit',
  });

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSetStudentStatus = (studentId: string, status: 'hadir' | 'izin' | 'sakit' | 'alfa') => {
    setStudentStatusMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveStudentAttendance = () => {
    students.forEach((s) => {
      markAttendance({
        date: selectedDate,
        classId: selectedClass.id,
        className: selectedClass.name,
        studentId: s.id,
        studentName: s.name,
        studentNis: s.identifierNumber,
        status: studentStatusMap[s.id] || 'hadir',
        checkInTime: studentStatusMap[s.id] === 'hadir' ? '06.45 WIB' : undefined,
      });
    });

    triggerToast(`Presensi kelas ${selectedClass.name} tanggal ${selectedDate} berhasil disimpan.`);
  };

  // Student self check-in
  const handleStudentSelfCheckIn = () => {
    studentSelfCheckIn(
      currentUser.id,
      currentUser.name,
      currentUser.classId || 'class-xi-mipa-1',
      currentUser.className || 'XI MIPA 1',
      currentUser.identifierNumber
    );
    triggerToast(`Presensi mandiri berhasil dicatat: ${currentUser.name} (Hadir Tepat Waktu).`);
  };

  // Student leave submit
  const handleStudentSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStudentLeaveModalOpen(false);
    triggerToast(`Surat permohonan ${studentLeaveType === 'sakit' ? 'izin sakit' : 'izin'} berhasil diajukan ke Wali Kelas.`);
  };

  // Teacher check-in & check-out
  const handleTeacherCheckIn = () => {
    teacherCheckIn(
      currentUser.id,
      currentUser.name,
      currentUser.identifierNumber,
      currentUser.subjectSpecialization
    );
    triggerToast(`Presensi kedatangan berhasil dicatat: ${currentUser.name} (${currentTime}).`);
  };

  const handleTeacherCheckOut = () => {
    teacherCheckOut(currentUser.id);
    triggerToast(`Presensi kepulangan berhasil dicatat: ${currentUser.name} (${currentTime}).`);
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    submitTeacherLeave(
      currentUser.id,
      currentUser.name,
      currentUser.identifierNumber,
      leaveStatus,
      leaveNotes
    );
    setIsLeaveModalOpen(false);
    triggerToast('Surat permohonan izin/dinas luar guru berhasil diajukan ke kepala sekolah.');
  };

  // Check current user attendance status today
  const today = '2026-11-18';
  const myStudentTodayRecord = attendance.find((a) => a.studentId === currentUser.id && a.date === today);
  const myTeacherTodayRecord = teacherAttendance.find((t) => t.teacherId === currentUser.id && t.date === today);

  // Student Personal Log History
  const studentPersonalHistory = [
    {
      date: '18 November 2026',
      day: 'Rabu',
      checkIn: myStudentTodayRecord?.checkInTime || '06.45 WIB',
      checkOut: '15.30 WIB',
      status: myStudentTodayRecord ? myStudentTodayRecord.status : 'hadir',
      method: 'Presensi Mandiri GPS',
      notes: 'Hadir tepat waktu di kelas',
    },
    {
      date: '17 November 2026',
      day: 'Selasa',
      checkIn: '06.42 WIB',
      checkOut: '15.30 WIB',
      status: 'hadir',
      method: 'Presensi Mandiri GPS',
      notes: 'Tepat waktu',
    },
    {
      date: '16 November 2026',
      day: 'Senin',
      checkIn: '06.35 WIB',
      checkOut: '15.30 WIB',
      status: 'hadir',
      method: 'Upacara Bendera',
      notes: 'Mengikuti upacara bendera hari Senin',
    },
    {
      date: '13 November 2026',
      day: 'Jumat',
      checkIn: '06.48 WIB',
      checkOut: '11.45 WIB',
      status: 'hadir',
      method: 'Presensi Mandiri GPS',
      notes: 'Kegiatan Jumat Bersih & Literasi',
    },
    {
      date: '12 November 2026',
      day: 'Kamis',
      checkIn: '06.40 WIB',
      checkOut: '15.30 WIB',
      status: 'hadir',
      method: 'Presensi Mandiri GPS',
      notes: 'Tepat waktu',
    },
    {
      date: '11 November 2026',
      day: 'Rabu',
      checkIn: '-',
      checkOut: '-',
      status: 'sakit',
      method: 'Surat Keterangan Dokter',
      notes: 'Demam dan flu (Surat dokter terverifikasi wali kelas)',
    },
    {
      date: '10 November 2026',
      day: 'Selasa',
      checkIn: '06.44 WIB',
      checkOut: '15.30 WIB',
      status: 'hadir',
      method: 'Presensi Mandiri GPS',
      notes: 'Tepat waktu',
    },
    {
      date: '09 November 2026',
      day: 'Senin',
      checkIn: '06.38 WIB',
      checkOut: '15.30 WIB',
      status: 'hadir',
      method: 'Upacara Bendera',
      notes: 'Mengikuti upacara bendera',
    },
  ];

  // -------------------------------------------------------------
  // VIEW KHUSUS SISWA & ORANG TUA (Strict Privacy - Hanya Data Pribadi)
  // -------------------------------------------------------------
  if (isStudent || isParent) {
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
            {
              label: isStudent ? 'Dashboard Belajar' : 'Dashboard Orang Tua',
              href: isStudent ? '/student/dashboard' : '/parent/dashboard',
            },
            { label: isStudent ? 'Presensi Saya' : 'Presensi Kehadiran Ananda' },
          ]}
        />

        {/* Student Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {isStudent ? 'Presensi Mandiri Siswa' : 'Presensi Kehadiran Ananda'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isStudent
                ? `Nama: ${currentUser.name} • Kelas: ${currentUser.className || 'XI MIPA 1'} • NISN: ${currentUser.identifierNumber} • SMA Techsoe`
                : 'Pemantauan rekapitulasi kehadiran belajar ananda Ahmad Fauzi (Kelas XI MIPA 1) di SMA Techsoe.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStudentLeaveModalOpen(true)}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              {isStudent ? 'Ajukan Izin / Sakit' : 'Kirim Surat Izin Ananda'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => triggerToast('Kartu rekapitulasi presensi siswa berhasil diunduh.')}
              leftIcon={<Download className="w-4 h-4 text-[#142B50]" />}
            >
              Unduh Rekap Presensi
            </Button>
          </div>
        </div>

        {/* Personal Student KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Kehadiran Semester Ini</span>
              <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">97.5%</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">39 dari 40 Hari Efektif</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Hadir Tepat Waktu</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">39 Hari</div>
            <p className="text-[11px] text-slate-400 mt-1">Sebelum toleransi 07.00 WIB</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Izin & Sakit</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600">1 Hari</div>
            <p className="text-[11px] text-slate-400 mt-1">Surat dokter diverifikasi</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Tanpa Keterangan (Alfa)</span>
              <UserCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">0 Hari</div>
            <p className="text-[11px] text-slate-400 mt-1">Disiplin belajar prima</p>
          </div>
        </div>

        {/* Live Attendance Check-In Box (Status Hari Ini) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Clock & Date Banner */}
            <div className="bg-[#142B50] text-white p-6 rounded-2xl text-center space-y-2 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200 block">
                Waktu Server SMA Techsoe
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-extrabold tracking-tight text-white">
                {currentTime}
              </div>
              <p className="text-xs text-blue-200">
                Rabu, 18 November 2026 • Jam Masuk: 06.30 - 07.00 WIB
              </p>
            </div>

            {/* Attendance Status Today */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Status Presensi Belajar Hari Ini
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tanggal: 18 November 2026 • Semester Ganjil T.A. 2026/2027
                  </p>
                </div>
                <Badge variant={myStudentTodayRecord ? 'success' : 'default'} size="md">
                  {myStudentTodayRecord ? 'Hadir Tepat Waktu' : 'Belum Presensi'}
                </Badge>
              </div>

              {myStudentTodayRecord ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-900">
                        Presensi Kehadiran Berhasil Diverifikasi
                      </p>
                      <p className="text-emerald-700 text-[11px] mt-0.5">
                        Tercatat jam masuk pukul {myStudentTodayRecord.checkInTime || '06.45 WIB'} • Metode: Presensi Mandiri Siswa (Dalam Radius Kampus SMA Techsoe).
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">Terverifikasi</Badge>
                </div>
              ) : isStudent ? (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-[#142B50]">
                      Kamu belum mencatat presensi masuk hari ini
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Batas toleransi kehadiran pukul 07.00 WIB. Pastikan kamu telah berada di area sekolah.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleStudentSelfCheckIn}
                    leftIcon={<UserCheck className="w-4 h-4" />}
                  >
                    Check-in Hadir Sekarang
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Ananda belum tercatat melakukan presensi hari ini.
                </div>
              )}

              {/* Geolocation & Connectivity Proof */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kampus Utama SMA Techsoe (Radius GPS: 18m)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Wi-Fi Kampus: TECHSOE-STUDENT-5G (Terhubung)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Attendance History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Riwayat Presensi Mandiri Saya
              </h3>
              <p className="text-xs text-slate-500">
                Catatan kehadiran belajar semester ganjil T.A. 2026/2027 (SMA Techsoe).
              </p>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Menampilkan 8 rekaman kehadiran terakhir
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Hari & Tanggal</th>
                  <th className="py-3 px-4 text-center">Jam Masuk</th>
                  <th className="py-3 px-4 text-center">Jam Pulang</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Metode Presensi</th>
                  <th className="py-3 px-4">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentPersonalHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.day}, {item.date}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {item.checkIn}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {item.checkOut}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge
                        variant={
                          item.status === 'hadir'
                            ? 'success'
                            : item.status === 'sakit'
                            ? 'warning'
                            : item.status === 'izin'
                            ? 'primary'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {item.method}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Permohonan Izin / Sakit Siswa */}
        <Modal
          isOpen={isStudentLeaveModalOpen}
          onClose={() => setIsStudentLeaveModalOpen(false)}
          title={isStudent ? 'Formulir Permohonan Izin / Sakit Siswa' : 'Pengajuan Surat Izin Ananda'}
          description="Lengkapi alasan ketidakhadiran untuk diteruskan dan diverifikasi oleh Wali Kelas."
        >
          <form onSubmit={handleStudentSubmitLeave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Siswa
              </label>
              <input
                type="text"
                value={isStudent ? currentUser.name : 'Ahmad Fauzi'}
                disabled
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-100 text-slate-700 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Permohonan
              </label>
              <select
                value={studentLeaveType}
                onChange={(e) => setStudentLeaveType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] bg-white font-medium"
              >
                <option value="sakit">Sakit (Istirahat Medis)</option>
                <option value="izin">Izin Keperluan Keluarga / Mendesak</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={studentLeaveStartDate}
                  onChange={(e) => setStudentLeaveStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={studentLeaveEndDate}
                  onChange={(e) => setStudentLeaveEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alasan & Keterangan Rinci
              </label>
              <textarea
                rows={3}
                value={studentLeaveReason}
                onChange={(e) => setStudentLeaveReason(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
                placeholder="Tuliskan keterangan sakit atau alasan izin secara lengkap..."
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-dashed border-slate-300 text-center">
              <p className="text-[11px] text-slate-500 font-medium">
                Lampiran Surat Dokter / Surat Izin Orang Tua (.pdf / .jpg)
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                surat_keterangan_dokter_18nov2026.pdf (Tersimulasi)
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsStudentLeaveModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Kirim Permohonan ke Wali Kelas
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW UNTUK GURU, ADMIN, DAN KEPALA SEKOLAH
  // -------------------------------------------------------------
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
          { label: 'Akademik', href: isTeacher ? '/teacher/dashboard' : '/admin/dashboard' },
          { label: isTeacher ? 'Presensi Siswa & Mandiri Guru' : 'Sistem Presensi Siswa & Guru' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {isTeacher ? 'Manajemen Presensi Kelas & Mandiri Guru' : 'Presensi Siswa & Dewan Guru SMA Techsoe'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isTeacher
              ? 'Pencatatan kehadiran rombel belajar yang diampu dan presensi kedatangan/kepulangan guru mandiri.'
              : 'Pencatatan kehadiran terpadu rombel kelas, presensi dewan guru, dan absensi mandiri harian.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => triggerToast('Simulasi ekspor laporan presensi (.xlsx) berhasil diunduh.')}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Laporan Presensi
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveTab('mandiri')}
            leftIcon={<Clock className="w-4 h-4 text-[#142B50]" />}
          >
            Absen Mandiri ({currentTime})
          </Button>
        </div>
      </div>

      {/* KPI Cards (Role-filtered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px] text-slate-400">
              {isTeacher ? 'Kehadiran Siswa Kelas Saya' : 'Kehadiran Siswa Hari Ini'}
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">96.8%</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {isTeacher ? '35 / 36 Siswa Hadir di Rombel' : '1.208 / 1.248 Siswa Hadir'}
          </p>
        </div>

        {isAdminOrPrincipal ? (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Kehadiran Dewan Guru</span>
              <GraduationCap className="w-4 h-4 text-[#142B50]" />
            </div>
            <div className="text-2xl font-bold text-slate-900">97.6%</div>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">84 / 86 Guru Bertugas</p>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Status Kehadiran Saya</span>
              <GraduationCap className="w-4 h-4 text-[#142B50]" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {myTeacherTodayRecord?.checkInTime ? 'Sudah Masuk' : 'Belum Check-In'}
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              {myTeacherTodayRecord?.checkInTime ? `Pukul ${myTeacherTodayRecord.checkInTime}` : 'Silakan check-in'}
            </p>
          </div>
        )}

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px] text-slate-400">
              {isTeacher ? 'Siswa Izin / Sakit Kelas' : 'Siswa Izin / Sakit'}
            </span>
            <CalendarCheck2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {isTeacher ? '1 Siswa' : '40 Siswa'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Surat keterangan terverifikasi</p>
        </div>

        {isAdminOrPrincipal ? (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Guru Dinas Luar / Cuti</span>
              <Briefcase className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">2 Guru</div>
            <p className="text-[11px] text-slate-400 mt-1">Pelatihan & tugas kedinasan</p>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-slate-400">Jadwal Mengajar Hari Ini</span>
              <Briefcase className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">4 Jam Pelajaran</div>
            <p className="text-[11px] text-slate-400 mt-1">Kelas XI MIPA 1 & XI MIPA 2</p>
          </div>
        )}
      </div>

      {/* Tabs Navigation (Guru does not see teacher roster tab) */}
      <div className="border-b border-slate-200 bg-white rounded-t-xl px-4 flex items-center gap-2 overflow-x-auto">
        {(isAdminOrPrincipal
          ? [
              { id: 'siswa', label: 'Presensi Siswa per Kelas', icon: <Users className="w-4 h-4" /> },
              { id: 'guru', label: 'Presensi Dewan Guru & Staf', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'mandiri', label: 'Presensi Mandiri Hari Ini (Live)', icon: <Clock className="w-4 h-4" /> },
              { id: 'rekap', label: 'Statistik & Ringkasan Presensi', icon: <CalendarCheck2 className="w-4 h-4" /> },
            ]
          : [
              { id: 'siswa', label: 'Presensi Siswa per Kelas', icon: <Users className="w-4 h-4" /> },
              { id: 'mandiri', label: 'Presensi Mandiri Guru', icon: <Clock className="w-4 h-4" /> },
              { id: 'rekap', label: 'Ringkasan Presensi Rombel', icon: <CalendarCheck2 className="w-4 h-4" /> },
            ]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'border-[#142B50] text-[#142B50]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: PRESENSI SISWA PER KELAS */}
      {activeTab === 'siswa' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 shadow-sm space-y-5">
          {/* Controls: Rombel selector, Date, and Save button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Pilih Rombongan Belajar
                </label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-semibold text-[#142B50]"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.studentCount} Siswa)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Tanggal Presensi
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium"
                />
              </div>

              <div className="text-xs text-slate-500 self-end pb-1.5">
                Wali Kelas: <strong>{selectedClass.homeroomTeacherName}</strong>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveStudentAttendance}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Simpan Presensi Rombel
            </Button>
          </div>

          {/* Student Attendance Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">NISN</th>
                  <th className="py-3 px-4 text-center">Status Kehadiran</th>
                  <th className="py-3 px-4 text-center">Waktu Masuk</th>
                  <th className="py-3 px-4 text-center">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st, idx) => {
                  const currentStatus = studentStatusMap[st.id] || 'hadir';
                  const record = attendance.find((a) => a.studentId === st.id && a.date === selectedDate);
                  return (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {st.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        {st.identifierNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSetStudentStatus(st.id, 'hadir')}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                              currentStatus === 'hadir'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Hadir
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetStudentStatus(st.id, 'izin')}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                              currentStatus === 'izin'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Izin
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetStudentStatus(st.id, 'sakit')}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                              currentStatus === 'sakit'
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Sakit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetStudentStatus(st.id, 'alfa')}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                              currentStatus === 'alfa'
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Alfa
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">
                        {record?.checkInTime || (currentStatus === 'hadir' ? '06.45 WIB' : '-')}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-500 text-[11px]">
                        {record?.notes || (currentStatus === 'sakit' ? 'Surat dokter terlampir' : 'Tepat Waktu')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRESENSI DEWAN GURU & STAF */}
      {activeTab === 'guru' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Rekap Kehadiran Dewan Guru & Tenaga Pendidik
              </h2>
              <p className="text-xs text-slate-500">
                Tanggal: <strong>{new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong> • Jam Kerja: 06.45 - 15.30 WIB
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLeaveModalOpen(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Form Pengajuan Dinas Luar / Cuti
            </Button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Nama Guru & NIP</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4 text-center">Status Kehadiran</th>
                  <th className="py-3 px-4 text-center">Jam Kedatangan</th>
                  <th className="py-3 px-4 text-center">Jam Kepulangan</th>
                  <th className="py-3 px-4">Catatan / Tugas Luar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherAttendance.map((t, idx) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{t.teacherName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{t.teacherNip}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {t.subjectSpecialization || 'Pendidik'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge
                        variant={
                          t.status === 'hadir'
                            ? 'success'
                            : t.status === 'dinas_luar'
                            ? 'info'
                            : t.status === 'izin'
                            ? 'primary'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {t.status === 'dinas_luar' ? 'Dinas Luar' : t.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {t.checkInTime || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                      {t.checkOutTime || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {t.notes || (t.status === 'hadir' ? 'Hadir Tepat Waktu' : '-')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRESENSI MANDIRI HARI INI (LIVE CHECK-IN BOX) */}
      {activeTab === 'mandiri' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Live Clock Card */}
            <div className="p-8 rounded-3xl bg-[#142B50] text-white shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Waktu Server SMA Techsoe Hari Ini</span>
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-white my-3">
                {currentTime}
              </div>
              <p className="text-xs text-blue-200">
                Rabu, 18 November 2026 • Gerbang Masuk: 06.30 - 07.00 WIB
              </p>
            </div>

            {/* Current User Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Akun yang Sedang Aktif
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{currentUser.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {currentUser.identifierNumber} • Role: {currentUser.role.toUpperCase()}
                  </p>
                </div>
                <Badge variant="primary" size="md">
                  {currentUser.role === 'siswa' ? currentUser.className || 'XI MIPA 1' : 'Tenaga Pendidik'}
                </Badge>
              </div>

              {/* Action based on role */}
              {currentUser.role === 'siswa' ? (
                <div className="space-y-3">
                  {myStudentTodayRecord ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-bold">Presensi Siswa Telah Dicatat Hari Ini</p>
                          <p className="text-[11px] text-emerald-700">Waktu: {myStudentTodayRecord.checkInTime} • Status: {myStudentTodayRecord.notes || 'Tepat Waktu'}</p>
                        </div>
                      </div>
                      <Badge variant="success">Sudah Hadir</Badge>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-600 mb-3">
                        Klik tombol di bawah untuk mencatat kehadiran belajar Anda di sekolah hari ini:
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full justify-center"
                        onClick={handleStudentSelfCheckIn}
                        leftIcon={<UserCheck className="w-5 h-5" />}
                      >
                        Catat Kehadiran Siswa Sekarang
                      </Button>
                    </div>
                  )}
                </div>
              ) : currentUser.role === 'guru' || currentUser.role === 'admin' ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#142B50]">Status Presensi Guru:</span>
                      <Badge variant={myTeacherTodayRecord?.checkInTime ? 'success' : 'default'}>
                        {myTeacherTodayRecord?.checkInTime ? 'Sudah Check-In Masuk' : 'Belum Check-In'}
                      </Badge>
                    </div>
                    {myTeacherTodayRecord?.checkInTime && (
                      <p className="text-[11px] text-slate-600">
                        Jam Kedatangan: <strong>{myTeacherTodayRecord.checkInTime}</strong> | Jam Kepulangan: <strong>{myTeacherTodayRecord.checkOutTime || 'Belum Check-Out'}</strong>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleTeacherCheckIn}
                      leftIcon={<LogIn className="w-4 h-4" />}
                    >
                      Check-In Masuk ({currentTime.split(':')[0] + '.' + currentTime.split(':')[1]})
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={handleTeacherCheckOut}
                      leftIcon={<LogOut className="w-4 h-4 text-[#142B50]" />}
                    >
                      Check-Out Pulang
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Akun ini bertindak sebagai pemantau ({currentUser.role}). Beralihlah ke akun Siswa atau Guru di topbar untuk mencoba simulasi tombol check-in mandiri.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REKAPITULASI & STATISTIK PRESENSI */}
      {activeTab === 'rekap' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Ringkasan Disiplin & Presensi Semester Ganjil 2026/2027
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rekap Siswa */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-900">Rekap Disiplin Siswa SMA Techsoe</h3>
                <Badge variant="success">96.8% Rata-rata</Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Total Hari Belajar Efektif</span>
                  <span className="font-bold text-slate-800">72 Hari</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Kehadiran Tepat Waktu</span>
                  <span className="font-bold text-emerald-600">93.2%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Keterlambatan Rata-rata</span>
                  <span className="font-bold text-amber-600">3.6%</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600">Tanpa Keterangan (Alfa)</span>
                  <span className="font-bold text-red-600">0.8%</span>
                </div>
              </div>
            </div>

            {/* Rekap Guru */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-900">Rekap Presensi Dewan Guru & Staf</h3>
                <Badge variant="primary">97.6% Hadir</Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Total Tenaga Pendidik Aktif</span>
                  <span className="font-bold text-slate-800">86 Guru</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Kedatangan Tepat Waktu (sebelum 06.45)</span>
                  <span className="font-bold text-emerald-600">95.4%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Tugas Dinas Luar & Pelatihan</span>
                  <span className="font-bold text-blue-600">3.2%</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600">Cuti & Sakit</span>
                  <span className="font-bold text-slate-600">1.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pengajuan Izin / Dinas Luar Guru */}
      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Form Pengajuan Izin / Cuti / Tugas Dinas Guru"
        description="Lengkapi keterangan izin untuk verifikasi kepala sekolah dan staf kurikulum."
      >
        <form onSubmit={handleSubmitLeave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Guru Pemohon
            </label>
            <input
              type="text"
              value={currentUser.name}
              disabled
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-100 text-slate-700 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kategori Permohonan
            </label>
            <select
              value={leaveStatus}
              onChange={(e) => setLeaveStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] bg-white font-medium"
            >
              <option value="dinas_luar">Tugas Dinas Luar (Workshop / MGMP / Lomba)</option>
              <option value="izin">Izin Kepentingan Mendesak</option>
              <option value="sakit">Sakit (Istirahat Medis)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alasan & Keterangan Rinci
            </label>
            <textarea
              rows={3}
              value={leaveNotes}
              onChange={(e) => setLeaveNotes(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              placeholder="Tuliskan tujuan dinas atau keterangan istirahat..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsLeaveModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Ajukan Permohonan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
