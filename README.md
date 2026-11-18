# LMS Techsoe - Portal Pembelajaran Resmi SMA Techsoe

Platform manajemen pembelajaran digital terpadu berbasis kecerdasan buatan (AI) yang dirancang untuk sekolah, yayasan, dan institusi pendidikan. Platform ini menyatukan administrasi akademik, katalog buku teks resmi Kemendikdasmen RI, ujian online berbasis komputer (CBT), evaluasi rapor digital, analitik efektivitas belajar, dan asisten AI pedagogis beretika.

---

## 🚀 Fitur Utama & Kesiapan Demonstrasi (P0)

### 1. Multi-Role User Experience (5 Role Lengkap)
- **Admin Sekolah**: Overview statistik, manajemen pengguna (Guru, Siswa, Orang Tua), rombel kelas, kurikulum, dan pengaturan sistem.
- **Guru**: Jadwal mengajar harian, kelas virtual, AI Teaching Copilot, koreksi & penilaian tugas siswa, serta buku nilai.
- **Siswa**: Dashboard belajar terstruktur, materi digital, Digital Book Reader, AI Learning Tutor, dan Ujian CBT interaktif.
- **Kepala Sekolah**: Executive dashboard, monitoring rasio kehadiran sekolah, mutu akademik, dan komparasi capaian rombel.
- **Orang Tua**: Pemantauan presensi anak, nilai rapor terbaru, jadwal pelajaran, dan komunikasi wali kelas.

### 2. Katalog Referensi Buku Kurikulum Nasional
- Rujukan resmi buku teks utama Kemendikdasmen (Kurikulum Merdeka & Kurikulum 2013).
- Filter jenjang lengkap (SD, SMP, SMA, SMK), kelas, dan mata pelajaran.
- **Digital Book Reader**: Pembaca buku digital dengan navigasi bab (TOC), pembatas halaman (bookmark), dan zoom kontrol.

### 3. AI Terintegrasi (Pedagogical Copilot & Tutor)
- **AI Teaching Assistant (Untuk Guru)**: Otomasi draf modul ajar (RPP Plus), kisi-kisi, paket soal pilihan ganda, soal esai penalaran, dan rubrik penilaian analitik. Hasil dapat diedit langsung dan disimpan.
- **AI Learning Assistant (Untuk Siswa)**: Chatbot tutor interaktif yang menjelaskan konsep dengan analogi bahasa santai, pembuatan flashcard kilat, dan rujukan nomor halaman buku teks resmi.

### 4. Computer-Based Testing (CBT) & Asesmen Digital
- Simulasi ujian berbasis komputer dengan hitung mundur timer riil.
- Autosave jawaban otomatis, tombol ragu-ragu, dan grid nomor soal dinamis (terjawab, ragu, belum dijawab).
- Evaluasi nilai objektif instan dan pembahasan pedagogis butir per butir soal.

### 5. Gradebook, Rapor Digital, & Learning Analytics
- Matriks buku nilai komprehensif per rombongan belajar.
- Format cetak Rapor Hasil Belajar Siswa resmi Kemendikdasmen (`@media print` siap cetak/ekspor PDF).
- Grafik interaktif Recharts untuk ketuntasan materi, ketepatan waktu pengumpulan, dan sistem peringatan dini (Early Warning System) bagi siswa yang membutuhkan remediasi.

---

## 🔑 Akun Demo (1-Click Switcher)

Sistem dilengkapi dengan **Quick Role Switcher** di bagian topbar untuk beralih role secara instan:

| Role | Akun Demo | Kata Sandi | Deskripsi |
|---|---|---|---|
| Admin Sekolah | `admin@demo.id` | `demo123` | Bambang Setiawan, S.Pd. |
| Guru Pengampu | `guru@demo.id` | `demo123` | Siti Rahmawati, M.Pd. |
| Siswa | `siswa@demo.id` | `demo123` | Ahmad Rizky Pratama (XI MIPA 1) |
| Kepala Sekolah | `kepala@demo.id` | `demo123` | Dr. H. Hendro Utomo, M.Ed. |
| Orang Tua | `orangtua@demo.id` | `demo123` | Ir. Gunawan Pratama |

---

## 🎯 4 Alur Demonstrasi Klien (PRD Section 14)

1. **Alur 1 (Admin Sekolah)**:
   Login Admin → Melihat dashboard KPI → Menambah akun guru/siswa di Manajemen Pengguna → Mengatur kelas di Manajemen Rombel → Membuka katalog kurikulum.
2. **Alur 2 (Guru)**:
   Login Guru → Buka Kelas Virtual Informatika → Buka AI Teaching Assistant untuk generate modul ajar & soal → Simpan ke draf mengajar → Beri nilai dan feedback edukatif pada tugas siswa.
3. **Alur 3 (Siswa)**:
   Login Siswa → Membuka materi & buku digital di Digital Book Reader → Bertanya konsep algoritma ke AI Learning Assistant → Mengerjakan ujian CBT Informatika dengan timer → Melihat hasil skor & pembahasan.
4. **Alur 4 (Kepala Sekolah)**:
   Login Kepala Sekolah → Membuka Executive Dashboard → Memantau persentase kehadiran 94.5% → Meninjau grafik komparasi nilai antar rombel → Memeriksa daftar siswa pada sistem peringatan dini.

---

## 🛠️ Menjalankan Aplikasi Secara Lokal

```bash
# 1. Jalankan development server
npm run dev

# 2. Buka di browser
http://localhost:5173

# 3. Build untuk produksi
npm run build
```
