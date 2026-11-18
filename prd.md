# PRD -- AI Learning Management System (AI LMS)

**Product:** AI-Powered Integrated Learning Management System\
**Dokumen:** Product Requirements Document\
**Versi:** 1.0\
**Tanggal:** November 2026\
**Status:** Frontend Prototype / Demo

------------------------------------------------------------------------

## 1. Product Overview

### 1.1 Deskripsi Produk

AI Learning Management System (AI LMS) adalah platform manajemen
pembelajaran digital terintegrasi yang dirancang untuk membantu sekolah
mengelola aktivitas pendidikan secara terpusat. Platform menggabungkan
Learning Management System (LMS), manajemen akademik, perpustakaan
digital, evaluasi pembelajaran, analitik, dan konsep kecerdasan buatan
(AI).

Sistem ditujukan bagi administrator sekolah, kepala sekolah, guru,
siswa, dan orang tua. Produk demo harus memperlihatkan alur kerja yang
realistis, antarmuka profesional, serta keterhubungan antarmodul.

Salah satu keunggulan produk adalah katalog referensi buku kurikulum
nasional yang mengacu pada sumber resmi Kemendikdasmen, disertai konsep
AI Learning Assistant yang membantu proses belajar dan mengajar.

### 1.2 Visi Produk

Mewujudkan ekosistem pembelajaran digital yang terintegrasi, adaptif,
mudah digunakan, dan mendukung peningkatan kualitas pendidikan melalui
pemanfaatan teknologi.

### 1.3 Tujuan Produk

1.  Mendigitalisasi aktivitas pembelajaran dan administrasi akademik.
2.  Mempermudah guru mengelola kelas, materi, tugas, ujian, dan
    penilaian.
3.  Menyediakan pengalaman belajar digital yang terstruktur bagi siswa.
4.  Menyediakan katalog referensi buku berdasarkan jenjang, kelas, mata
    pelajaran, dan kurikulum.
5.  Menghadirkan konsep AI untuk membantu guru menyiapkan pembelajaran
    dan siswa memahami materi.
6.  Menyediakan pemantauan akademik dan analitik bagi pimpinan sekolah.
7.  Memudahkan orang tua memantau perkembangan belajar anak.

### 1.4 Target Pengguna

  Role             Tanggung Jawab
  ---------------- ----------------------------------------------------------
  Super Admin      Mengelola platform dan konfigurasi global
  Admin Sekolah    Mengelola data dan operasional LMS sekolah
  Kepala Sekolah   Memantau kinerja akademik dan aktivitas sekolah
  Guru             Mengelola pembelajaran, tugas, ujian, dan penilaian
  Siswa            Mengakses materi, mengerjakan tugas, dan mengikuti ujian
  Orang Tua        Memantau kehadiran dan perkembangan akademik anak

### 1.5 Prinsip Produk

-   Satu platform untuk aktivitas akademik dan pembelajaran.
-   Pengalaman pengguna disesuaikan dengan role.
-   AI berfungsi sebagai pendamping, bukan pengganti guru.
-   Materi dan referensi harus memiliki sumber yang jelas.
-   Antarmuka mudah dipahami oleh pengguna dengan tingkat literasi
    digital yang beragam.
-   Seluruh alur demo harus dapat dicoba tanpa backend.

------------------------------------------------------------------------

## 2. Design System

### 2.1 Design Direction

Gunakan gaya **modern educational SaaS** dengan karakter visual:

-   Modern, profesional, minimalis, dan premium.
-   Dominasi warna putih dengan navy sebagai identitas utama.
-   Layout dashboard yang bersih dan informatif.
-   Sidebar navigation dan top navigation yang konsisten.
-   Card-based interface dengan hierarki informasi jelas.
-   Ruang kosong yang cukup dan tipografi mudah dibaca.
-   Grafik dan visualisasi data yang tidak berlebihan.
-   Responsif untuk desktop, tablet, dan mobile.

