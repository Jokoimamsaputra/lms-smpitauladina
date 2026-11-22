import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  FileCheck2,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Library,
  GraduationCap,
  CalendarCheck2,
  Calendar,
  HeartHandshake,
  Trophy,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, assignments, submissions, exams, materials } = useStore();

  const mySubmissions = submissions.filter((s) => s.studentId === currentUser.id);
  const myCompletedMaterials = materials.filter((m) => m.isCompletedByStudent);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#142B50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-2xl">
          <Badge variant="primary" size="sm" className="bg-white/15 text-blue-100 border-white/20 mb-3">
            Dashboard Belajar Siswa
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Semangat Belajar, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 leading-relaxed">
            Kelas: {currentUser.className || 'IX JavaScript'} • NISN: {currentUser.identifierNumber}. Ada 1 ujian CBT tengah semester aktif dan materi baru yang dapat kamu pelajari hari ini.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/exams/exam-cbt-info-uts')}
              leftIcon={<FileText className="w-4 h-4 text-[#142B50]" />}
            >
              Ikuti Ujian CBT Informatika
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/ai/assistant')}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Tanya AI Learning Tutor
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/schedule')}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Jadwal Pelajaran
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/counseling')}
              leftIcon={<Trophy className="w-4 h-4" />}
            >
              Prestasi & Konseling BK
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/attendance')}
              leftIcon={<CalendarCheck2 className="w-4 h-4" />}
            >
              Presensi Belajar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/books')}
              leftIcon={<Library className="w-4 h-4" />}
            >
              Baca Buku Digital
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Materi Diselesaikan"
          value={`${myCompletedMaterials.length} / ${materials.length}`}
          subtitle="Progress pemahaman materi"
          icon={<BookOpen className="w-5 h-5" />}
          colorTheme="navy"
        />
        <StatCard
          title="Tugas Terkumpul"
          value={`${mySubmissions.length} Tugas`}
          subtitle="Nilai terakhir: 95 (A)"
          icon={<FileCheck2 className="w-5 h-5" />}
          trend={{ value: 'Tepat waktu', isPositive: true }}
          colorTheme="emerald"
        />
        <StatCard
          title="Ujian CBT Tersedia"
          value={exams.length}
          subtitle="Penilaian Sumatif Aktif"
          icon={<FileText className="w-5 h-5" />}
          colorTheme="amber"
        />
        <StatCard
          title="Rata-rata Nilai Rapor"
          value="91.2"
          subtitle="Predikat A (Sangat Baik)"
          icon={<GraduationCap className="w-5 h-5" />}
          trend={{ value: '+2.4 poin', isPositive: true }}
          colorTheme="blue"
        />
      </div>

      {/* Main Grid: Jadwal Hari Ini & Ujian CBT Aktif */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Exam Card */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-amber-200 shadow-sm relative overflow-hidden bg-gradient-to-r from-amber-50/50 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              Sedang Berlangsung (CBT Aktif)
            </span>
            <span className="text-xs text-slate-500 font-medium">Batas Waktu: 20 Nov 2026</span>
          </div>

          <h2 className="text-base font-bold text-slate-900">
            Penilaian Sumatif Tengah Semester: Informatika & Algoritma
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Ujian Computer-Based Test (CBT) menguji pemahaman materi Berpikir Komputasional, Algoritma Pencarian & Sorting, dan Analisis Kompleksitas Big-O.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-amber-200/60 pt-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Durasi: 45 Menit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Jumlah Soal: 5 Butir Objektif</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Passing Grade (KKM): 75</span>
            </div>
          </div>

          <div className="mt-5">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/exams/exam-cbt-info-uts')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Mulai Mengerjakan Ujian CBT Sekarang
            </Button>
          </div>
        </div>

        {/* AI Tutor Quick Box */}
        <div className="bg-[#142B50] text-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-200 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Learning Assistant</span>
            </div>
            <h2 className="text-base font-bold">Butuh Bantuan Memahami Materi?</h2>
            <p className="text-xs text-blue-200 mt-2 leading-relaxed">
              Tanyakan konsep matematika, algoritma informatika, atau hukum fisika langsung ke tutor AI.
            </p>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => navigate('/ai/assistant')}
                className="w-full text-left text-[11px] p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-slate-200 cursor-pointer block"
              >
                "Jelaskan binary search dengan analogi buku..."
              </button>
              <button
                type="button"
                onClick={() => navigate('/ai/assistant')}
                className="w-full text-left text-[11px] p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-slate-200 cursor-pointer block"
              >
                "Buatkan flashcard pembagian Horner..."
              </button>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-white/10">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center"
              onClick={() => navigate('/ai/assistant')}
            >
              Buka Chatbot AI Belajar
            </Button>
          </div>
        </div>
      </div>

      {/* Materi & Tugas Siswa Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Materi Terkini */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Materi Pelajaran Semester Ini
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/virtual-classes')}
            >
              Lihat Kelas
            </Button>
          </div>

          <div className="space-y-3">
            {materials.map((mat) => (
              <div
                key={mat.id}
                onClick={() => navigate(`/materials/${mat.id}`)}
                className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#EAF0F8] text-[#142B50] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {mat.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {mat.subjectName} • {mat.durationMinutes} Menit
                    </p>
                  </div>
                </div>
                {mat.isCompletedByStudent ? (
                  <Badge variant="success" size="sm">Selesai</Badge>
                ) : (
                  <Badge variant="default" size="sm">Belum Dibaca</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tugas Saya */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Tugas & Deadline Terdekat
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/assignments')}
            >
              Lihat Semua
            </Button>
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => {
              const subm = submissions.find((s) => s.assignmentId === asg.id && s.studentId === currentUser.id);
              return (
                <div
                  key={asg.id}
                  onClick={() => navigate(`/assignments/${asg.id}`)}
                  className="p-3 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {asg.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {asg.subjectName} • Batas: {new Date(asg.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <div>
                    {subm ? (
                      subm.status === 'graded' ? (
                        <Badge variant="success" size="sm">Nilai: {subm.score}</Badge>
                      ) : (
                        <Badge variant="warning" size="sm">Terkumpul</Badge>
                      )
                    ) : (
                      <Badge variant="danger" size="sm">Belum Kumpul</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
