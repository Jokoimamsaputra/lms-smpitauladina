import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  MapPin,
  User,
  Search,
  Filter,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const VirtualClassPage: React.FC = () => {
  const navigate = useNavigate();
  const { subjects, classes, currentUser } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');

  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.className.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClassId === 'all' || s.classId === selectedClassId;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Pembelajaran', href: '/virtual-classes' },
          { label: 'Kelas Virtual LMS' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Kelas Virtual & Mata Pelajaran
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ruang belajar terpadu: akses materi, tugas, diskusi interaktif, dan evaluasi pembelajaran.
          </p>
        </div>

        {currentUser.role === 'admin' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/admin/classes')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Kelola Kelas & Guru
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mata pelajaran atau nama guru..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 shrink-0 font-medium">Filter Kelas:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-white text-slate-700 w-full sm:w-auto"
          >
            <option value="all">Semua Rombel</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((subj) => (
          <div
            key={subj.id}
            onClick={() => navigate(`/subjects/${subj.id}`)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-[#142B50] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Header Banner */}
              <div
                className={`h-24 bg-gradient-to-r ${subj.bannerColor} p-4 text-white flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <Badge variant="primary" size="sm" className="bg-white/20 text-white border-white/30">
                    {subj.className}
                  </Badge>
                  <span className="text-[10px] font-mono text-white/80">
                    {subj.code}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white z-10 line-clamp-1 group-hover:underline">
                  {subj.name}
                </h3>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 text-xs">
                <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11px]">
                  {subj.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-slate-500">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800 line-clamp-1">
                      {subj.teacherName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{subj.scheduleDays}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{subj.room}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-[#142B50] font-semibold">
              <span>Masuk ke Kelas Virtual</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