### 2.2 Color Palette

  Token              Hex         Penggunaan
  ------------------ ----------- ----------------------------------------
  Primary Navy       `#142B50`   Sidebar, tombol utama, heading penting
  Navy Dark          `#0D1B33`   Hover dan elemen penekanan
  White              `#FFFFFF`   Latar utama dan card
  Light Background   `#F5F7FB`   Latar halaman
  Light Navy         `#EAF0F8`   Surface sekunder dan selected state
  Slate              `#64748B`   Teks sekunder
  Border             `#E2E8F0`   Garis pembatas
  Success            `#16A34A`   Status berhasil
  Warning            `#F59E0B`   Status perhatian
  Danger             `#DC2626`   Status gagal atau kritis
  Info               `#2563EB`   Informasi

### 2.3 Typography

-   Font utama: **Plus Jakarta Sans** atau **Jakarta Sans**.
-   Heading: Bold atau Semibold.
-   Body: Regular.
-   Label dan metadata: Medium.
-   Gunakan skala tipografi konsisten untuk heading, body, caption, dan
    label.

### 2.4 UI Components

Bangun komponen reusable untuk:

-   Sidebar navigation.
-   Topbar dan user profile menu.
-   Breadcrumb.
-   Statistic cards.
-   Data table.
-   Search bar dan filter.
-   Tabs dan dropdown.
-   Modal dan drawer.
-   Form controls dan validation message.
-   Buttons dengan state default, hover, disabled, dan loading.
-   Charts dan progress indicators.
-   Calendar dan date picker.
-   Toast notifications.
-   Pagination.
-   Empty state, error state, dan loading skeleton.
-   Confirmation dialog.

### 2.5 Iconography

Gunakan Lucide React dengan ukuran dan stroke konsisten. Jangan gunakan
emoji sebagai ikon antarmuka.

------------------------------------------------------------------------

## 3. Information Architecture

### 3.1 Admin Sekolah

  Menu           Submenu
  -------------- -------------------------------------------------
  Dashboard      Overview, Statistik
  Akademik       Tahun Ajaran, Semester, Kalender Akademik
  Pengguna       Guru, Siswa, Orang Tua, Admin
  Kelas          Data Kelas, Rombongan Belajar
  Kurikulum      Kurikulum, Mata Pelajaran, Capaian Pembelajaran
  Pembelajaran   Materi, Modul, Jadwal
  Perpustakaan   Katalog Buku, Koleksi Digital
  Evaluasi       Bank Soal, Ujian, Nilai
  AI Center      AI Assistant, AI Generator
  Laporan        Akademik, Aktivitas, Kehadiran
  Pengaturan     Profil Sekolah, Konfigurasi Sistem

### 3.2 Guru

-   Dashboard Guru
-   Jadwal Mengajar
-   Kelas yang Diampu
-   Mata Pelajaran
-   Materi Pembelajaran
-   Modul Ajar
-   Tugas Siswa
-   Ujian dan Kuis
-   Bank Soal
-   Penilaian
-   Rapor Siswa
-   AI Teaching Assistant
-   Laporan Pembelajaran

### 3.3 Siswa

-   Dashboard Belajar
-   Kelas Saya
-   Jadwal Pelajaran
-   Materi Pembelajaran
-   Buku Digital
-   AI Learning Assistant
-   Tugas Saya
-   Ujian dan Kuis
-   Nilai dan Hasil Belajar
-   Progress Belajar
-   Pengumuman
-   Profil Saya

### 3.4 Kepala Sekolah

-   Executive Dashboard
-   Statistik Akademik
-   Performa Guru
-   Performa Siswa
-   Monitoring Kelas
-   Monitoring Kurikulum
-   Laporan Akademik
-   Evaluasi Pembelajaran
-   Analisis Kehadiran

### 3.5 Orang Tua

