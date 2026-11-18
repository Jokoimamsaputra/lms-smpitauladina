import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Printer,
  Download,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const DigitalReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { schoolProfile, grades } = useStore();

  const studentGrades = grades.filter((g) => g.studentId === 'user-siswa-1');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Breadcrumb
          items={[
            { label: 'Penilaian', href: '/gradebook' },
            { label: 'Rapor Digital Siswa' },
          ]}
        />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/student/dashboard')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Cetak / Ekspor PDF Rapor
          </Button>
        </div>
      </div>

      {/* Official Printable Report Card Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        {/* School Letterhead (Kop Sekolah) */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
          <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase">
            Pemerintah Provinsi Daerah Khusus Jakarta • Dinas Pendidikan
          </h2>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 uppercase">
            {schoolProfile.name}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            {schoolProfile.address} • NPSN: {schoolProfile.npsn} • Akreditasi: {schoolProfile.accreditation}
          </p>
        </div>

        {/* Report Title */}
        <div className="text-center mb-6">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider underline">
            Laporan Hasil Belajar Peserta Didik (Rapor)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Kurikulum Merdeka • Tahun Ajaran {schoolProfile.activeAcademicYear} ({schoolProfile.activeSemester})
          </p>
        </div>

        {/* Student Metadata Table */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-transparent">
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-32 text-slate-500">Nama Siswa</span>
              <span className="font-bold text-slate-900">: Ahmad Rizky Pratama</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500">Nomor Induk / NISN</span>
              <span className="font-mono text-slate-900">: 0081234567</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500">Fase / Kelas</span>
              <span className="font-semibold text-slate-900">: Fase F / XI MIPA 1</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-32 text-slate-500">Nama Sekolah</span>
              <span className="font-semibold text-slate-900">: {schoolProfile.name}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500">Semester</span>
              <span className="font-semibold text-slate-900">: {schoolProfile.activeSemester}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500">Wali Kelas</span>
              <span className="font-semibold text-slate-900">: Siti Rahmawati, M.Pd.</span>
            </div>
          </div>
        </div>

        {/* Subjects & Competency Report Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border border-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                <th className="py-2.5 px-3 border-r border-slate-300 text-center w-10">No</th>
                <th className="py-2.5 px-4 border-r border-slate-300">Mata Pelajaran</th>
                <th className="py-2.5 px-3 border-r border-slate-300 text-center w-20">Nilai Akhir</th>
                <th className="py-2.5 px-3 border-r border-slate-300 text-center w-20">Predikat</th>
                <th className="py-2.5 px-4">Capaian Kompetensi & Catatan Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {studentGrades.map((g, idx) => (
                <tr key={g.id}>
                  <td className="py-3 px-3 border-r border-slate-300 text-center font-medium">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 border-r border-slate-300 font-semibold text-slate-900">
                    {g.subjectName}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-300 text-center font-mono font-bold text-slate-900">
                    {g.finalScore}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-300 text-center font-bold text-slate-900">
                    {g.letterGrade}
                  </td>
                  <td className="py-3 px-4 text-slate-700 leading-relaxed text-[11px]">
                    {g.teacherNotes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance & Extracurricular Recap */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-8">
          {/* Presensi */}
          <div className="border border-slate-300 rounded-lg p-3">
            <span className="font-bold text-slate-900 block mb-2 border-b pb-1">
              Ketidakhadiran (Presensi Semester)
            </span>
            <div className="space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Sakit</span>
                <span className="font-semibold">0 Hari</span>
              </div>
              <div className="flex justify-between">
                <span>Izin</span>
                <span className="font-semibold">0 Hari</span>
              </div>
              <div className="flex justify-between">
                <span>Tanpa Keterangan (Alfa)</span>
                <span className="font-semibold text-emerald-600">0 Hari</span>
              </div>
            </div>
          </div>

          {/* Ekstrakurikuler */}
          <div className="border border-slate-300 rounded-lg p-3">
            <span className="font-bold text-slate-900 block mb-2 border-b pb-1">
              Kegiatan Ekstrakurikuler
            </span>
            <div className="space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span className="font-medium">1. Robotika & Pemrograman</span>
                <span className="font-bold text-emerald-700">Sangat Baik (A)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">2. English Debating Club</span>
                <span className="font-bold text-emerald-700">Baik (B)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan Wali Kelas */}
        <div className="border border-slate-300 rounded-lg p-4 text-xs mb-10">
          <span className="font-bold text-slate-900 block mb-1">
            Catatan Wali Kelas:
          </span>
          <p className="text-slate-700 italic leading-relaxed">
            "Ahmad menunjukkan kemandirian belajar yang mengesankan, memiliki kemampuan logika pemecahan masalah algoritma di atas rata-rata rombel, dan selalu aktif dalam diskusi kelas. Pertahankan konsistensi prestasimu!"
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-6 text-xs text-center text-slate-800 pt-4">
          <div>
            <p>Mengetahui,</p>
            <p>Orang Tua / Wali Siswa</p>
            <div className="h-16" />
            <p className="font-bold underline">Ir. Gunawan Pratama</p>
          </div>

          <div>
            <p>Jakarta, 20 November 2026</p>
            <p>Wali Kelas XI MIPA 1</p>
            <div className="h-16" />
            <p className="font-bold underline">Siti Rahmawati, M.Pd.</p>
            <p className="text-[10px] text-slate-500">NIP 198711032010012015</p>
          </div>

          <div>
            <p>Mengetahui,</p>
            <p>Kepala Sekolah</p>
            <div className="h-16" />
            <p className="font-bold underline">{schoolProfile.principalName}</p>
            <p className="text-[10px] text-slate-500">NIP 197103121998021001</p>
          </div>
        </div>
      </div>
    </div>
  );
};
