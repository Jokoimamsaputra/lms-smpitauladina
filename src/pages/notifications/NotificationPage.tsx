import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Clock,
  BookOpen,
  FileCheck2,
  FileText,
  Megaphone,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const NotificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredNotifs = notifications.filter((n) =>
    categoryFilter === 'all' || n.category === categoryFilter
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'assignment':
        return <FileCheck2 className="w-4 h-4 text-emerald-600" />;
      case 'exam':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'academic':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      default:
        return <Megaphone className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Portal', href: '/' },
          { label: 'Pusat Notifikasi & Pengumuman' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Pusat Notifikasi & Pengumuman Sekolah
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Informasi penting terkait jadwal ujian, rilis nilai tugas, dan agenda kegiatan sekolah.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => markAllNotificationsAsRead()}
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
        >
          Tandai Semua Sudah Dibaca
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Semua Kategori' },
          { id: 'exam', label: 'Ujian CBT' },
          { id: 'assignment', label: 'Tugas' },
          { id: 'academic', label: 'Akademik' },
          { id: 'announcement', label: 'Pengumuman Umum' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategoryFilter(tab.id)}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              categoryFilter === tab.id
                ? 'bg-[#142B50] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            Tidak ada notifikasi pada kategori ini.
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationAsRead(item.id);
                if (item.linkUrl) navigate(item.linkUrl);
              }}
              className={`p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                !item.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.title}
                    </h2>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} WIB
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.message}
                </p>

                {item.linkUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#142B50] mt-2 hover:underline">
                    Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