-   Dashboard Anak
-   Profil dan Data Anak
-   Kehadiran
-   Jadwal Pelajaran
-   Nilai Akademik
-   Tugas dan Ujian
-   Progress Pembelajaran
-   Pengumuman Sekolah
-   Riwayat Perkembangan

------------------------------------------------------------------------

## 4. Functional Requirements

### 4.1 Dashboard Management

Setiap role memiliki dashboard yang disesuaikan dengan kebutuhan dan
kewenangannya.

**Fitur:** - Ringkasan statistik sesuai role. - Aktivitas pembelajaran
terbaru. - Kalender akademik. - Notifikasi dan pengumuman. - Grafik
perkembangan akademik. - Statistik penyelesaian tugas. - Quick actions
untuk aktivitas yang sering digunakan. - Daftar tugas atau aktivitas
yang perlu ditindaklanjuti.

**Dashboard Admin:** - Total siswa, guru, kelas, dan mata pelajaran. -
Jumlah materi dan aktivitas pembelajaran. - Statistik pengguna aktif. -
Ringkasan kehadiran. - Aktivitas sistem terbaru.

**Dashboard Guru:** - Jadwal mengajar hari ini. - Kelas yang diampu. -
Tugas yang perlu dinilai. - Progress penyelesaian materi. - Ringkasan
performa kelas.

**Dashboard Siswa:** - Jadwal hari ini. - Materi yang sedang
dipelajari. - Tugas dan deadline terdekat. - Jadwal ujian. - Progress
belajar dan ringkasan nilai.

**Dashboard Kepala Sekolah:** - Ringkasan jumlah siswa dan guru. -
Statistik kehadiran. - Performa akademik. - Perbandingan capaian
kelas. - Ringkasan aktivitas pembelajaran.

**Dashboard Orang Tua:** - Ringkasan profil anak. - Kehadiran. - Nilai
terbaru. - Tugas yang belum selesai. - Aktivitas dan perkembangan
belajar.

### 4.2 User Management

Sistem menyediakan pengelolaan pengguna terpusat.

**Fitur:** - Tambah, lihat, edit, dan hapus pengguna. - Pengelolaan role
dan permission. - Pencarian, filter, dan pagination. - Import data siswa
dan guru melalui simulasi file. - Detail profil pengguna. - Status akun
aktif atau nonaktif. - Pengelolaan hubungan siswa dengan orang tua. -
Riwayat aktivitas pengguna dalam bentuk data demo.

**Data pengguna minimal:** - Nama lengkap. - Nomor induk atau identitas
internal demo. - Email. - Role. - Kelas atau unit kerja. - Status
akun. - Foto profil opsional.

### 4.3 Academic Management

Mengelola struktur akademik sekolah.

**Fitur:** - Tahun ajaran. - Semester. - Jenjang dan tingkat
pendidikan. - Kelas dan rombongan belajar. - Mata pelajaran. - Guru
pengampu. - Wali kelas. - Jadwal pelajaran. - Kalender akademik. -
Penugasan siswa ke kelas.

### 4.4 National Curriculum and Book References

Modul katalog referensi buku pembelajaran nasional yang mengacu pada
sumber resmi Kemendikdasmen.

**Fitur:** - Katalog buku berdasarkan jenjang pendidikan. - Filter kelas
dan mata pelajaran. - Filter kurikulum. - Detail informasi buku. -
Preview buku digital jika aset demo tersedia. - Daftar isi dan navigasi
halaman. - Pencarian berdasarkan judul atau topik. - Bookmark halaman. -
Rekomendasi buku berdasarkan mata pelajaran. - Informasi edisi dan tahun
terbit.

**Kategori jenjang:** - SD: Kelas 1--6. - SMP: Kelas 7--9. - SMA: Kelas
10--12. - SMK: Kelas 10--12.

**Metadata buku:** - Judul buku. - Penulis. - Penerbit. - Jenjang. -
Kelas. - Mata pelajaran. - Kurikulum. - Tahun terbit. - Edisi. -
Cover. - Deskripsi. - Status ketersediaan digital. - Sumber atau tautan
resmi jika tersedia.

