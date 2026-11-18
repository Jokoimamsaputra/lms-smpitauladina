import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  GraduationCap,
  CalendarCheck2,
  FileCheck2,
  Bell,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, grades, notifications } = useStore();

  const childGrades = grades.filter((g) => g.studentId === 'user-siswa-1');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#142B50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-2xl">
          <Badge variant="primary" size="sm" className="bg-white/15 text-blue-100 border-white/20 mb-3">
            Portal Pemantauan Orang Tua / Wali
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Selamat Datang, Bapak {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 leading-relaxed">
            Memantau perkembangan belajar putra Anda: <strong>Ahmad Rizky Pratama</strong> (Kelas XI MIPA 1 • SMA Techsoe).
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/reports')}
              leftIcon={<GraduationCap className="w-4 h-4 text-[#142B50]" />}
            >
              Lihat Rapor Digital Lengkap
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/assignments')}
              leftIcon={<FileCheck2 className="w-4 h-4" />}
            >
              Tugas & Ujian Anak
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/notifications')}
              leftIcon={<Bell className="w-4 h-4" />}
            >
              Pengumuman Sekolah
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Kehadiran Putra Anda"
          value="98.5%"
          subtitle="Hadir 39 dari 40 pertemuan"
          icon={<CalendarCheck2 className="w-5 h-5" />}
          trend={{ value: 'Disiplin sangat baik', isPositive: true }}
          colorTheme="emerald"
        />
        <StatCard
          title="Rata-rata Nilai Semester"
          value="87.5"
          subtitle="Predikat A (Sangat Memuaskan)"
          icon={<GraduationCap className="w-5 h-5" />}
          trend={{ value: '+3.1 poin', isPositive: true }}
          colorTheme="navy"
        />
        <StatCard
          title="Tugas Diserahkan"
          value="100%"
          subtitle="Seluruh tugas terkumpul tepat waktu"
          icon={<FileCheck2 className="w-5 h-5" />}
          colorTheme="blue"
        />
        <StatCard
          title="Ujian CBT Aktif"
          value="1 Ujian"
          subtitle="Sumatif Tengah Semester Informatika"
          icon={<CheckCircle2 className="w-5 h-5" />}
          colorTheme="amber"
        />
      </div>

      {/* Child Grades & Homeroom Teacher Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child Grades Table */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Nilai Mata Pelajaran Ahmad Rizky
              </h2>
              <p className="text-xs text-slate-500">
                Capaian tugas, kuis, dan ujian tengah semester ganjil
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/reports')}
            >
              Cetak Rapor
            </Button>
          </div>

          <div className="space-y-3">
            {childGrades.map((g) => (
              <div
                key={g.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">
                      {g.subjectName}
                    </span>
                    <Badge variant={g.letterGrade === 'A' ? 'success' : 'primary'}>
                      Predikat {g.letterGrade}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Catatan Guru: "{g.teacherNotes}"
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Nilai Akhir</span>
                    <span className="text-lg font-bold text-[#142B50]">{g.finalScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Homeroom Contact & Info */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-1">
              Wali Kelas XI MIPA 1
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Informasi kontak untuk konsultasi bimbingan akademik
            </p>

            <div className="p-4 rounded-xl bg-[#EAF0F8] text-[#142B50] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#142B50] text-white flex items-center justify-center font-bold text-sm">
                  SR
                </div>
                <div>
                  <p className="font-bold text-xs">Siti Rahmawati, M.Pd.</p>
                  <p className="text-[11px] text-blue-900/80">Guru Informatika & Wali Kelas</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>0813-9876-5432 (WhatsApp Sekolah)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>siti.rahmawati@sekolah.demo.id</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              "Ahmad menunjukkan antusiasme yang sangat tinggi di bidang pemrograman dan algoritma komputasi."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
