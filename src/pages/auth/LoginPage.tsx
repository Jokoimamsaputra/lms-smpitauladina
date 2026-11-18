import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { Button } from '../../components/common/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@demo.id');
  const [password, setPassword] = useState('demo123');
  const [errorMsg, setErrorMsg] = useState('');

  const roleCredentials: Record<UserRole, { email: string; label: string; desc: string; target: string }> = {
    admin: {
      email: 'admin@demo.id',
      label: 'Admin Sekolah',
      desc: 'Bambang Setiawan, S.Pd. (Manajemen Sistem & Pengguna)',
      target: '/admin/dashboard',
    },
    guru: {
      email: 'guru@demo.id',
      label: 'Guru Pengampu',
      desc: 'Siti Rahmawati, M.Pd. (Informatika & Matematika)',
      target: '/teacher/dashboard',
    },
    siswa: {
      email: 'siswa@demo.id',
      label: 'Siswa',
      desc: 'Ahmad Rizky Pratama (Kelas XI MIPA 1)',
      target: '/student/dashboard',
    },
    kepala: {
      email: 'kepala@demo.id',
      label: 'Kepala Sekolah',
      desc: 'Dr. H. Hendro Utomo, M.Ed. (Executive Monitoring)',
      target: '/principal/dashboard',
    },
    orangtua: {
      email: 'orangtua@demo.id',
      label: 'Orang Tua / Wali',
      desc: 'Ir. Gunawan Pratama (Orang tua Ahmad Rizky)',
      target: '/parent/dashboard',
    },
  };

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleCredentials[role].email);
    setPassword('demo123');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi email dan kata sandi.');
      return;
    }

    // Match credentials with available roles
    const matchedRole = (Object.keys(roleCredentials) as UserRole[]).find(
      (r) => roleCredentials[r].email.toLowerCase() === email.toLowerCase()
    );

    if (matchedRole) {
      switchRole(matchedRole);
      navigate(roleCredentials[matchedRole].target);
    } else {
      // Default to selected role for demo flexibility
      switchRole(selectedRole);
      navigate(roleCredentials[selectedRole].target);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col justify-center py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8">
      {/* Back to landing */}
      <div className="max-w-4xl w-full mx-auto mb-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#142B50] font-medium transition-colors cursor-pointer min-h-[36px] py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Depan</span>
        </button>
      </div>

      {/* Wide Landscape Login Card (Dibuat lebar dan responsif mobile-friendly) */}
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl shadow-[#142B50]/10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          {/* Left Panel: Branding & 1-Click Role Switcher */}
          <div className="bg-[#142B50] p-5 sm:p-8 text-white flex flex-col justify-between md:col-span-5">
            <div>
              <img
                src="/logo-white.png"
                alt="TechSoe LMS"
                className="h-10 sm:h-11 w-auto object-contain mb-2"
              />
              <p className="text-xs text-blue-200">
                Portal Pembelajaran Digital SMA Techsoe
              </p>

              <div className="mt-5 sm:mt-6">
                <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-2">
                  Pilih Role Demo (1-Click Switch):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-1.5">
                  {(Object.keys(roleCredentials) as UserRole[]).map((r) => {
                    const isSelected = selectedRole === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleSelectRole(r)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between min-h-[44px] md:min-h-0 ${
                          isSelected
                            ? 'bg-white text-[#142B50] font-bold shadow-sm ring-2 ring-white/30'
                            : 'bg-white/10 hover:bg-white/20 text-blue-100 font-medium'
                        }`}
                      >
                        <span className="truncate pr-1">{roleCredentials[r].label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#142B50] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 sm:pt-4 border-t border-white/10 text-[10px] sm:text-[11px] text-blue-200/80">
              NPSN: 20104592 • Akreditasi A Unggul (Jakarta Selatan)
            </div>
          </div>

          {/* Right Panel: Credentials Form & Active Profile Preview */}
          <div className="p-5 sm:p-8 flex flex-col justify-between md:col-span-7 bg-white">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 sm:mb-5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    Masuk ke Portal Akademik
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    Akses terpadu seluruh civitas sekolah SMA Techsoe
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] bg-[#EAF0F8] text-[#142B50] px-2.5 sm:px-3 py-1 rounded-full font-bold shrink-0">
                  {roleCredentials[selectedRole].label}
                </span>
              </div>

              {/* Active Profile Info Box */}
              <div className="mb-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-slate-700">
                <span className="text-[10px] uppercase font-bold text-blue-700 block mb-0.5">
                  Profil Demo Aktif:
                </span>
                <p className="font-semibold text-[#142B50] leading-snug">{roleCredentials[selectedRole].desc}</p>
              </div>

              {/* Form Inputs (text-base on mobile to prevent iOS auto-zoom) */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Alamat Email Demo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 text-base sm:text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142B50] focus:border-[#142B50] bg-white min-h-[44px] sm:min-h-0"
                      placeholder="nama@demo.id"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Kata Sandi Demo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 text-base sm:text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142B50] focus:border-[#142B50] bg-white min-h-[44px] sm:min-h-0"
                      placeholder="demo123"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full mt-3 py-3 min-h-[44px] rounded-xl font-bold flex items-center justify-center text-xs sm:text-sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Masuk sebagai {roleCredentials[selectedRole].label}
                </Button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[10px] sm:text-[11px] text-slate-400">
              Password bawaan seluruh akun demo: <span className="font-mono font-bold text-slate-600">demo123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