**Ketentuan penting:** Untuk prototype, gunakan data katalog dan konten
simulasi yang diberi label sebagai data demo. Jangan menyatakan bahwa
sistem sudah terhubung ke API Kemendikdasmen atau seluruh buku tersedia
secara digital. Implementasi produksi harus memverifikasi sumber resmi,
hak akses, lisensi, dan ketentuan distribusi konten.

### 4.5 Learning Management System

Modul inti untuk mengelola kegiatan pembelajaran digital.

**Fitur:** - Pembuatan kelas virtual. - Materi PDF, video, teks, dan
presentasi. - Modul pembelajaran per mata pelajaran. - Pengelompokan
materi berdasarkan bab atau pertemuan. - Jadwal dan urutan
pembelajaran. - Progress pembelajaran siswa. - Penanda materi selesai. -
Diskusi kelas. - Komentar dan tanya jawab. - Riwayat aktivitas belajar.

**Detail mata pelajaran** harus memuat deskripsi, guru pengampu, daftar
materi, tugas, ujian, pengumuman, dan progress siswa.

### 4.6 AI Learning Assistant

AI Learning Assistant adalah pendamping belajar untuk siswa.

**Fitur:** 1. AI Tutor: menjawab pertanyaan terkait materi pelajaran. 2.
AI Explanation: menjelaskan konsep dengan bahasa sederhana. 3. AI
Summarizer: merangkum materi. 4. AI Quiz Generator: membuat latihan
soal. 5. AI Study Planner: menyusun rencana belajar. 6. AI
Recommendation: merekomendasikan materi berdasarkan progress. 7. AI
Homework Assistant: memberi panduan memahami tahapan penyelesaian soal.
8. AI Book Assistant: menjawab pertanyaan berdasarkan referensi buku
yang dipilih. 9. AI Flashcard Generator: membuat kartu belajar. 10. AI
Voice Learning: konsep interaksi berbasis suara.

**Konteks percakapan:** - Jenjang pendidikan. - Kelas. - Mata
pelajaran. - Topik. - Referensi buku atau materi.

**Persyaratan pengalaman pengguna:** - Antarmuka chat. - Riwayat
percakapan demo. - Prompt suggestion. - Pemilihan konteks materi. -
Indikator proses berpikir atau loading. - Tampilan jawaban yang
terstruktur. - Referensi sumber materi. - Tombol salin dan buat ulang
jawaban.

AI harus diposisikan sebagai pendamping belajar. Jawaban perlu
menyertakan konteks atau sumber apabila menggunakan referensi materi,
serta mendorong pemahaman, bukan hanya memberikan jawaban akhir.

### 4.7 AI Teaching Assistant

Fitur AI untuk membantu guru menyiapkan pembelajaran.

**Fitur:** - Generate modul ajar. - Generate materi pembelajaran. -
Generate soal pilihan ganda. - Generate soal esai. - Generate rubrik
penilaian. - Generate kisi-kisi ujian. - Generate ringkasan materi. -
Generate ide aktivitas pembelajaran. - Analisis hasil evaluasi siswa. -
Rekomendasi tindak lanjut pembelajaran.

**Alur penggunaan:** 1. Guru memilih mata pelajaran. 2. Guru memilih
kelas. 3. Guru menentukan topik atau capaian pembelajaran. 4. Guru
memilih jenis konten yang akan dibuat. 5. Sistem menampilkan hasil draft
simulasi. 6. Guru dapat mengedit hasil. 7. Guru dapat menyimpan hasil
sebagai draft materi atau soal.

### 4.8 Assignment Management

**Fitur:** - Membuat dan mengedit tugas. - Menentukan instruksi dan
deadline. - Mengunggah lampiran demo. - Pengumpulan tugas siswa. -
Status belum dikumpulkan, terkumpul, terlambat, dan dinilai. - Penilaian
tugas. - Feedback guru. - Riwayat pengumpulan. - Rekap nilai tugas.

