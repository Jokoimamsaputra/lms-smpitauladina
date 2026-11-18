import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Library,
  FileCheck2,
  Sparkles,
  BarChart3,
  Settings,
  CalendarCheck2,
  FileText,
  BookMarked,
  Bell,
  X,
  HelpCircle,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  groupName?: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentUser } = useStore();

  const getNavigationForRole = (role: UserRole): NavGroup[] => {
    switch (role) {
      case 'admin':
        return [
          {
            items: [
              { label: 'Overview & Statistik', href: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Akademik & Pengguna',
            items: [
              { label: 'Manajemen Pengguna', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
              { label: 'Data Kelas & Rombel', href: '/admin/classes', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Kurikulum & Capaian', href: '/admin/curriculum', icon: <BookMarked className="w-4 h-4" /> },
              { label: 'Kelas Virtual LMS', href: '/virtual-classes', icon: <BookOpen className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Perpustakaan & AI',
            items: [
              { label: 'Katalog Buku Nasional', href: '/books', icon: <Library className="w-4 h-4" />, badge: 'Resmi' },
              { label: 'AI Teaching Assistant', href: '/ai/teaching', icon: <Sparkles className="w-4 h-4" /> },
              { label: 'AI Learning Assistant', href: '/ai/assistant', icon: <Sparkles className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Evaluasi & Laporan',
            items: [
              { label: 'Manajemen Tugas', href: '/assignments', icon: <FileCheck2 className="w-4 h-4" /> },
              { label: 'Ujian Online CBT', href: '/exams', icon: <FileText className="w-4 h-4" /> },
              { label: 'Bank Soal', href: '/question-bank', icon: <HelpCircle className="w-4 h-4" /> },
              { label: 'Gradebook & Nilai', href: '/gradebook', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Learning Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { label: 'Presensi Siswa & Guru', href: '/attendance', icon: <CalendarCheck2 className="w-4 h-4" /> },
              { label: 'Pengaturan Sistem', href: '/settings', icon: <Settings className="w-4 h-4" /> },
            ],
          },
        ];

      case 'guru':
        return [
          {
            items: [
              { label: 'Dashboard Guru', href: '/teacher/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Kelas & Mata Pelajaran', href: '/virtual-classes', icon: <BookOpen className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Pembelajaran & AI',
            items: [
              { label: 'AI Teaching Copilot', href: '/ai/teaching', icon: <Sparkles className="w-4 h-4" />, badge: 'AI' },
              { label: 'Katalog Buku Nasional', href: '/books', icon: <Library className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Evaluasi & Penilaian',
            items: [
              { label: 'Tugas Siswa', href: '/assignments', icon: <FileCheck2 className="w-4 h-4" /> },
              { label: 'Ujian CBT', href: '/exams', icon: <FileText className="w-4 h-4" /> },
              { label: 'Bank Soal', href: '/question-bank', icon: <HelpCircle className="w-4 h-4" /> },
              { label: 'Gradebook & Rapor', href: '/gradebook', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Presensi Guru & Siswa', href: '/attendance', icon: <CalendarCheck2 className="w-4 h-4" /> },
            ],
          },
        ];

      case 'siswa':
        return [
          {
            items: [
              { label: 'Dashboard Belajar', href: '/student/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Kelas Saya', href: '/virtual-classes', icon: <BookOpen className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Sumber Belajar & AI',
            items: [
              { label: 'AI Learning Assistant', href: '/ai/assistant', icon: <Sparkles className="w-4 h-4" />, badge: 'Tutor' },
              { label: 'Buku Digital Nasional', href: '/books', icon: <Library className="w-4 h-4" /> },
            ],
          },
          {
            groupName: 'Aktivitas Saya',
            items: [
              { label: 'Presensi Kehadiran', href: '/attendance', icon: <CalendarCheck2 className="w-4 h-4" /> },
              { label: 'Tugas Saya', href: '/assignments', icon: <FileCheck2 className="w-4 h-4" /> },
              { label: 'Ujian & Kuis CBT', href: '/exams', icon: <FileText className="w-4 h-4" /> },
              { label: 'Hasil Belajar & Rapor', href: '/reports', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Pengumuman', href: '/notifications', icon: <Bell className="w-4 h-4" /> },
            ],
          },
        ];

      case 'kepala':
        return [
          {
            items: [
              { label: 'Executive Dashboard', href: '/principal/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Learning Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { label: 'Monitoring Kelas', href: '/virtual-classes', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Monitoring Kehadiran', href: '/attendance', icon: <CalendarCheck2 className="w-4 h-4" /> },
              { label: 'Rapor Mutu Sekolah', href: '/reports', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Katalog Kurikulum', href: '/books', icon: <Library className="w-4 h-4" /> },
            ],
          },
        ];

      case 'orangtua':
        return [
          {
            items: [
              { label: 'Dashboard Anak', href: '/parent/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Nilai & Hasil Belajar', href: '/reports', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Aktivitas & Tugas', href: '/assignments', icon: <FileCheck2 className="w-4 h-4" /> },
              { label: 'Kehadiran Anak', href: '/attendance', icon: <CalendarCheck2 className="w-4 h-4" /> },
              { label: 'Pengumuman Sekolah', href: '/notifications', icon: <Bell className="w-4 h-4" /> },
            ],
          },
        ];
    }
  };

  const navGroups = getNavigationForRole(currentUser.role);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#142B50] text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 border-r border-[#0D1B33]',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white block leading-tight">
              LMS Techsoe
            </span>
            <span className="text-[10px] text-blue-200/80 font-medium tracking-wide">
              SMA Techsoe Portal
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 lg:hidden cursor-pointer"
            aria-label="Tutup menu sidebar"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {group.groupName && (
                <div className="px-3 mb-2 text-[10px] font-semibold text-blue-200/60 uppercase tracking-wider">
                  {group.groupName}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => (
                  <NavLink
                    key={itemIdx}
                    to={item.href}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors group cursor-pointer',
                        isActive
                          ? 'bg-white/15 text-white font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      )
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0 text-white/70 group-hover:text-white">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded font-medium">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Info footer */}
        <div className="p-4 border-t border-white/10 bg-[#0D1B33]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/30 text-blue-200 border border-blue-400/30 flex items-center justify-center font-bold text-xs uppercase">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-blue-200/70 truncate capitalize">
                Role: {currentUser.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
