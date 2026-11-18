import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  BookOpen,
  Library,
  CalendarCheck2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserPlus,
  PlusCircle,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { schoolProfile, users, classes, subjects, books } = useStore();

  const attendanceData = [
    { day: 'Sen', rate: 96 },
    { day: 'Sel', rate: 94 },
    { day: 'Rab', rate: 95 },
    { day: 'Kam', rate: 93 },
    { day: 'Jum', rate: 97 },
  ];

  const classPerformanceData = [
    { name: 'X MIPA 1', avg: 84 },
    { name: 'XI MIPA 1', avg: 89 },
    { name: 'XI MIPA 2', avg: 82 },
    { name: 'XII MIPA 1', avg: 91 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-[#142B50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-2xl">
          <Badge variant="primary" size="sm" className="bg-white/15 text-blue-100 border-white/20 mb-3">
            Dashboard Administrator Sekolah
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Selamat Datang di Portal Manajemen {schoolProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 leading-relaxed">
            Pantau operasional akademik, status rombel kelas, katalog buku kurikulum, dan integrasi pembelajaran digital secara terpusat.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/admin/users')}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Kelola Pengguna
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/admin/classes')}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Data Kelas & Rombel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/books')}
              leftIcon={<Library className="w-4 h-4" />}
            >
              Katalog Buku Nasional
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Siswa Terdaftar"
          value="1.248"
          subtitle="36 Rombongan Belajar"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: '+4.2% tahun ini', isPositive: true }}
          colorTheme="navy"
        />
        <StatCard
          title="Tenaga Pendidik (Guru)"
          value="86"
          subtitle="18 Mata Pelajaran Aktif"
          icon={<GraduationCap className="w-5 h-5" />}
          colorTheme="blue"
        />
        <StatCard
          title="Buku Referensi Nasional"
          value="320"
          subtitle="Kurikulum Merdeka & K13"
          icon={<Library className="w-5 h-5" />}
          colorTheme="emerald"
        />
        <StatCard
          title="Rata-rata Kehadiran"
          value="94.5%"
          subtitle="Data Kehadiran Minggu Ini"
          icon={<CalendarCheck2 className="w-5 h-5" />}
          trend={{ value: '+1.8% vs bulan lalu', isPositive: true }}
          colorTheme="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Tingkat Kehadiran Harian Siswa
              </h2>
              <p className="text-xs text-slate-500">Persentase kehadiran 5 hari sekolah terakhir</p>
            </div>
            <Badge variant="success">95% Rata-rata</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Kehadiran']}
                  contentStyle={{ backgroundColor: '#142B50', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#142B50"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#142B50' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class Average Performance */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Rerata Capaian Nilai Rombel
              </h2>
              <p className="text-xs text-slate-500">Performa akademik antar kelas</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={10} />
                <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={10} width={65} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#142B50', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="avg" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Links / Alur 1 Admin Guide */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Alur Prioritas Demo Admin (PRD Alur 1)
            </h2>
            <Badge variant="primary">Panduan Demo</Badge>
          </div>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Untuk presentasi kepada klien atau pengambil kebijakan sekolah, ikuti alur administrasi terpadu berikut:
          </p>
          <div className="space-y-2.5">
            <div
              onClick={() => navigate('/admin/users')}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Kelola Pengguna Guru & Siswa</p>
                  <p className="text-[11px] text-slate-500">Lihat data simulasi, filter role, atau tambah akun baru</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>

            <div
              onClick={() => navigate('/admin/classes')}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Pengaturan Rombel & Wali Kelas</p>
                  <p className="text-[11px] text-slate-500">Kelola pembagian kelas X, XI, XII dan pemetaan siswa</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>

            <div
              onClick={() => navigate('/books')}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Buka Katalog Buku Kurikulum</p>
                  <p className="text-[11px] text-slate-500">Periksa referensi buku Kemendikdasmen dan digital reader</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* System Status & Profile */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Informasi Konfigurasi Sekolah
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
            >
              Ubah Pengaturan
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nama Sekolah</span>
              <span className="font-semibold text-slate-800 mt-1 block">{schoolProfile.name}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">NPSN & Akreditasi</span>
              <span className="font-semibold text-slate-800 mt-1 block">{schoolProfile.npsn} • {schoolProfile.accreditation}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Kepala Sekolah</span>
              <span className="font-semibold text-slate-800 mt-1 block">{schoolProfile.principalName}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tahun Ajaran Aktif</span>
              <span className="font-semibold text-slate-800 mt-1 block">T.A. {schoolProfile.activeAcademicYear} ({schoolProfile.activeSemester})</span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#142B50] shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-700 leading-relaxed">
              <strong>Catatan Demo:</strong> Seluruh modul beroperasi dalam mode frontend terintegrasi dengan persistensi localStorage. Perubahan data yang Anda lakukan akan langsung tersimpan di browser Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