### 4.9 Examination and Quiz

Sistem ujian digital atau Computer-Based Test (CBT).

**Jenis soal:** - Pilihan ganda. - Pilihan ganda kompleks. - Benar atau
salah. - Isian singkat. - Esai.

**Fitur:** - Bank soal. - Pembuatan ujian. - Pengaturan durasi. -
Randomisasi soal. - Navigasi nomor soal. - Timer. - Autosave jawaban
simulasi. - Konfirmasi pengumpulan. - Penilaian otomatis untuk soal
objektif. - Penilaian manual untuk esai. - Hasil ujian dan pembahasan.

### 4.10 Gradebook and Digital Report

**Fitur:** - Rekap nilai siswa. - Nilai tugas. - Nilai ujian. - Nilai
kuis. - Nilai akhir. - Catatan guru. - Grafik perkembangan nilai. -
Rekap per kelas dan mata pelajaran. - Export laporan simulasi. -
Tampilan rapor digital.

### 4.11 Digital Library

**Fitur:** - Katalog buku. - Kategori koleksi. - Pencarian buku. -
Detail buku. - Preview PDF atau konten contoh. - Bookmark. - Riwayat
baca. - Rekomendasi buku. - Filter mata pelajaran dan jenjang.

### 4.12 Attendance Management

**Fitur:** - Pencatatan absensi siswa. - Status hadir, izin, sakit, dan
alfa. - Rekap kehadiran. - Riwayat absensi. - Statistik kehadiran per
kelas. - Monitoring siswa dengan tingkat kehadiran rendah.

### 4.13 Learning Analytics

Dashboard analitik untuk mengukur efektivitas pembelajaran.

**Indikator:** - Tingkat penyelesaian materi. - Rata-rata nilai siswa. -
Tingkat pengumpulan tugas. - Kehadiran siswa. - Aktivitas
pembelajaran. - Perkembangan akademik. - Perbandingan performa antar
kelas. - Siswa yang membutuhkan pendampingan.

Gunakan grafik interaktif, filter periode, filter kelas, dan filter mata
pelajaran. Semua angka pada prototype harus diberi konteks sebagai data
simulasi.

### 4.14 Notification Center

**Jenis notifikasi:** - Pengumuman sekolah. - Tugas baru. - Pengingat
deadline. - Jadwal ujian. - Pengumuman nilai. - Informasi kegiatan
sekolah. - Notifikasi kepada orang tua.

### 4.15 Settings and Configuration

**Fitur:** - Profil sekolah. - Identitas dan logo sekolah. - Tahun
ajaran aktif. - Pengaturan semester. - Pengaturan role dan permission
demo. - Preferensi notifikasi. - Profil pengguna. - Preferensi tampilan.

------------------------------------------------------------------------

## 5. Page Requirements

Daftar halaman yang perlu tersedia dalam prototype:

    No. Halaman                    Prioritas
  ----- -------------------------- -----------
      1 Landing Page               P0
      2 Login                      P0
      3 Dashboard Admin            P0
      4 Dashboard Guru             P0
      5 Dashboard Siswa            P0
      6 Dashboard Kepala Sekolah   P0
      7 Dashboard Orang Tua        P1
      8 Manajemen Pengguna         P0
      9 Manajemen Kelas            P0
     10 Manajemen Kurikulum        P0
     11 Katalog Buku Nasional      P0
     12 Detail Buku                P0
     13 Digital Book Reader        P0
     14 Kelas Virtual              P0
     15 Detail Mata Pelajaran      P0
     16 Detail Materi              P0
     17 AI Learning Assistant      P0
     18 AI Teaching Assistant      P0
     19 AI Content Generator       P0
     20 Manajemen Tugas            P0
     21 Ujian Online               P0
     22 Bank Soal                  P1
     23 Gradebook                  P0
     24 Rapor Digital              P0
     25 Absensi                    P1
     26 Learning Analytics         P0
     27 Notifikasi                 P1
     28 Pengaturan                 P1

