import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Library,
  Search,
  Filter,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { NationalBook } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const BookCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { books, bookmarkedBookIds, toggleBookmarkBook } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [curriculumFilter, setCurriculumFilter] = useState<string>('all');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLevel = levelFilter === 'all' || book.educationLevel === levelFilter;
    const matchesCurriculum =
      curriculumFilter === 'all' || book.curriculum === curriculumFilter;
    const matchesBookmark = !showOnlyBookmarked || bookmarkedBookIds.includes(book.id);

    return matchesSearch && matchesLevel && matchesCurriculum && matchesBookmark;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Perpustakaan', href: '/books' },
          { label: 'Katalog Buku Kurikulum Nasional' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Katalog Buku Referensi Kurikulum Nasional
            </h1>
            <Badge variant="primary">Kemendikdasmen RI</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Buku teks utama terstandar untuk jenjang SD, SMP, SMA, dan SMK dengan pembaca digital interaktif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showOnlyBookmarked ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            leftIcon={<Bookmark className="w-4 h-4" />}
          >
            Buku Ditandai ({bookmarkedBookIds.length})
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul buku, mata pelajaran, atau penulis..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Curriculum dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 shrink-0 font-medium">Kurikulum:</span>
            <select
              value={curriculumFilter}
              onChange={(e) => setCurriculumFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-white text-slate-700 w-full sm:w-auto"
            >
              <option value="all">Semua Kurikulum</option>
              <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
              <option value="Kurikulum 2013">Kurikulum 2013</option>
            </select>
          </div>
        </div>

        {/* Level Filters Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto">
          <span className="text-xs text-slate-400 font-medium shrink-0">Jenjang:</span>
          {[
            { id: 'all', label: 'Semua Jenjang' },
            { id: 'SD', label: 'SD (Kelas 1 : 6)' },
            { id: 'SMP', label: 'SMP (Kelas 7 : 9)' },
            { id: 'SMA', label: 'SMA (Kelas 10 : 12)' },
            { id: 'SMK', label: 'SMK (Kejuruan)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLevelFilter(tab.id)}
              className={`text-xs px-3 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer transition-colors ${
                levelFilter === tab.id
                  ? 'bg-[#142B50] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-slate-200">
            <Library className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">Tidak ada buku yang sesuai kriteria pencarian</p>
            <p className="text-[11px] text-slate-400 mt-1">Coba sesuaikan kata kunci atau bersihkan filter jenjang.</p>
          </div>
        ) : (
          filteredBooks.map((book) => {
            const isBookmarked = bookmarkedBookIds.includes(book.id);
            return (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-[#142B50] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Header */}
                  <div className="relative h-44 bg-gradient-to-br from-[#142B50] to-[#0D1B33] overflow-hidden p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold text-white bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                        {book.educationLevel} • Kelas {book.grade}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkBook(book.id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-white/20 text-white hover:bg-white/40'
                        }`}
                        title={isBookmarked ? 'Hapus dari bookmark' : 'Tandai buku'}
                        aria-label="Tandai buku"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="z-10">
                      <span className="text-[10px] text-blue-200 font-medium block">
                        {book.subject}
                      </span>
                      <h2 className="text-sm font-bold text-white leading-snug line-clamp-2 mt-0.5">
                        {book.title}
                      </h2>
                    </div>

                    {/* Subtle decorative pattern */}
                    <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{book.curriculum}</span>
                      <span>{book.totalPages} Halaman</span>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {book.synopsis}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      Penulis: {book.authors.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    Detail Buku
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => navigate(`/reader/${book.id}`)}
                    rightIcon={<BookOpen className="w-3.5 h-3.5" />}
                  >
                    Baca Digital
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
