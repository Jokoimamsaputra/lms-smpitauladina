import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  List,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const DigitalReaderPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { books, bookmarkedBookIds, toggleBookmarkBook } = useStore();

  const book = books.find((b) => b.id === bookId) || books[0];
  const initialPage = Number(searchParams.get('page')) || 25;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showToc, setShowToc] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [pageBookmarked, setPageBookmarked] = useState(false);

  const matchedContent =
    book.samplePagesContent.find((p) => p.pageNumber === currentPage) ||
    book.samplePagesContent[0] || {
      pageNumber: currentPage,
      title: `Halaman ${currentPage}`,
      content: `### Rangkuman Materi Pembelajaran\n\nMateri ini menyajikan pemahaman kontekstual berbasis Kurikulum Merdeka yang dirancang untuk memperkuat literasi dan penalaran kritis peserta didik.\n\nSimak penjabaran rumus dan studi kasus pada lembar aktivitas berikutnya.`,
    };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < book.totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col fixed inset-0 z-50">
      {/* Top Reader Navbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/books/${book.id}`)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Kembali ke Detail Buku"
            aria-label="Kembali ke Detail Buku"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
              {book.title}
            </h1>
            <p className="text-[10px] text-slate-400">
              {book.subject} • {book.curriculum}
            </p>
          </div>
        </div>

        {/* Tools: TOC toggle, Zoom, Bookmark, AI */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowToc(!showToc)}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 border transition-colors cursor-pointer ${
              showToc
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar Isi</span>
          </button>

          <button
            type="button"
            onClick={() => setPageBookmarked(!pageBookmarked)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              pageBookmarked
                ? 'bg-amber-400 text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Tandai Halaman Ini"
            aria-label="Tandai Halaman Ini"
          >
            <Bookmark className="w-4 h-4" fill={pageBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs text-slate-300">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
              className="p-1 hover:text-white cursor-pointer"
              aria-label="Perkecil teks"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px]">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 10, 140))}
              className="p-1 hover:text-white cursor-pointer"
              aria-label="Perbesar teks"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/ai/assistant')}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#142B50]" />}
            className="text-xs py-1"
          >
            Tanya AI
          </Button>
        </div>
      </header>

      {/* Main Container: Sidebar TOC & Page Reader View */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Table of Contents Drawer */}
        {showToc && (
          <aside className="w-72 bg-slate-850 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 z-20">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200">
              <span>Daftar Isi Bab</span>
              <button
                type="button"
                onClick={() => setShowToc(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {book.chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setCurrentPage(ch.pageNumber);
                    setShowToc(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    currentPage === ch.pageNumber
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="line-clamp-1">{ch.chapterNumber}. {ch.title}</span>
                  <span className="text-[10px] text-slate-400 ml-2">Hal. {ch.pageNumber}</span>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Paper Reader Center */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-8 flex justify-center items-start">
          <div
            className="w-full max-w-3xl bg-white text-slate-800 rounded-lg shadow-2xl p-8 sm:p-14 min-h-[750px] transition-all"
            style={{ fontSize: `${zoomLevel}%` }}
          >
            {/* Page Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 text-xs text-slate-400 font-medium">
              <span>{book.title} • {book.publisher}</span>
              <span>Halaman {currentPage} dari {book.totalPages}</span>
            </div>

            {/* Page Content Body */}
            <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {matchedContent.title}
              </h2>

              <div className="text-xs sm:text-sm whitespace-pre-line text-slate-700 leading-relaxed font-sans">
                {matchedContent.content}
              </div>
            </div>

            {/* Page Footer */}
            <div className="mt-16 pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
              <span>Kurikulum Merdeka Kemendikdasmen RI</span>
              <span className="font-mono">Hal. {currentPage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Toolbar */}
      <footer className="h-14 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between shrink-0 text-xs">
        <div className="text-[11px] text-slate-400 hidden sm:block">
          Gunakan tombol panah atau navigasi untuk membalik halaman.
        </div>

        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <div className="flex items-center gap-1.5 font-mono text-slate-300 text-xs">
            <span>Hal.</span>
            <input
              type="number"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              min={1}
              max={book.totalPages}
              className="w-12 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-center text-white focus:outline-none focus:border-blue-500"
            />
            <span>/ {book.totalPages}</span>
          </div>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= book.totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs transition-colors cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