P0 = wajib tersedia dalam demo utama. P1 = fitur pendukung yang tetap
perlu disediakan jika waktu pengembangan memungkinkan.

------------------------------------------------------------------------

## 6. Landing Page Requirements

Landing page berfungsi sebagai halaman pemasaran produk.

**Struktur:** 1. Navbar: logo, fitur, solusi, tentang, dan tombol login.
2. Hero section dengan headline dan visual dashboard LMS. 3. Ringkasan
keunggulan platform. 4. AI-powered learning section. 5. Integrasi
referensi buku kurikulum nasional. 6. Fitur untuk guru dan siswa. 7.
Preview dashboard. 8. Learning analytics showcase. 9. FAQ. 10. Call to
action. 11. Footer.

**Contoh headline:**

"Masa Depan Pendidikan Dimulai dari Pembelajaran yang Lebih Cerdas."

**Deskripsi:**

Platform pembelajaran digital terintegrasi yang menggabungkan manajemen
akademik, referensi kurikulum nasional, dan kecerdasan buatan untuk
menciptakan pengalaman belajar yang lebih efektif, personal, dan
inovatif.

------------------------------------------------------------------------

## 7. Frontend Technology Requirements

  Teknologi         Fungsi
  ----------------- -------------------------
  React.js          Frontend framework
  TypeScript        Type safety
  Vite              Development environment
  Tailwind CSS      Styling
  React Router      Routing
  Zustand           State management
  Recharts          Data visualization
  React Hook Form   Form management
  Zod               Schema validation
  Lucide React      Icon library

### 7.1 Architecture

Gunakan struktur modular berdasarkan domain fitur. Pisahkan: - Layout. -
Pages. - Components. - Features atau modules. - Hooks. - Store. - Mock
data. - Types. - Utilities.

Gunakan reusable components agar desain dan perilaku antarmodul
konsisten.

### 7.2 State and Persistence

-   Gunakan local state atau Zustand untuk interaksi.
-   Gunakan localStorage untuk mempertahankan data demo setelah refresh.
-   Sediakan mekanisme reset demo data.
-   Pastikan data yang ditampilkan antarhalaman konsisten.
-   Hindari menyimpan informasi sensitif.

### 7.3 Responsive Requirements

-   Desktop: sidebar penuh dan dashboard multi-column.
-   Tablet: sidebar dapat diciutkan.
-   Mobile: navigasi menjadi drawer atau bottom navigation yang sesuai.
-   Tabel harus memiliki perilaku responsif.
-   Form dan modal harus tetap nyaman digunakan di layar kecil.

------------------------------------------------------------------------

## 8. Demo Data Requirements

Gunakan sekolah fiktif dan data simulasi yang konsisten.

### 8.1 Sample Dashboard Metrics

  Indikator               Data Demo
  --------------------- -----------
  Total Siswa                 1.248
  Total Guru                     86
  Total Kelas                    36
  Mata Pelajaran                 18
  Materi Pembelajaran           245
  Buku Digital                  320
  Tugas Aktif                    48
  Rata-rata Kehadiran         94,5%

Angka di atas hanya data contoh untuk visualisasi dan tidak boleh
ditampilkan sebagai statistik penggunaan nyata.

### 8.2 Demo Accounts

  Role             Email              Password
  ---------------- ------------------ ----------
  Admin            admin@demo.id      demo123
  Guru             guru@demo.id       demo123
  Siswa            siswa@demo.id      demo123
  Kepala Sekolah   kepala@demo.id     demo123
  Orang Tua        orangtua@demo.id   demo123

Akun digunakan untuk simulasi pergantian role, bukan autentikasi
produksi.

### 8.3 Data Consistency

