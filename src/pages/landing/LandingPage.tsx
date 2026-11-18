import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Library,
  Award,
  Users,
  CheckCircle2,
  Menu,
  X,
  FileText,
  UserCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { RevealOnScroll } from '../../components/common/RevealOnScroll';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickLogin = (role: 'admin' | 'guru' | 'siswa' | 'kepala' | 'orangtua', target: string) => {
    switchRole(role);
    navigate(target);
  };

  const newsItems = [
    {
      date: '18 November 2026',
      tag: 'Akademik',
      title: 'Pelaksanaan Ujian Sumatif Tengah Semester Ganjil T.A. 2026/2027 Berbasis Komputer Dimulai',
      desc: 'Seluruh peserta didik kelas X, XI, dan XII diimbau memeriksa jadwal sesi pada portal LMS dan memastikan akun telah siap.',
    },
    {
      date: '16 November 2026',
      tag: 'Perpustakaan',
      title: 'Pembaruan Koleksi Buku Teks Kurikulum Merdeka Kemendikdasmen di Perpustakaan Digital',
      desc: 'Tersedia 320 judul buku teks utama dan referensi pendukung yang dapat diakses langsung oleh siswa dan bapak/ibu guru.',
    },
    {
      date: '12 November 2026',
      tag: 'Pengumuman',
      title: 'Undangan Pertemuan Evaluasi Pembelajaran Bersama Komite Orang Tua / Wali Siswa',
      desc: 'Sesi konsultasi perkembangan akademik putra-putri bersama Kepala Sekolah dan para Wali Kelas pada akhir pekan ini.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Dynamic Animated Navbar (Seamless #F5F7FB background with hero, slim elegant floating capsule on scroll) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? 'pt-2.5 sm:pt-3.5 px-2.5 sm:px-4 pointer-events-none' : 'pt-0 px-0'
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled
              ? 'pointer-events-auto w-[96%] xl:w-[94%] max-w-[1400px] bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md shadow-[#142B50]/6 rounded-full px-5 sm:px-8 h-14'
              : 'w-full bg-[#F5F7FB] border-b border-slate-200/70 shadow-none rounded-none px-6 sm:px-10 lg:px-12 h-16'
          }`}
        >
          {/* School Brand Identity (Logo) */}
          <div
            className="flex items-center cursor-pointer select-none shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.png"
              alt="TechSoe LMS"
              className={`transition-all duration-300 w-auto object-contain ${
                isScrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-10'
              }`}
            />
          </div>

          {/* Desktop Links */}
          <div
            className={`hidden md:flex items-center text-xs font-semibold text-slate-600 transition-all duration-300 ${
              isScrolled ? 'gap-4 lg:gap-7' : 'gap-5 lg:gap-8'
            }`}
          >
            <a href="#pintu-portal" className="hover:text-[#142B50] transition-colors py-1 px-2.5 rounded-full hover:bg-slate-200/60">
              Civitas
            </a>
            <a href="#program" className="hover:text-[#142B50] transition-colors py-1 px-2.5 rounded-full hover:bg-slate-200/60">
              Akademik
            </a>
            <a href="#perpustakaan" className="hover:text-[#142B50] transition-colors py-1 px-2.5 rounded-full hover:bg-slate-200/60">
              Perpustakaan
            </a>
            <a href="#pengumuman" className="hover:text-[#142B50] transition-colors py-1 px-2.5 rounded-full hover:bg-slate-200/60">
              Agenda
            </a>
            <a href="#kontak" className="hover:text-[#142B50] transition-colors py-1 px-2.5 rounded-full hover:bg-slate-200/60">
              Kontak
            </a>
            <button
              type="button"
              onClick={() => navigate('/about-lms')}
              className="hover:text-[#142B50] transition-colors py-1 px-2.5 rounded-full hover:bg-slate-200/60 cursor-pointer"
            >
              Tentang LMS
            </button>
          </div>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-600 hover:text-[#142B50] px-3 py-1.5 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Role Demo
            </button>
            <Button
              variant="primary"
              size="sm"
              className={isScrolled ? 'rounded-full text-xs px-4 py-1.5 shadow-sm' : 'rounded-xl text-xs px-4 py-1.5'}
              onClick={() => handleQuickLogin('siswa', '/student/dashboard')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Masuk Portal
            </Button>
          </div>

          {/* Mobile hamburger (Touch-friendly 44x44px target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full text-slate-700 hover:bg-slate-200/60 active:bg-slate-300 cursor-pointer transition-colors w-10 h-10 flex items-center justify-center shrink-0"
            aria-label="Menu navigasi sekolah"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile dropdown menu (Comfortable 44px touch targets) */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden transition-all duration-300 ${
              isScrolled
                ? 'pointer-events-auto w-[96%] xl:w-[94%] max-w-[1400px] mx-auto mt-2 bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-4 space-y-1'
                : 'border-t border-slate-200 bg-[#F5F7FB] px-4 py-3 space-y-1 shadow-md'
            }`}
          >
            <a
              href="#pintu-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#142B50] hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              Pintu Masuk Civitas
            </a>
            <a
              href="#program"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#142B50] hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              Program Akademik
            </a>
            <a
              href="#perpustakaan"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#142B50] hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              Perpustakaan Buku
            </a>
            <a
              href="#pengumuman"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#142B50] hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              Warta & Agenda
            </a>
            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#142B50] hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              Kontak Kampus
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/about-lms');
              }}
              className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#142B50] hover:bg-slate-100 active:bg-slate-200 transition-colors w-full text-left cursor-pointer"
            >
              Tentang LMS
            </button>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full justify-center min-h-[44px] rounded-xl text-xs font-semibold"
              >
                Pilih Role Demo
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleQuickLogin('siswa', '/student/dashboard');
                }}
                className="w-full justify-center min-h-[44px] rounded-xl text-xs font-bold"
              >
                Masuk Portal Belajar
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Selamat Datang di SMA Techsoe (Responsive mobile-friendly spacing) */}
      <section className="relative overflow-hidden pt-24 sm:pt-32 pb-14 sm:pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#F5F7FB] via-white to-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#EAF0F8] text-[#142B50] px-3.5 py-1.5 rounded-full text-xs font-bold mb-5 border border-blue-200/60">
              <GraduationCap className="w-4 h-4 text-[#142B50]" />
              <span>Portal Resmi Pendidikan Digital SMA Techsoe</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142B50] tracking-tight leading-tight">
              Membentuk Generasi Cerdas, Berkarakter, dan Berdaya Saing Global.
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Selamat datang di portal pembelajaran resmi SMA Techsoe. Lingkungan akademik terpadu yang memfasilitasi kegiatan belajar mengajar, kurikulum nasional Kemendikdasmen, ujian berbasis komputer, dan evaluasi hasil belajar bagi seluruh civitas sekolah.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleQuickLogin('siswa', '/student/dashboard')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Masuk Portal Belajar
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/about-lms')}
                className="w-full sm:w-auto bg-white/90 hover:bg-white text-[#142B50] font-semibold border-slate-300"
              >
                Katalog Solusi & Fitur LMS
              </Button>
            </div>
          </div>

          {/* School Fact Figures */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <RevealOnScroll delay={0} className="h-full">
              <div className="h-full bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#142B50]">1.248</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Siswa Aktif</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">36 Rombel (Fase E & F)</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={90} className="h-full">
              <div className="h-full bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#142B50]">86</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Guru & Tenaga Pendidik</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Kualifikasi S1 & S2</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={180} className="h-full">
              <div className="h-full bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#142B50]">320+</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Koleksi Buku Teks Resmi</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Kurikulum Merdeka RI</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={270} className="h-full">
              <div className="h-full bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#142B50]">94.5%</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Rata-rata Presensi</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Disiplin Sekolah Unggul</span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Pintu Masuk Civitas Akademika (Direct Role Gateways) */}
      <section id="pintu-portal" className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="primary" size="md" className="mb-2">
              Akses Layanan Akademik
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Pintu Masuk Civitas Akademika SMA Techsoe
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Pilih portal sesuai peran Anda untuk mengakses ruang pembelajaran dan administrasi akademik sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gateway 1: Siswa */}
            <RevealOnScroll delay={0} className="h-full">
              <div className="h-full p-6 rounded-2xl border border-slate-200 bg-[#F5F7FB] hover:border-[#142B50] hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-[#142B50] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Portal Siswa</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Akses materi kelas virtual, pengumpulan tugas harian, buku digital Kurikulum Merdeka, ujian CBT, dan tutor belajar interaktif.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                    <p>• Materi & Tugas Terstruktur</p>
                    <p>• Ujian Online (CBT) Real-time</p>
                    <p>• Rapor & Hasil Belajar</p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => handleQuickLogin('siswa', '/student/dashboard')}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Masuk sebagai Siswa
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Gateway 2: Guru */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="h-full p-6 rounded-2xl border border-slate-200 bg-[#F5F7FB] hover:border-[#142B50] hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-[#142B50] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Portal Guru Pengampu</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Kelola jadwal mengajar, publikasi materi, asisten pembuatan modul ajar & soal ujian, koreksi tugas, serta input nilai buku rapor.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                    <p>• Penyusunan Modul Ajar Cepat</p>
                    <p>• Penilaian & Feedback Tugas</p>
                    <p>• Gradebook & Presensi Kelas</p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => handleQuickLogin('guru', '/teacher/dashboard')}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Masuk sebagai Guru
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Gateway 3: Orang Tua */}
            <RevealOnScroll delay={200} className="h-full">
              <div className="h-full p-6 rounded-2xl border border-slate-200 bg-[#F5F7FB] hover:border-[#142B50] hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-[#142B50] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Portal Orang Tua / Wali</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Pantau kehadiran harian putra-putri, rekapitulasi nilai rapor tengah semester, jadwal ujian, serta komunikasi langsung wali kelas.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                    <p>• Rekapitulasi Presensi Anak</p>
                    <p>• Pantauan Capaian Nilai</p>
                    <p>• Informasi & Undangan Sekolah</p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => handleQuickLogin('orangtua', '/parent/dashboard')}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Masuk sebagai Orang Tua
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Gateway 4: Kepala Sekolah & Pimpinan */}
            <RevealOnScroll delay={300} className="h-full">
              <div className="h-full p-6 rounded-2xl border border-slate-200 bg-[#F5F7FB] hover:border-[#142B50] hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-[#142B50] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Pimpinan & Manajemen</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Executive dashboard pemantauan efektivitas pembelajaran sekolah, analitik kehadiran, capaian mutu akademik, dan administrasi pengguna.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                    <p>• Learning Analytics Sekolah</p>
                    <p>• Monitoring Mutu & Kurikulum</p>
                    <p>• Manajemen Pengguna & Rombel</p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => handleQuickLogin('kepala', '/principal/dashboard')}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Masuk Pimpinan / Admin
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Program Akademik & Fasilitas Sekolah */}
      <section id="program" className="py-16 sm:py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-[#142B50] uppercase tracking-wider block mb-1">
              Keunggulan Akademik
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Layanan Pembelajaran Modern SMA Techsoe
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Memadukan kurikulum nasional dengan infrastruktur teknologi digital untuk mendukung eksplorasi keilmuan siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RevealOnScroll delay={0} className="h-full">
              <div className="h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Kurikulum Merdeka (Fase E & F)</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Penerapan pembelajaran diferensiasi dengan mata pelajaran peminatan mendalam seperti Informatika, Matematika Lanjut, dan Fisika analitik.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120} className="h-full">
              <div className="h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Laboratorium Komputer & CBT Center</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Asesmen sumatif dan formatif berbasis komputer yang adil, transparan, dan dilengkapi pembahasan soal langsung setelah ujian selesai.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={240} className="h-full">
              <div className="h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Pendamping Belajar Terpadu</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Fasilitas asistensi konsep belajar mandiri bagi siswa serta alat bantu perancangan perangkat ajar bagi bapak/ibu guru.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Perpustakaan Digital & Koleksi Buku Teks */}
      <section id="perpustakaan" className="py-16 sm:py-24 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll delay={0} direction="right">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full mb-3 border border-slate-200">
                  <Library className="w-3.5 h-3.5 text-[#142B50]" />
                  <span>Perpustakaan Literasi Digital</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  Koleksi Buku Teks Utama Kemendikdasmen RI
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Seluruh siswa dan guru SMA Techsoe memiliki akses penuh terhadap buku teks kurikulum nasional digital. Memudahkan proses belajar mandiri kapan saja dengan pembaca digital yang nyaman di ponsel maupun laptop.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#142B50] shrink-0" />
                    <span>Koleksi resmi terstandar SD, SMP, SMA, dan SMK.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#142B50] shrink-0" />
                    <span>Digital Book Reader dengan navigasi bab dan penanda bacaan.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#142B50] shrink-0" />
                    <span>Tersedia secara gratis untuk seluruh warga sekolah.</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate('/books')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Buka Koleksi Buku Digital SMA Techsoe
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Book Previews */}
            <RevealOnScroll delay={150} direction="left">
              <div className="bg-[#F5F7FB] p-6 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Buku Teks Pembelajaran Semester Ini:
                </span>

                <div
                  onClick={() => navigate('/books/book-info-sma-11')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#142B50] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-[#142B50] rounded text-white font-bold text-xs flex items-center justify-center shrink-0">
                      INF
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Informatika SMA Kelas XI</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Kemendikbudristek • Kurikulum Merdeka</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                <div
                  onClick={() => navigate('/books/book-mat-sma-11')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#142B50] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-[#142B50] rounded text-white font-bold text-xs flex items-center justify-center shrink-0">
                      MAT
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Matematika Tingkat Lanjut SMA Kelas XI</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Kemendikbudristek • Kurikulum Merdeka</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                <div
                  onClick={() => navigate('/books/book-fis-sma-11')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#142B50] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-[#142B50] rounded text-white font-bold text-xs flex items-center justify-center shrink-0">
                      FIS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Fisika untuk SMA/MA Kelas XI</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Kemendikbudristek • Kurikulum Merdeka</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Warta & Agenda Sekolah Terkini */}
      <section id="pengumuman" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-[#142B50] uppercase tracking-wider block mb-1">
                Warta Kampus
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Pengumuman & Agenda Akademik Terbaru
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/notifications')}
            >
              Lihat Semua Pengumuman
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 120} className="h-full">
                <div className="h-full p-6 rounded-2xl border border-slate-200 bg-[#F5F7FB] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                      <span className="font-semibold text-[#142B50] bg-blue-100/60 px-2.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => navigate('/notifications')}
                      className="text-xs font-semibold text-[#142B50] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Baca Informasi Lengkap →
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Identitas Kampus & Kontak Resmi */}
      <section id="kontak" className="py-16 sm:py-20 bg-[#142B50] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <img
                  src="/logo-white.png"
                  alt="TechSoe LMS"
                  className="h-9 sm:h-10 w-auto object-contain mb-2"
                />
                <span className="text-[10px] text-blue-200 block">Terakreditasi A (Unggul)</span>
              </div>
              <p className="text-xs text-blue-200 leading-relaxed max-w-sm">
                Membina generasi cendekia yang berakhlak mulia, menguasai ilmu pengetahuan, dan siap bersaing di kancah global.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase text-white tracking-wider mb-3">
                Sekretariat & Lokasi Kampus
              </h3>
              <div className="space-y-2 text-xs text-blue-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                  <span>Jl. Pendidikan Techsoe No. 45, Kebayoran Baru, Jakarta Selatan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                  <span>(021) 7890-1234 / 0812-3456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                  <span>sekretariat@smatechsoe.sch.id</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase text-white tracking-wider mb-3">
                Jam Layanan Akademik
              </h3>
              <div className="space-y-1.5 text-xs text-blue-200">
                <p>Senin : Kamis: 07.00 : 16.00 WIB</p>
                <p>Jumat: 07.00 : 15.30 WIB</p>
                <p>Sabtu : Minggu: Libur / Kegiatan Ekstrakurikuler Terjadwal</p>
                <p className="text-[11px] text-blue-300/70 pt-2">
                  Portal Pembelajaran LMS Techsoe dapat diakses 24 jam setiap hari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1B33] text-slate-400 text-xs py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            © 2026 SMA Techsoe. Seluruh hak cipta dilindungi. Portal Pembelajaran LMS Techsoe.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <a href="#pintu-portal" className="hover:text-white">Portal Siswa</a>
            <a href="#pintu-portal" className="hover:text-white">Portal Guru</a>
            <a href="#perpustakaan" className="hover:text-white">Perpustakaan</a>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hover:text-white underline cursor-pointer"
            >
              Login Sistem
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
