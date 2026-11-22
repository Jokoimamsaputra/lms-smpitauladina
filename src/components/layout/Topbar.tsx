import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  RotateCcw,
  UserCheck,
  ChevronDown,
  Globe,
  LogOut,
  Check,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const {
    currentUser,
    switchRole,
    schoolProfile,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    resetToDefaultData,
  } = useStore();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.isRead);

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setShowRoleMenu(false);
    // Redirect to each role's home dashboard
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'guru') navigate('/teacher/dashboard');
    else if (role === 'siswa') navigate('/student/dashboard');
    else if (role === 'kepala') navigate('/principal/dashboard');
    else if (role === 'orangtua') navigate('/parent/dashboard');
  };

  const roleLabels: Record<UserRole, { label: string; desc: string }> = {
    admin: { label: 'Admin Sekolah', desc: 'Anisa Widayati' },
    guru: { label: 'Guru Pengampu', desc: 'Miryati, S.Kom.' },
    siswa: { label: 'Siswa', desc: 'Muhammad Al Kayyis (IX JavaScript)' },
    kepala: { label: 'Kepala Sekolah', desc: 'Joko Imam Saputra, M.Ag., MCE.' },
    orangtua: { label: 'Orang Tua / Wali', desc: 'Heri Yusmargana, S.Pt' },
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-4 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile trigger & School context */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 lg:hidden cursor-pointer shrink-0"
            aria-label="Buka navigasi menu"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xs font-semibold text-slate-800">
              {schoolProfile.name}
            </h1>
            <p className="text-[10px] text-slate-500">
              T.A. {schoolProfile.activeAcademicYear} ({schoolProfile.activeSemester}) • Demo Prototype
            </p>
          </div>
        </div>

        {/* Right: Role Switcher, Reset, Notif & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#142B50]/20 bg-[#EAF0F8] hover:bg-[#dce7f5] text-[#142B50] text-xs font-medium transition-colors cursor-pointer"
              aria-expanded={showRoleMenu}
              aria-label="Ganti role akun demo"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#142B50]" aria-hidden="true" />
              <span className="hidden md:inline font-semibold">Role:</span>
              <span className="font-semibold">{roleLabels[currentUser.role].label}</span>
              <ChevronDown className="w-3 h-3 text-slate-600" aria-hidden="true" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-elevated border border-[#E2E8F0] py-2 z-50 animate-in fade-in duration-100">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Simulasi 5 Role Pengguna
                </div>
                {(['admin', 'guru', 'siswa', 'kepala', 'orangtua'] as UserRole[]).map(
                  (role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className="w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div>
                        <p
                          className={cn(
                            'font-medium',
                            currentUser.role === role
                              ? 'text-[#142B50] font-semibold'
                              : 'text-slate-700'
                          )}
                        >
                          {roleLabels[role].label}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {roleLabels[role].desc}
                        </p>
                      </div>
                      {currentUser.role === role && (
                        <Check className="w-4 h-4 text-[#142B50]" aria-hidden="true" />
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            type="button"
            onClick={() => setShowResetConfirmModal(true)}
            title="Reset Data Simulasi Demo"
            className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Reset Data Simulasi Demo"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Notifications Drawer Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
              aria-label="Lihat notifikasi"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-elevated border border-[#E2E8F0] p-3 z-50 animate-in fade-in duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-semibold text-slate-800">
                    Notifikasi ({unreadNotifs.length})
                  </h3>
                  {unreadNotifs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => markAllNotificationsAsRead()}
                      className="text-[11px] text-[#142B50] hover:underline cursor-pointer"
                    >
                      Tandai semua dibaca
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 mt-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      Belum ada notifikasi
                    </p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          markNotificationAsRead(item.id);
                          if (item.linkUrl) {
                            navigate(item.linkUrl);
                            setShowNotifMenu(false);
                          }
                        }}
                        className={cn(
                          'py-2 px-1 text-xs cursor-pointer hover:bg-slate-50 transition-colors rounded',
                          !item.isRead && 'bg-blue-50/50'
                        )}
                      >
                        <p className="font-semibold text-slate-800 text-[11px]">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Landing Portal Link */}
          <button
            type="button"
            onClick={() => navigate('/')}
            title="Kunjungi Halaman Depan Publik"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#142B50] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Portal Publik</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            title="Keluar / Login Ulang"
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Keluar / Login Ulang"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Confirmation Modal for Resetting Demo Data */}
      <Modal
        isOpen={showResetConfirmModal}
        onClose={() => setShowResetConfirmModal(false)}
        title="Reset Data Demo?"
        description="Semua perubahan data lokal akan dikembalikan ke kondisi awal sesuai PRD."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetConfirmModal(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                resetToDefaultData();
                setShowResetConfirmModal(false);
                navigate('/admin/dashboard');
              }}
            >
              Ya, Reset Data Sekarang
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          Tindakan ini akan mengosongkan perubahan lokal (tugas baru, soal baru, riwayat chat AI,
          dan absensi yang ditambahkan) lalu memulihkan data bawaan sekolah SMP IT Auladina Indonesia QIIBS.
        </p>
      </Modal>
    </>
  );
};