-   Siswa harus terhubung dengan kelas.
-   Kelas harus memiliki mata pelajaran.
-   Mata pelajaran harus memiliki guru pengampu.
-   Materi harus terhubung dengan mata pelajaran.
-   Tugas dan ujian harus terhubung dengan kelas atau mata pelajaran.
-   Nilai harus merujuk pada siswa dan aktivitas evaluasi.
-   Orang tua harus terhubung dengan profil siswa.
-   Buku harus memiliki jenjang, kelas, mata pelajaran, dan sumber.

------------------------------------------------------------------------

## 9. Prototype Interaction Requirements

Prototype tidak boleh hanya berupa halaman statis.

Seluruh elemen interaktif utama harus dapat dicoba:

-   Login dan pergantian role.
-   Navigasi antarhalaman.
-   Tambah, edit, hapus data melalui simulasi CRUD.
-   Pencarian dan filter.
-   Pagination.
-   Modal dan confirmation dialog.
-   Form validation.
-   AI chatbot dengan percakapan simulasi.
-   AI generator dengan hasil contoh.
-   Katalog buku dengan filter.
-   Digital reader dengan navigasi halaman contoh.
-   Bookmark.
-   Ujian dengan timer dan navigasi soal.
-   Pengumpulan tugas simulasi.
-   Penilaian dan feedback.
-   Grafik analitik interaktif.
-   Notifikasi dan pengaturan status baca.
-   Persistensi data demo menggunakan localStorage.

Setiap tombol harus memiliki aksi yang jelas. Jangan menampilkan tombol
dekoratif yang tidak melakukan apa pun.

------------------------------------------------------------------------

## 10. Non-Functional Requirements

-   Responsif pada desktop, tablet, dan mobile.
-   Navigasi mudah dipahami.
-   Konsistensi desain seluruh modul.
-   Komponen reusable.
-   Loading, empty, dan error states.
-   Validasi form.
-   Struktur kode modular.
-   Performa rendering yang baik.
-   Aksesibilitas dasar.
-   Role-based UI simulation.
-   Tidak memerlukan backend atau database eksternal.
-   Tidak memerlukan API eksternal untuk menjalankan demo.

------------------------------------------------------------------------

## 11. Scope and Limitations

Prototype ini merupakan frontend-only.

  Fitur                  Implementasi Demo
  ---------------------- ------------------------------
  Dashboard              Data simulasi
  Login                  Simulasi role
  CRUD                   Local state dan localStorage
  AI Assistant           Simulasi percakapan
  AI Generator           Simulasi output
  Buku Nasional          Katalog data contoh
  PDF Reader             Konten atau file contoh
  CBT                    Simulasi ujian
  Penilaian              Data simulasi
  Analytics              Dataset dummy
  Database               Tidak tersedia
  API Kemendikdasmen     Belum terhubung
  AI API                 Belum terhubung
  Cloud Storage          Tidak tersedia
  Autentikasi produksi   Tidak tersedia

Integrasi AI dan sumber buku resmi merupakan tahap pengembangan lanjutan
yang memerlukan backend, layanan AI, pengelolaan dokumen, izin akses,
serta verifikasi sumber dan lisensi.

------------------------------------------------------------------------

## 12. Development Roadmap

  Tahap     Pekerjaan
  --------- ----------------------------------------------
  Phase 1   Design system dan struktur aplikasi
  Phase 2   Landing page dan autentikasi demo
  Phase 3   Dashboard seluruh role
  Phase 4   Academic management dan LMS
  Phase 5   Katalog buku dan digital reader
  Phase 6   AI Assistant dan AI Generator
  Phase 7   Ujian, tugas, dan penilaian
  Phase 8   Analytics dan reporting
  Phase 9   Responsiveness, testing, dan final polishing

------------------------------------------------------------------------

## 13. Acceptance Criteria

Prototype dinyatakan memenuhi kebutuhan apabila:

