import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  FileCheck2,
  FileText,
  CalendarCheck2,
  ClipboardList,
  HeartHandshake,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  Award,
  Users,
  Smartphone,
  Laptop,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { RevealOnScroll } from '../../components/common/RevealOnScroll';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';

export const AboutLMSPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useStore();
  const [activeCategory, setActiveCategory] = useState<'semua' | 'ai' | 'akademik' | 'operasional' | 'evaluasi'>('semua');

  const handleLaunchRoleDemo = (role: UserRole, targetPath: string) => {
    switchRole(role);
    navigate(targetPath);
  };

  const featurePillars = [
    {
      id: 'ai-copilot',
      category: 'ai',
      badge: 'Teknologi AI',
      title: 'AI Teaching & Learning Assistant',
      desc: 'Memberdayakan bapak/ibu guru membuat modul ajar dan kisi-kisi soal secara cepat, sekaligus menyediakan tutor belajar interaktif bagi siswa.',
      icon: <Sparkles className="w-5 h-5 text-[#142B50]" />,
      features: [
        'Penyusunan modul ajar dan Alur Tujuan Pembelajaran (ATP) terstruktur',
        'Tutor AI pendamping belajar mandiri siswa dengan analogi mudah dipahami',
        'Pembuat kuis, flashcard konsep materi, dan rangkuman bahan ajar',
        'Penghematan waktu administrasi hingga 70% bagi guru pengampu',
      ],
      demoLink: '/ai/teaching',
      demoLabel: 'Coba AI Teaching Assistant',
      role: 'guru' as UserRole,
    },
    {
      id: 'kbm-digital',
      category: 'akademik',
      badge: 'Kurikulum Merdeka',
      title: 'Kelas Virtual & Perpustakaan Digital Nasional',
      desc: 'Pusat pembelajaran digital terintegrasi dengan akses langsung ke 3+ judul buku teks utama kurikulum merdeka dari Kemendikdasmen.',
      icon: <BookOpen className="w-5 h-5 text-[#142B50]" />,
      features: [
        'Manajemen kelas virtual berbasis mata pelajaran dan capaian pembelajaran',
        'Buku teks resmi Kemendikdasmen dengan penampil e-reader digital',
        'Materi ajar multimedia (teks terstruktur, video, slide, dan dokumen)',
        'Pelacak progres belajar dan ketuntasan materi mandiri siswa',
      ],
      demoLink: '/virtual-classes',
      demoLabel: 'Buka Kelas Virtual',
      role: 'guru' as UserRole,
    },
    {
      id: 'cbt-exam',
      category: 'evaluasi',
      badge: 'Ujian Digital',
      title: 'Ujian CBT Online & Bank Soal Terstandar',
      desc: 'Platform Computer-Based Testing terstruktur dengan mode fullscreen lockdown, pengacakan butir soal, passing grade KKM, dan auto-grading.',
      icon: <FileText className="w-5 h-5 text-[#142B50]" />,
      features: [
        'Mode Ujian CBT fullscreen lockdown untuk integritas pelaksanaan ujian',
        'Bank soal kolaboratif dengan klasifikasi tingkat kesulitan soal',
        'Penilaian otomatis instan untuk soal pilihan ganda dan kunci jawaban',
        'Analisis capaian kompetensi dan distribusi nilai peserta didik',
      ],
      demoLink: '/exams',
      demoLabel: 'Buka Simulasi Ujian CBT',
      role: 'siswa' as UserRole,
    },
    {
      id: 'teacher-journal',
      category: 'operasional',
      badge: 'Standar Akreditasi',
      title: 'Jurnal Mengajar Harian & Supervisi Bulanan',
      desc: 'Pencatatan real-time agenda KBM per jam pelajaran lengkap dengan format laporan supervisi resmi bertanda tangan Kepala Sekolah.',
      icon: <ClipboardList className="w-5 h-5 text-[#142B50]" />,
      features: [
        'Pencatatan materi pokok, deskripsi kegiatan KBM, dan media belajar harian',
        'Rekap presensi hadir dan izin siswa per sesi jam pelajaran',
        'Filter komprehensif berdasarkan bulan, tahun, kelas, dan mata pelajaran',
        'Format cetak supervisi bulanan resmi untuk keperluan akreditasi sekolah',
      ],
      demoLink: '/teacher/journal',
      demoLabel: 'Buka Jurnal Mengajar',
      role: 'guru' as UserRole,
    },
    {
      id: 'counseling-bk',
      category: 'operasional',
      badge: 'Karakter & Prestasi',
      title: 'Bimbingan Konseling (BK), Disiplin & Prestasi',
      desc: 'Sistem komprehensif pendampingan siswa, inventarisasi poin kedisiplinan tata tertib, serta etalase kebanggaan piagam prestasi sekolah.',
      icon: <HeartHandshake className="w-5 h-5 text-[#142B50]" />,
      features: [
        'Pengajuan sesi konseling bimbingan dengan proteksi kerahasiaan siswa',
        'Buku catatan pelanggaran tata tertib dan bobot poin pembinaan',
        'Rencana tindakan pembinaan karakter terukur dan koordinasi wali kelas',
        'Galeri piagam prestasi siswa tingkat sekolah, kota, provinsi, dan nasional',
      ],
      demoLink: '/counseling',
      demoLabel: 'Buka Portal BK & Prestasi',
      role: 'guru' as UserRole,
    },
    {
      id: 'attendance-analytics',
      category: 'evaluasi',
      badge: 'Presensi & Evaluasi',
      title: 'Presensi Mandiri GPS & Learning Analytics',
      desc: 'Sistem presensi kehadiran harian siswa dan guru dengan validasi geofencing, disertai grafik analitik performa belajar yang mendalam.',
      icon: <CalendarCheck2 className="w-5 h-5 text-[#142B50]" />,
      features: [
        'Presensi siswa dengan proteksi privasi ketat (siswa hanya melihat miliknya sendiri)',
        'Presensi bapak/ibu guru dengan status hadir, izin, atau sakit',
        'Visualisasi radar kompetensi dan statistik ketuntasan materi',
        'Buku nilai (Gradebook) digital dan generasi e-Rapor komprehensif',
      ],
      demoLink: '/attendance',
      demoLabel: 'Buka Sistem Presensi',
      role: 'guru' as UserRole,
    },
  ];

  const roleExperiences = [
    {
      role: 'kepala' as UserRole,
      title: 'Kepala Sekolah & Pimpinan Yayasan',
      subtitle: 'Monitoring KBM Real-Time & Supervisi Akreditasi',
      badge: 'Pimpinan',
      desc: 'Visibilitas menyeluruh atas jalannya KBM di setiap kelas, rekapitulasi kehadiran guru dan siswa harian, supervisi jurnal bulanan, dan evaluasi capaian mutu sekolah dalam satu dasbor terpadu.',
      benefits: [
        'Dashboard metrik kehadiran dan progres kurikulum sekolah',
        'Validasi dan supervisi cetak jurnal mengajar guru dalam 1 klik',
        'Evaluasi mutu rapor dan akreditasi sekolah berbasis data nyata',
      ],
      targetPath: '/principal/dashboard',
    },
    {
      role: 'guru' as UserRole,
      title: 'Guru Mata Pelajaran & Wali Kelas',
      subtitle: 'Hemat Waktu Administrasi, Maksimalkan Pengajaran',
      badge: 'Pendidik',
      desc: 'Kemudahan menyusun modul ajar dengan bantuan AI, publikasi materi multimedia, ujian CBT anti-curang, penilaian tugas terstruktur, dan rekapitulasi jurnal mengajar otomatis.',
      benefits: [
        'Penyusunan bahan ajar dan kisi-kisi soal dibantu AI Copilot',
        'Penilaian tugas terstruktur dengan feedback langsung ke siswa',
        'Jurnal harian otomatis terkompilasi ke laporan supervisi bulanan',
      ],
      targetPath: '/teacher/dashboard',
    },
    {
      role: 'siswa' as UserRole,
      title: 'Peserta Didik (Siswa)',
      subtitle: 'Akses Buku Digital, Ujian Terjadwal & Tutor Belajar',
      badge: 'Pelajar',
      desc: 'Akses gratis ke seluruh koleksi buku pelajaran resmi Kemendikdasmen, pengerjaan tugas dan ujian CBT terjadwal, pendamping belajar mandiri AI, dan pemantauan piagam prestasi.',
      benefits: [
        'Akses 3+ buku teks digital kurikulum merdeka langsung di gawai',
        'Ujian CBT terjadwal dengan KKM dan pembahasan nilai transparan',
        'Privasi presensi terlindungi dan ruang aman konsultasi BK',
      ],
      targetPath: '/student/dashboard',
    },
    {
      role: 'orangtua' as UserRole,
      title: 'Orang Tua / Wali Murid',
      subtitle: 'Pemantauan Kehadiran & Progres Belajar Anak',
      badge: 'Keluarga',
      desc: 'Pantau kehadiran putra-putri di sekolah secara mandiri setiap hari, tinjau progres nilai tugas dan ujian, serta terima pengumuman resmi sekolah tanpa menunggu rapat semesteran.',
      benefits: [
        'Monitoring presensi kehadiran harian putra-putri di sekolah',
        'Transparansi riwayat nilai tugas, ujian, dan catatan karakter',
        'Akses warta pengumuman dan jadwal agenda sekolah terkini',
      ],
      targetPath: '/parent/dashboard',
    },
    {
      role: 'admin' as UserRole,
      title: 'Administrator Sekolah & Tata Usaha',
      subtitle: 'Manajemen Data Civitas & Konfigurasi Sistem',
      badge: 'Administrator',
      desc: 'Kelola basis data siswa dan guru, pembagian rombongan belajar, kalender jadwal KBM mingguan, kurikulum kompetensi, serta pemeliharaan data dengan aman.',
      benefits: [
        'Manajemen pengguna dengan kontrol hak akses berbasis peran (RBAC)',
        'Pengaturan jadwal KBM mingguan per kelas dan alokasi ruang lab',
        'Penyimpanan data lokal yang aman dan pemulihan data demo instan',
      ],
      targetPath: '/admin/dashboard',
    },
  ];

  const comparisonRows = [
    {
      aspect: 'Persiapan Modul & Bahan Ajar Guru',
      traditional: 'Penyusunan berkas ajar secara manual yang memakan waktu berhari-hari.',
      lmsTechsoe: 'Penyusunan modul dan ATP instan dengan bantuan AI Teaching Assistant.',
    },
    {
      aspect: 'Pelaksanaan Ujian & Koreksi Soal',
      traditional: 'Pencetakan lembar soal kertas, risiko kebocoran, dan waktu koreksi berhari-hari.',
      lmsTechsoe: 'CBT digital fullscreen lockdown dengan penilaian otomatis dan bank soal terpusat.',
    },
    {
      aspect: 'Administrasi Jurnal Harian KBM',
      traditional: 'Buku catatan fisik di meja guru, sulit disupervisi kepala sekolah secara rutin.',
      lmsTechsoe: 'Jurnal harian digital real-time, siap cetak laporan supervisi bulanan akreditasi.',
    },
    {
      aspect: 'Koleksi Buku Pegangan Siswa',
      traditional: 'Beban biaya cetak buku tinggi dan tas sekolah berat membawa banyak buku fisik.',
      lmsTechsoe: 'Perpustakaan digital 3+ judul buku kurikulum merdeka resmi langsung di gawai.',
    },
    {
      aspect: 'Buku Tata Tertib & Prestasi Siswa',
      traditional: 'Catatan pelanggaran manual rawan hilang dan piagam prestasi tidak terdata rapi.',
      lmsTechsoe: 'Buku poin disiplin terstruktur dan galeri piagam prestasi siswa tersimpan rapi.',
    },
    {
      aspect: 'Keterlibatan Orang Tua Siswa',
      traditional: 'Mengetahui perkembangan nilai anak hanya setiap 6 bulan saat pembagian rapor.',
      lmsTechsoe: 'Akses mandiri harian memantau kehadiran, nilai tugas, dan perkembangan anak.',
    },
  ];

  const filteredPillars = activeCategory === 'semua'
    ? featurePillars
    : featurePillars.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      {/* Top Header Navigation (Clean Enterprise) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <img
              src="/logo.png"
              alt="Auladina LMS"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <span className="text-[11px] text-slate-500 font-semibold border-l border-slate-200 pl-3 py-1 hidden sm:inline-block">
              Katalog Fitur & Solusi Sekolah
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs font-semibold text-slate-600 hover:text-[#142B50] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              Beranda Sekolah
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-600 hover:text-[#142B50] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer hidden sm:block"
            >
              Role Demo
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleLaunchRoleDemo('admin', '/admin/dashboard')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs font-bold rounded-lg"
            >
              Mulai Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section (Clean Navy & Slate Theme) */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-3.5 py-1 rounded-full text-xs font-semibold border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#142B50]" />
              <span>Solusi Manajemen Pendidikan Digital Sekolah Terpadu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#142B50] tracking-tight leading-tight">
              Satu Ekosistem Digital Terpadu untuk Seluruh Aktivitas Akademik Sekolah
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
              LMS Techsoe dirancang untuk memenuhi standar <strong>Kurikulum Merdeka Kemendikdasmen</strong> dan tata kelola akreditasi sekolah modern. Menyatukan kepala sekolah, bapak/ibu guru pengampu, siswa, dan orang tua dalam satu platform yang terstruktur, aman, dan mudah digunakan.
            </p>

            {/* Quick Metrics Bar (Clean Monochromatic) */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <RevealOnScroll delay={0} className="h-full">
                <div className="h-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-[#142B50]">5 Peran</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Portal Khusus Terpadu</div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={80} className="h-full">
                <div className="h-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-[#142B50]">70%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Efisiensi Administrasi Guru</div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={160} className="h-full">
                <div className="h-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-[#142B50]">AI Copilot</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Asisten Guru & Siswa</div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={240} className="h-full">
                <div className="h-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-[#142B50]">3+ Buku</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Buku Teks Resmi Kemendikdasmen</div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleLaunchRoleDemo('guru', '/teacher/dashboard')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-xs sm:text-sm font-bold rounded-lg"
              >
                Coba Demo Guru Pengampu
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => handleLaunchRoleDemo('siswa', '/student/dashboard')}
                className="w-full sm:w-auto text-xs sm:text-sm font-semibold rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
              >
                Coba Demo Siswa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Showcase (Clean Slate Palette) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Daftar Modul & Fitur
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#142B50] tracking-tight">
            Modul Utama Berstandar Operasional Sekolah
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Seluruh fitur dibangun langsung dari alur kerja riil kegiatan belajar mengajar, administrasi akreditasi, dan evaluasi hasil belajar.
          </p>

          {/* Category Filter Pills (Clean Neutral) */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5">
            {[
              { id: 'semua', label: 'Semua Modul (6)' },
              { id: 'ai', label: 'Kecerdasan Buatan (AI)' },
              { id: 'akademik', label: 'KBM & Kurikulum' },
              { id: 'operasional', label: 'Administrasi & BK' },
              { id: 'evaluasi', label: 'Ujian & Penilaian' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#142B50] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid (Clean Slate & Navy Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPillars.map((pillar, idx) => (
            <RevealOnScroll key={pillar.id} delay={(idx % 3) * 100} className="h-full">
              <div
                className="h-full bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-[#142B50]/40 transition p-5 sm:p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      {pillar.icon}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {pillar.features.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#142B50] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleLaunchRoleDemo(pillar.role, pillar.demoLink)}
                    className="w-full py-2 px-3.5 bg-slate-50 hover:bg-slate-100 text-[#142B50] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <span>{pillar.demoLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 5-in-1 Stakeholder Experience (Monochromatic Enterprise) */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Hak Akses Multi-Role
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#142B50] tracking-tight">
              Didesain Khusus untuk Setiap Pemangku Kepentingan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Setiap peran memiliki portal terpisah yang relevan dengan tanggung jawabnya, bebas dari kekacauan antarmuka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roleExperiences.map((exp, idx) => (
              <RevealOnScroll key={idx} delay={(idx % 3) * 100} className="h-full">
                <div
                  className="h-full bg-slate-50/70 rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-800 border border-slate-200">
                        {exp.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Role: {exp.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#142B50] mt-0.5">
                        {exp.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      {exp.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#142B50] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLaunchRoleDemo(exp.role, exp.targetPath)}
                      className="w-full justify-center text-xs font-bold rounded-lg bg-white border-slate-300 text-[#142B50] hover:bg-slate-100"
                    >
                      Buka Portal {exp.badge} →
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Before-vs-After Comparison Table (Clean Corporate Table) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Komparasi Efisiensi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#142B50] tracking-tight">
            Perbandingan Alur Kerja Tradisional vs LMS Techsoe
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Penghematan biaya cetak kertas, otomasi koreksi nilai, dan ketersediaan data akreditasi siap pakai setiap saat.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#142B50] text-white uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-5 py-3.5 w-1/4">Aspek Operasional</th>
                  <th className="px-5 py-3.5 w-3/8 text-slate-300">Cara Tradisional / Tanpa LMS</th>
                  <th className="px-5 py-3.5 w-3/8 text-white bg-[#0D1B33]">Dengan LMS Techsoe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5 font-bold text-slate-900 align-top">
                      {row.aspect}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 align-top leading-relaxed">
                      {row.traditional}
                    </td>
                    <td className="px-5 py-3.5 text-slate-800 font-semibold align-top leading-relaxed bg-slate-50/60">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#142B50] shrink-0 mt-0.5" />
                        <span>{row.lmsTechsoe}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Security & Multi-Device Guarantees (Clean Navy) */}
      <section className="py-10 bg-[#0D1B33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <RevealOnScroll delay={0} className="h-full">
              <div className="h-full flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2.5 bg-white/10 text-white rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Privasi Data Peserta Didik</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Perlindungan data pribadi. Siswa hanya dapat melihat presensi dan nilainya sendiri tanpa kebocoran catatan teman sekelas.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100} className="h-full">
              <div className="h-full flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2.5 bg-white/10 text-white rounded-lg shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Responsif di Semua Perangkat</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Dapat diakses lancar dari smartphone orang tua siswa, laptop guru pengampu, tablet belajar, hingga komputer laboratorium.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200} className="h-full">
              <div className="h-full flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2.5 bg-white/10 text-white rounded-lg shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Standar Akreditasi Nasional</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Format cetak jurnal mengajar harian, e-rapor, dan bank soal memenuhi standar instrumen penilaian BAN-S/M Kemendikdasmen.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Bottom CTA (Clean Solid Navy) */}
      <section className="py-14 sm:py-16 bg-[#142B50] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Mulai Demo Interaktif LMS Techsoe Sekarang
          </h2>

          <p className="text-xs sm:text-sm text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Eksplorasi langsung setiap fitur dan ganti peran demo secara instan dengan satu klik untuk melihat pengalaman nyata seluruh civitas sekolah.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleLaunchRoleDemo('admin', '/admin/dashboard')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#142B50]" />}
              className="w-full sm:w-auto text-xs font-bold rounded-lg bg-white text-[#142B50] hover:bg-slate-100"
            >
              Mulai Tur Demo Sekolah
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto text-xs font-semibold rounded-lg bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
