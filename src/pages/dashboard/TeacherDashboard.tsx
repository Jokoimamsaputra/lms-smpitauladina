import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  FileText,
  CalendarCheck2,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, subjects, assignments, submissions, materials } = useStore();

  const mySubjects = subjects.filter((s) => s.teacherId === currentUser.id);
  const pendingSubmissions = submissions.filter((s) => s.status === 'submitted');

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-[#142B50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-2xl">
          <Badge variant="primary" size="sm" className="bg-white/15 text-blue-100 border-white/20 mb-3">
            Dashboard Guru Pendidik
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Selamat Pagi, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 leading-relaxed">
            Spesialisasi: {currentUser.subjectSpecialization || 'Informatika'}. Siapkan materi pembelajaran, periksa tugas siswa, dan manfaatkan AI Teaching Assistant untuk pembuatan modul secara cepat.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/ai/teaching')}
              leftIcon={<Sparkles className="w-4 h-4 text-[#142B50]" />}
            >
              Buka AI Teaching Assistant
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/virtual-classes')}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Kelas Virtual
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/assignments')}
              leftIcon={<FileCheck2 className="w-4 h-4" />}
            >
              Penilaian Tugas ({pendingSubmissions.length} Belum Dinilai)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/attendance')}
              leftIcon={<CalendarCheck2 className="w-4 h-4" />}
            >
              Presensi Guru & Siswa
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Kelas Diampu"
          value={mySubjects.length > 0 ? mySubjects.length : '2'}
          subtitle="Kelas XI MIPA 1 & XI MIPA 2"
          icon={<BookOpen className="w-5 h-5" />}
          colorTheme="navy"
        />
        <StatCard
          title="Tugas Menunggu Koreksi"
          value={pendingSubmissions.length}
          subtitle="Perlu feedback dan nilai"
          icon={<FileCheck2 className="w-5 h-5" />}
          trend={{ value: 'Prioritas hari ini', isPositive: false }}
          colorTheme="amber"
        />
        <StatCard
          title="Materi Terpublikasi"
          value={materials.length}
          subtitle="Artikel, video, dan modul"
          icon={<FileText className="w-5 h-5" />}
          colorTheme="blue"
        />
        <StatCard
          title="Draf Modul AI"
          value="4 Dokumen"
          subtitle="Disimpan di draft mengajar"
          icon={<Sparkles className="w-5 h-5" />}
          colorTheme="purple"
        />
      </div>

      {/* Main Grid: Jadwal Hari Ini & Tugas Perlu Dikoreksi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Hari Ini */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#142B50]" />
              <span>Jadwal Mengajar Hari Ini</span>
            </h2>
            <Badge variant="primary">Senin</Badge>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#142B50]">Informatika (XI MIPA 1)</span>
                <span className="text-[11px] bg-[#142B50] text-white px-2 py-0.5 rounded font-medium">
                  08.00 : 09.30 WIB
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Topik: Algoritma Pencarian & Binary Search
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-blue-100">
                <span>Ruang: Lab Komputer 2</span>
                <button
                  type="button"
                  onClick={() => navigate('/subjects/subj-info-xi')}
                  className="text-[#142B50] font-semibold hover:underline cursor-pointer"
                >
                  Buka Kelas →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Matematika Tingkat Lanjut</span>
                <span className="text-[11px] text-slate-500 font-medium">
                  10.00 : 11.30 WIB
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Topik: Pembagian Polinomial dengan Skema Horner
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <span>Ruang: Ruang 204</span>
                <button
                  type="button"
                  onClick={() => navigate('/subjects/subj-mat-xi')}
                  className="text-[#142B50] font-semibold hover:underline cursor-pointer"
                >
                  Buka Kelas →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tugas Yang Perlu Dinilai (Koreksi) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Pengumpulan Tugas Siswa (Menunggu Penilaian)
              </h2>
              <p className="text-xs text-slate-500">
                Periksa kiriman tugas, berikan skor dan catatan feedback edukatif
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/assignments')}
            >
              Lihat Semua Tugas
            </Button>
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              Semua tugas yang dikumpulkan siswa telah dinilai!
            </div>
          ) : (
            <div className="space-y-3">
              {pendingSubmissions.map((subm) => (
                <div
                  key={subm.id}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-800">
                        {subm.studentName}
                      </span>
                      <span className="text-[10px] text-slate-400">({subm.studentNis})</span>
                      <Badge variant="warning">Menunggu Nilai</Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Tugas: Implementasi Binary Search Python
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Catatan siswa: "{subm.studentNotes || 'File lampiran terlampir'}"
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/assignments/asg-info-1`)}
                  >
                    Beri Nilai & Feedback
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alur 2 Guide for Teachers */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Alur Prioritas Demo Guru (PRD Alur 2)
          </h2>
          <Badge variant="primary">Panduan Demo Guru</Badge>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Berikut alur demonstrasi interaktif untuk role guru dalam menyiapkan proses belajar mengajar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div
            onClick={() => navigate('/virtual-classes')}
            className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-xs font-bold text-[#142B50] block mb-1">Langkah 1</span>
            <p className="text-xs font-semibold text-slate-800">Buka Kelas Virtual</p>
            <p className="text-[11px] text-slate-500 mt-1">Pilih mata pelajaran Informatika atau Matematika</p>
          </div>

          <div
            onClick={() => navigate('/ai/teaching')}
            className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-xs font-bold text-[#142B50] block mb-1">Langkah 2</span>
            <p className="text-xs font-semibold text-slate-800">Gunakan AI Teaching Copilot</p>
            <p className="text-[11px] text-slate-500 mt-1">Generate modul ajar atau paket soal pilihan ganda</p>
          </div>

          <div
            onClick={() => navigate('/assignments')}
            className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-xs font-bold text-[#142B50] block mb-1">Langkah 3</span>
            <p className="text-xs font-semibold text-slate-800">Buat Tugas / Ujian</p>
            <p className="text-[11px] text-slate-500 mt-1">Publikasikan tugas baru atau soal ujian CBT ke rombel</p>
          </div>

          <div
            onClick={() => navigate('/gradebook')}
            className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-xs font-bold text-[#142B50] block mb-1">Langkah 4</span>
            <p className="text-xs font-semibold text-slate-800">Rekap Nilai Siswa</p>
            <p className="text-[11px] text-slate-500 mt-1">Pantau matriks nilai rapor siswa di Gradebook</p>
          </div>
        </div>
      </div>
    </div>
  );
};