1.  Seluruh halaman prioritas P0 tersedia.
2.  Lima role demo memiliki dashboard dan navigasi sesuai peran.
3.  Navigasi sidebar dan navbar berjalan.
4.  Seluruh tombol dan elemen interaktif utama berfungsi.
5.  Data simulasi konsisten antarhalaman.
6.  Admin dapat mencoba mengelola pengguna dan kelas.
7.  Guru dapat mencoba membuat materi, tugas, dan soal.
8.  Siswa dapat mengakses materi, buku, AI demo, dan ujian.
9.  Kepala sekolah dapat melihat analitik.
10. Orang tua dapat melihat perkembangan anak.
11. Katalog buku memiliki filter dan detail.
12. Digital reader dapat menampilkan konten contoh.
13. AI Assistant menampilkan percakapan simulasi.
14. AI Generator menghasilkan output contoh yang dapat diedit.
15. Data demo dapat bertahan setelah refresh.
16. Tampilan responsif pada berbagai ukuran layar.
17. Tidak ada halaman kosong, tautan rusak, atau tombol tanpa fungsi.
18. Batasan frontend-only dan data simulasi dijelaskan secara
    transparan.

------------------------------------------------------------------------

## 14. Prioritas Demonstrasi Produk

Untuk presentasi kepada calon klien, prioritaskan empat alur utama:

### Alur 1 -- Admin Sekolah

Login sebagai admin → melihat dashboard → menambahkan guru dan siswa →
mengelola kelas → melihat katalog kurikulum.

### Alur 2 -- Guru

Login sebagai guru → membuka kelas → memilih mata pelajaran →
menggunakan AI Teaching Assistant → membuat materi dan soal → memberikan
tugas.

### Alur 3 -- Siswa

Login sebagai siswa → membuka kelas → membaca materi dan buku digital →
bertanya kepada AI Tutor → mengerjakan kuis → melihat hasil belajar.

### Alur 4 -- Kepala Sekolah

Login sebagai kepala sekolah → membuka executive dashboard → memantau
kehadiran → melihat performa akademik → menganalisis perkembangan kelas.

Empat alur tersebut harus terasa saling terhubung dan menjadi fokus
utama saat demonstrasi.

------------------------------------------------------------------------

## 15. Master Development Instruction

Bangun AI Learning Management System sebagai prototype frontend yang
lengkap, modern, profesional, dan layak dipresentasikan sebagai produk
SaaS pendidikan komersial.

Jangan hanya membuat dashboard statis atau kumpulan halaman visual.
Implementasikan seluruh navigasi, form, modal, filter, pencarian,
simulasi CRUD, interaksi AI, digital reader, ujian, dan analitik.

Gunakan React.js, TypeScript, Vite, Tailwind CSS, React Router, Zustand,
Recharts, React Hook Form, Zod, dan Lucide React.

Terapkan design system dengan warna utama navy `#142B50`, background
putih `#FFFFFF`, light background `#F5F7FB`, dan font Plus Jakarta Sans.

Bangun lima role pengguna dengan pengalaman yang berbeda: Admin, Guru,
Siswa, Kepala Sekolah, dan Orang Tua.

Pastikan seluruh data dummy konsisten antarfitur. Gunakan localStorage
untuk mempertahankan perubahan data demo. Sediakan akun demo dan
mekanisme reset data.

AI Assistant dan AI Generator harus memiliki UI yang meyakinkan dan
dapat dicoba dengan respons simulasi. Katalog buku harus mengacu pada
struktur referensi kurikulum nasional, tetapi jangan mengklaim integrasi
resmi Kemendikdasmen telah aktif.

Prioritaskan kualitas UI/UX, kelengkapan fitur, konsistensi desain, dan
pengalaman demonstrasi end-to-end.

**Hasil akhir harus terasa seperti produk LMS profesional yang siap
dipresentasikan kepada sekolah, yayasan, dan institusi pendidikan.**
