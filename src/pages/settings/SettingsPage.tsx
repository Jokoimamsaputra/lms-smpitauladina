import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Building,
  RotateCcw,
  CheckCircle2,
  Save,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { schoolProfile, updateSchoolProfile, resetToDefaultData } = useStore();

  const [schoolName, setSchoolName] = useState(schoolProfile.name);
  const [npsn, setNpsn] = useState(schoolProfile.npsn);
  const [address, setAddress] = useState(schoolProfile.address);
  const [accreditation, setAccreditation] = useState(schoolProfile.accreditation);
  const [principalName, setPrincipalName] = useState(schoolProfile.principalName);
  const [academicYear, setAcademicYear] = useState(schoolProfile.activeAcademicYear);
  const [semester, setSemester] = useState(schoolProfile.activeSemester);

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolProfile({
      name: schoolName,
      npsn,
      address,
      accreditation,
      principalName,
      activeAcademicYear: academicYear,
      activeSemester: semester as any,
    });
    triggerToast('Konfigurasi profil sekolah berhasil diperbarui.');
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setResetModalOpen(false);
    triggerToast('Seluruh data simulasi telah berhasil di-reset ke kondisi awal.');
    navigate('/admin/dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B50] text-white px-4 py-3 rounded-xl shadow-modal flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'Konfigurasi', href: '/settings' },
          { label: 'Pengaturan Sistem & Profil Sekolah' },
        ]}
      />

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Pengaturan Sistem & Profil Institusi
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kelola parameter sekolah, semester aktif, dan preferensi lingkungan demonstrasi.
        </p>
      </div>

      {/* School Profile Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Building className="w-4 h-4 text-[#142B50]" />
          <span>Identitas Sekolah & Satuan Pendidikan</span>
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Resmi Sekolah
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Pokok Sekolah Nasional (NPSN)
              </label>
              <input
                type="text"
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Sekolah
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Peringkat Akreditasi
              </label>
              <input
                type="text"
                value={accreditation}
                onChange={(e) => setAccreditation(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Kepala Sekolah
              </label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester Berjalan
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white font-medium"
              >
                <option value="Ganjil">Semester Ganjil</option>
                <option value="Genap">Semester Genap</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
              Simpan Profil Sekolah
            </Button>
          </div>
        </form>
      </div>

      {/* Danger Zone: Reset Demo Data */}
      <div className="bg-red-50/40 rounded-xl border border-red-200 p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-sm font-bold text-red-900">
              Reset Data Simulasi Demo ke Kondisi Bawaan
            </h2>
            <p className="text-xs text-red-700 mt-1 leading-relaxed">
              Jika Anda ingin mengulang presentasi demonstrasi dari awal, gunakan tombol di bawah untuk menghapus seluruh perubahan lokal (tugas baru, soal baru, riwayat obrolan AI) dan mengembalikan data ke dataset standar PRD.
            </p>

            <div className="mt-4">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setResetModalOpen(true)}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset Seluruh Data Demo Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Konfirmasi Reset Data Demo"
        description="Tindakan ini akan mengosongkan perubahan lokal pada browser Anda."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReset}
            >
              Ya, Bersihkan & Reset Data
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          Seluruh data di localStorage browser akan dipulihkan ke data standar SMA Techsoe. Anda akan diarahkan kembali ke Dashboard Administrator.
        </p>
      </Modal>
    </div>
  );
};
