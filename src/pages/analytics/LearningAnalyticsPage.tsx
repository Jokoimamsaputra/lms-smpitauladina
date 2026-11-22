import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  Filter,
  Download,
  Calendar,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const LearningAnalyticsPage: React.FC = () => {
  const { classes, subjects, schoolProfile } = useStore();

  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  const completionData = [
    { subject: 'Informatika', rate: 92 },
    { subject: 'B. Indonesia', rate: 88 },
    { subject: 'Matematika', rate: 76 },
    { subject: 'Fisika', rate: 71 },
    { subject: 'Biologi', rate: 84 },
  ];

  const trendData = [
    { week: 'Mgg 1', nilai: 81 },
    { week: 'Mgg 2', nilai: 83 },
    { week: 'Mgg 3', nilai: 79 },
    { week: 'Mgg 4', nilai: 4 },
    { week: 'Mgg 5', nilai: 85 },
    { week: 'Mgg 6', nilai: 89 },
  ];

  const timelinessData = [
    { name: 'Tepat Waktu', value: 82, color: '#16A34A' },
    { name: 'Terlambat (< 24 Jam)', value: 12, color: '#F59E0B' },
    { name: 'Belum Menyerahkan', value: 6, color: '#DC2626' },
  ];

  const atRiskStudents = [
    {
      name: 'Farhan Maulana',
      nisn: '0081234570',
      class: 'IX JavaScript',
      attendanceRate: '78%',
      avgScore: 68,
      issue: 'Kehadiran rendah karena izin sakit & tugas 2 belum selesai.',
    },
    {
      name: 'Dimas Aditya',
      nisn: '0081234572',
      class: 'VII Pascal',
      attendanceRate: '82%',
      avgScore: 71,
      issue: 'Capaian ujian matematika belum mencapai KKM 75.',
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Laporan & Mutu', href: '/admin/dashboard' },
          { label: 'Learning Analytics' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Learning Analytics & Efektivitas Pembelajaran
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visualisasi data komprehensif tingkat ketuntasan materi, tren nilai, dan sistem peringatan dini (Early Warning).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium"
          >
            <option value="semester">Semester Ganjil 2026/2027</option>
            <option value="month">30 Hari Terakhir</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Ketuntasan Materi Rata-rata</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">82.2%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">↑ +4.5% vs bulan lalu</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Pengumpulan Tugas Tepat Waktu</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">94.0%</h3>
          <p className="text-xs text-slate-500 mt-1">Dari 48 tugas terbit</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Tingkat Kelulusan CBT</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">88.6%</h3>
          <p className="text-xs text-slate-500 mt-1">Siswa mencapai KKM 75</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Perlu Pendampingan Khusus</span>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">2 Siswa</h3>
          <p className="text-xs text-slate-500 mt-1">Intervensi wali kelas aktif</p>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Tingkat Penyelesaian Materi per Mata Pelajaran
              </h2>
              <p className="text-xs text-slate-500">Persentase siswa yang telah menandai selesai materi</p>
            </div>
            <Badge variant="primary">Target: 80%</Badge>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="subject" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Ketuntasan']}
                  contentStyle={{ backgroundColor: '#142B50', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="rate" fill="#142B50" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeliness Pie Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Kedisiplinan Waktu Pengumpulan Tugas
            </h2>
            <p className="text-xs text-slate-500">Kepatuhan terhadap deadline</p>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timelinessData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {timelinessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Persentase']}
                  contentStyle={{ backgroundColor: '#142B50', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-1 text-xs">
            {timelinessData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Early Warning System Table: Siswa yang Membutuhkan Pendampingan */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-bold text-slate-900">
            Sistem Peringatan Dini Akademik (Early Warning System)
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Deteksi otomatis peserta didik yang memerlukan pendampingan remediasi atau konseling wali kelas.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Tingkat Kehadiran</th>
                <th className="py-3 px-4">Rata-rata Nilai</th>
                <th className="py-3 px-4">Indikator Masalah</th>
                <th className="py-3 px-4 text-right">Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {atRiskStudents.map((st, idx) => (
                <tr key={idx} className="hover:bg-amber-50/30">
                  <td className="py-3 px-4 font-semibold text-slate-900">{st.name}</td>
                  <td className="py-3 px-4 text-slate-600">{st.class}</td>
                  <td className="py-3 px-4 font-bold text-amber-700">{st.attendanceRate}</td>
                  <td className="py-3 px-4 font-bold text-red-600">{st.avgScore} / 100</td>
                  <td className="py-3 px-4 text-slate-600 text-[11px] max-w-xs">{st.issue}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded">
                      Jadwalkan Konseling
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
