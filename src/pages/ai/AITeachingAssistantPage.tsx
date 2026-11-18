import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  HelpCircle,
  CheckCircle2,
  Save,
  Copy,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Edit3,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const AITeachingAssistantPage: React.FC = () => {
  const { subjects, addAIGeneratedItem, aiGeneratedItems } = useStore();

  const [selectedSubject, setSelectedSubject] = useState('Informatika');
  const [selectedGrade, setSelectedGrade] = useState('Kelas XI');
  const [topic, setTopic] = useState('Algoritma Pengurutan (Sorting) & Kompleksitas Big-O');
  const [contentType, setContentType] = useState<'modul_ajar' | 'soal_pg' | 'soal_esai' | 'rubrik' | 'kisi_kisi'>('modul_ajar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const sampleTemplates = {
    modul_ajar: `# MODUL AJAR: ALGORITMA PENGURUTAN (SORTING)
Mata Pelajaran: Informatika
Fase / Kelas: Fase F / Kelas XI
Alokasi Waktu: 2 x 45 Menit (Pertemuan ke-2)

## 1. Capaian Pembelajaran (CP)
Peserta didik mampu memahami konsep logika pengurutan data, mengidentifikasi perbedaan algoritma Bubble Sort dan Merge Sort, serta mengukur efisiensi komputasi menggunakan notasi Big-O.

## 2. Profil Pelajar Pancasila
- Bernalar Kritis: Menganalisis kelebihan dan kelemahan masing-masing algoritma sorting.
- Mandiri: Menyelesaikan implementasi penulisan kode program secara mandiri.
- Gotong Royong: Berdiskusi dalam kelompok menganalisis kasus nyata data acak.

## 3. Langkah-langkah Pembelajaran
- Kegiatan Awal (10 Menit): Guru memberikan apersepsi kartu angka acak yang perlu diurutkan tercepat.
- Kegiatan Inti (70 Menit):
  1. Penjelasan teori dasar Bubble Sort dan Merge Sort.
  2. Simulasi gerak pertukaran elemen langkah demi langkah.
  3. Praktik pemrograman perbandingan waktu komputasi Python.
- Kegiatan Penutup (10 Menit): Refleksi bersama dan penugasan kuis mandiri di LMS.

## 4. Asesmen Formatif
Observasi keaktifan diskusi dan pengumpulan kode program sorting pada modul penugasan.`,

    soal_pg: `PAKET SOAL PILIHAN GANDA (CBT)
Mata Pelajaran: Informatika (Kelas XI)
Topik: Algoritma Pencarian & Sorting

Soal 1:
Pada algoritma Merge Sort, strategi utama yang digunakan untuk menyelesaikan masalah pengurutan adalah:
A. Brute Force
B. Divide and Conquer
C. Greedy Algorithm
D. Backtracking
Kunci: B
Pembahasan: Merge Sort membagi himpunan data menjadi dua bagian rekursif hingga berukuran satuan, lalu menggabungkannya kembali secara terurut.

Soal 2:
Kompleksitas waktu terbaik (best-case) dari algoritma Binary Search saat elemen target berada tepat di posisi indeks tengah pertama adalah:
A. O(n)
B. O(log n)
C. O(1)
D. O(n^2)
Kunci: C
Pembahasan: Jika elemen tengah langsung cocok pada iterasi pertama, pencarian selesai dalam 1 langkah konstan O(1).`,

    soal_esai: `PAKET SOAL ESAI PENALARAN KRITIS
Mata Pelajaran: Informatika (Kelas XI)

1. Jelaskan mengapa algoritma Binary Search tidak dapat langsung diimplementasikan pada daftar nama yang belum terurut! Berikan contoh dampak yang terjadi jika dipaksakan.
Bobot Skor: 50 Poin

2. Bandingkan efisiensi algoritma Bubble Sort dan Merge Sort apabila harus mengurutkan 100.000 data transaksi e-commerce. Berikan alasan pemilihan algoritma yang tepat berdasarkan kompleksitas Big-O!
Bobot Skor: 50 Poin`,

    rubrik: `RUBRIK PENILAIAN ANALITIK TUGAS PRAKTIK PEMROGRAMAN

Kriteria 1: Kebenaran Algoritma (Bobot 40%)
- Skor 4 (Sangat Baik): Algoritma berjalan tanpa error dan output terurut 100% tepat.
- Skor 3 (Baik): Algoritma berjalan namun ada penanganan boundary condition yang terlewat.
- Skor 2 (Cukup): Terdapat error sintaks atau logika perulangan tak berhingga.

Kriteria 2: Kerapian Kode & Dokumentasi (Bobot 30%)
- Skor 4: Penamaan variabel representatif, ada komentar penjelas di setiap fungsi.
- Skor 3: Kode terstruktur namun komentar penjelas minim.

Kriteria 3: Analisis Efisiensi Waktu (Bobot 30%)
- Skor 4: Mampu menjelaskan notasi Big-O dari kode yang dituliskan secara tepat.`,

    kisi_kisi: `KISI-KISI PENYUSUNAN SOAL UJIAN SUMATIF
Mata Pelajaran: Informatika
Jenjang: SMA Kelas XI - Semester Ganjil

1. Kompetensi: Menganalisis algoritma pencarian.
   - Indikator: Disajikan narasi kumpulan data, siswa menentukan langkah efisien Binary Search.
   - Bentuk Soal: Pilihan Ganda (Level Kognitif C4 - Analisis).

2. Kompetensi: Membandingkan strategi algoritma pengurutan.
   - Indikator: Siswa menghitung perbandingan maksimum pergeseran nilai pada data terbalik.
   - Bentuk Soal: Esai (Level Kognitif C5 - Evaluasi).`,
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedDraft(sampleTemplates[contentType]);
      setIsGenerating(false);
      triggerToast('AI Copilot berhasil menyusun rancangan dokumen.');
    }, 800);
  };

  const handleSaveToDrafts = () => {
    if (!generatedDraft) return;

    addAIGeneratedItem({
      type: contentType,
      title: `${contentType.replace('_', ' ').toUpperCase()}: ${topic}`,
      subject: selectedSubject,
      grade: selectedGrade,
      topic,
      content: generatedDraft,
    });

    triggerToast('Dokumen berhasil disimpan ke Draf Mengajar Guru.');
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B50] text-white px-4 py-3 rounded-xl shadow-modal flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'AI Center', href: '/ai/teaching' },
          { label: 'AI Teaching Assistant & Content Generator' },
        ]}
      />

      {/* Header */}
      <div className="bg-[#142B50] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-2xl">
          <Badge variant="primary" size="sm" className="bg-white/15 text-blue-100 border-white/20 mb-3">
            AI Teaching Copilot untuk Tenaga Pendidik
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Perancangan Modul & Soal Pembelajaran Otomatis
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 leading-relaxed">
            Membantu guru menyusun modul ajar, kisi-kisi, paket soal objektif/esai, dan rubrik penilaian terstandar Kurikulum Merdeka secara instan.
          </p>
        </div>
      </div>

      {/* Generator Configuration Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#142B50]" />
          <span>Parameter Penyusunan Dokumen</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mata Pelajaran
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
            >
              <option value="Informatika">Informatika</option>
              <option value="Matematika Tingkat Lanjut">Matematika Tingkat Lanjut</option>
              <option value="Fisika">Fisika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jenjang / Kelas
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
            >
              <option value="Kelas X">Kelas X (Fase E)</option>
              <option value="Kelas XI">Kelas XI (Fase F)</option>
              <option value="Kelas XII">Kelas XII (Fase F)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jenis Dokumen yang Disusun
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white font-semibold text-[#142B50]"
            >
              <option value="modul_ajar">Modul Ajar (RPP Plus)</option>
              <option value="soal_pg">Paket Soal Pilihan Ganda + Kunci</option>
              <option value="soal_esai">Paket Soal Esai Penalaran</option>
              <option value="rubrik">Rubrik Penilaian Analitik</option>
              <option value="kisi_kisi">Kisi-kisi Asesmen Sumatif</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Topik Pembelajaran atau Capaian Spesifik
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            placeholder="Tuliskan topik pembelajaran..."
          />
        </div>

        <div className="mt-5 flex items-center justify-end">
          <Button
            variant="primary"
            size="md"
            isLoading={isGenerating}
            onClick={handleGenerate}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            {isGenerating ? 'Menyusun Dokumen...' : 'Generate Draf Dokumen dengan AI'}
          </Button>
        </div>
      </div>

      {/* Generated Result Editor */}
      {(generatedDraft || isGenerating) && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#142B50]" />
                <span>Hasil Draf AI (Dapat Diedit Langsung)</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Sesuaikan diksi atau detail pembelajaran sebelum disimpan ke draf kelas Anda.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(generatedDraft);
                  triggerToast('Teks draf berhasil disalin ke clipboard.');
                }}
                leftIcon={<Copy className="w-3.5 h-3.5" />}
              >
                Salin Teks
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveToDrafts}
                leftIcon={<Save className="w-3.5 h-3.5" />}
              >
                Simpan ke Draf Mengajar
              </Button>
            </div>
          </div>

          {/* Editable Textarea */}
          <textarea
            rows={16}
            value={generatedDraft}
            onChange={(e) => setGeneratedDraft(e.target.value)}
            className="w-full p-4 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50/50 leading-relaxed"
          />
        </div>
      )}

      {/* Saved Drafts History List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-1">
          Draf Modul & Soal Tersimpan ({aiGeneratedItems.length})
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Dokumen yang telah Anda simpan dari hasil bantuan AI Teaching Copilot
        </p>

        <div className="space-y-3">
          {aiGeneratedItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{item.title}</span>
                  <Badge variant="primary" size="sm">
                    {item.subject} • {item.grade}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 font-mono">
                  {item.content}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Dibuat pada: {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setGeneratedDraft(item.content);
                  triggerToast('Draf dimuat kembali ke editor di atas.');
                }}
              >
                Muat ke Editor
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
