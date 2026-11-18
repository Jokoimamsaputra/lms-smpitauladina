import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  GraduationCap,
  CalendarCheck2,
  TrendingUp,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const PrincipalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { schoolProfile, classes } = useStore();

  const gradeDistribution = [
    { name: 'Predikat A (Sangat Baik)', value: 45, color: '#16A34A' },
    { name: 'Predikat B (Baik)', value: 38, color: '#2563EB' },
    { name: 'Predikat C (Cukup)', value: 14, color: '#F59E0B' },
    { name: 'Predikat D (Perlu Bimbingan)', value: 3, color: '#DC2626' },
  ];

  const subjectAverages = [
    { subject: 'Informatika', score: 88.5 },
    { subject: 'B. Indonesia', score: 87.2 },
    { subject: 'Matematika', score: 82.4 },
    { subject: 'Fisika', score: 81.0 },
    { subject: 'B. Inggris', score: 86.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Executive Header */}
      <div className="bg-[#142B50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-3xl">
          <Badge variant="primary" size="sm" className="bg-white/15 text-blue-100 border-white/20 mb-3">
            Executive Dashboard Kepala Sekolah
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Pemantauan Mutu Akademik & Kehadiran Sekolah
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 leading-relaxed">
            Selamat datang, {schoolProfile.principalName}. Tinjau efektivitas pembelajaran digital, rasio kehadiran harian, dan analitik performa lintas rombongan belajar.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/analytics')}
              leftIcon={<BarChart3 className="w-4 h-4 text-[#142B50]" />}
            >
              Buka Learning Analytics Lengkap
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/attendance')}
              leftIcon={<CalendarCheck2 className="w-4 h-4" />}
            >
              Monitoring Presensi
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/reports')}
              leftIcon={<GraduationCap className="w-4 h-4" />}
            >
              Rapor Sekolah
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Siswa Aktif"
          value="1.248"
          subtitle="Tingkat kelulusan target: 100%"
          icon={<Users className="w-5 h-5" />}
          colorTheme="navy"
        />
        <StatCard
          title="Kehadiran Rata-rata"
          value="94.5%"
          subtitle="Melebihi target minimum 90%"
          icon={<CalendarCheck2 className="w-5 h-5" />}
          trend={{ value: '+2.1% vs semester lalu', isPositive: true }}
          colorTheme="emerald"
        />
        <StatCard
          title="Rata-rata Capaian Ujian"
          value="85.2"
          subtitle="Skala 0 - 100 (Akreditasi A)"
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 'Stabil', isPositive: true }}
          colorTheme="blue"
        />
        <StatCard
          title="Perlu Pendampingan"
          value="12 Siswa"
          subtitle="Kehadiran < 80% atau nilai < 75"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: 'Segera tindak lanjuti', isPositive: false }}
          colorTheme="amber"
        />
      </div>

      {/* Charts: Distribusi Nilai & Performa Mapel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribusi Nilai Pie */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Distribusi Capaian Nilai Rapor
            </h2>
            <p className="text-xs text-slate-500">Persentase predikat seluruh mata pelajaran</p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Proporsi Siswa']}
                  contentStyle={{ backgroundColor: '#142B50', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs">
            {gradeDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performa Rerata Nilai Mapel */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Rerata Capaian Nilai per Mata Pelajaran
              </h2>
              <p className="text-xs text-slate-500">Komparasi nilai sumatif semester ganjil</p>
            </div>
            <Badge variant="primary">Target KKM: 75</Badge>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAverages}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="subject" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [val, 'Rata-rata Nilai']}
                  contentStyle={{ backgroundColor: '#142B50', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="score" fill="#142B50" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alur 4 Principal Monitoring Guide */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Alur Demonstrasi Pimpinan Sekolah (PRD Alur 4)
          </h2>
          <Badge variant="primary">Panduan Demo Pimpinan</Badge>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Tunjukkan kepada stakeholder bagaimana LMS Techsoe mendukung pengambilan keputusan berbasis data:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => navigate('/analytics')}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold text-xs mb-2">
              1
            </div>
            <h3 className="font-semibold text-xs text-slate-800">Learning Analytics</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Filter capaian pembelajaran berdasarkan rombel kelas dan periode semester.
            </p>
          </div>

          <div
            onClick={() => navigate('/attendance')}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold text-xs mb-2">
              2
            </div>
            <h3 className="font-semibold text-xs text-slate-800">Monitoring Presensi</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Pantau siswa dengan tingkat kehadiran rendah untuk intervensi wali kelas.
            </p>
          </div>

          <div
            onClick={() => navigate('/virtual-classes')}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold text-xs mb-2">
              3
            </div>
            <h3 className="font-semibold text-xs text-slate-800">Supervisi Kelas Virtual</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Periksa ketercapaian materi ajar yang diunggah oleh bapak/ibu guru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
