import React, { useState } from 'react';
import {
  BookMarked,
  CheckCircle2,
  FileText,
  Search,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const CurriculumPage: React.FC = () => {
  const { subjects, schoolProfile } = useStore();
  const [selectedCurriculum, setSelectedCurriculum] = useState('Kurikulum Merdeka');

  const capaianPembelajaran = [
    {
      subject: 'Informatika (Fase F - Kelas XI)',
      element: 'Berpikir Komputasional & Algoritma',
      desc: 'Peserta didik mampu menganalisis persoalan komputasi kompleks, merancang algoritma rekursif optimal, dan mengimplementasikannya dalam bahasa pemrograman prosedural/berorientasi objek.',
      hours: '3 Jam Pelajaran/Minggu',
    },
    {
      subject: 'Matematika Tingkat Lanjut (Fase F - Kelas XI)',
      element: 'Aljabar & Polinomial',
      desc: 'Peserta didik mampu melakukan operasi suku banyak (polinomial), menerapkan teorema sisa dan teorema faktor, serta menyelesaikan masalah kontekstual pemodelan matematika.',
      hours: '4 Jam Pelajaran/Minggu',
    },
    {
      subject: 'Fisika (Fase F - Kelas XI)',
      element: 'Mekanika & Termodinamika',
      desc: 'Peserta didik memahami gerak dua dimensi, dinamika rotasi, kesetimbangan benda tegar, prinsip kontinuitas fluida ideal, dan hukum termodinamika.',
      hours: '4 Jam Pelajaran/Minggu',
    },
    {
      subject: 'Bahasa Indonesia (Fase F - Kelas XI)',
      element: 'Menulis & Membaca Kritis',
      desc: 'Peserta didik mampu menulis esai argumentasi berbasis riset data yang akurat dan mempresentasikan gagasan ilmiah dengan tata bahasa formal.',
      hours: '3 Jam Pelajaran/Minggu',
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Kurikulum & Capaian Pembelajaran' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Kurikulum & Capaian Pembelajaran (CP)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Penetapan silabus standar nasional Kemendikdasmen RI untuk SMA Techsoe.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            Kurikulum Aktif: {selectedCurriculum}
          </Badge>
        </div>
      </div>

      {/* Curriculum Overview Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#142B50]" />
            <span>Fase Pembelajaran Sekolah Menengah Atas</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Kurikulum Merdeka: Fase E (Kelas 10) & Fase F (Kelas 11 : 12)
          </h2>
          <p className="text-xs text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Struktur kurikulum dirancang adaptif dengan pembelajaran berbasis proyek (P5) dan peminatan mata pelajaran tingkat lanjut untuk persiapan pendidikan tinggi.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tahun Penerapan</span>
            <span className="text-sm font-bold text-[#142B50]">2026/2027</span>
          </div>
        </div>
      </div>

      {/* Capaian Pembelajaran per Mapel */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-1">
          Capaian Pembelajaran (CP) Fase F
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Rumusan kompetensi yang wajib dicapai peserta didik pada mata pelajaran pokok semester ini
        </p>

        <div className="space-y-4">
          {capaianPembelajaran.map((cp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <span className="font-bold text-xs text-[#142B50] block">
                    {cp.subject}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Elemen: {cp.element}
                  </span>
                </div>
                <Badge variant="primary" size="sm">
                  {cp.hours}
                </Badge>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60 mt-2">
                {cp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
