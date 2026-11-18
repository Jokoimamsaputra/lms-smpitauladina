import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Bookmark,
  Share2,
  ExternalLink,
  ChevronRight,
  Layers,
  Calendar,
  Building,
  User,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { books, bookmarkedBookIds, toggleBookmarkBook } = useStore();

  const book = books.find((b) => b.id === bookId) || books[0];
  const isBookmarked = bookmarkedBookIds.includes(book.id);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Katalog Buku', href: '/books' },
          { label: book.title },
        ]}
      />

      {/* Main Header / Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cover Placeholder */}
          <div className="w-full lg:w-64 h-80 rounded-xl bg-gradient-to-br from-[#142B50] to-[#0D1B33] text-white p-6 flex flex-col justify-between shrink-0 shadow-md relative overflow-hidden">
            <div>
              <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                {book.educationLevel} • Kelas {book.grade}
              </span>
              <p className="text-xs text-blue-200 font-semibold mt-4">{book.subject}</p>
              <h2 className="text-base font-bold text-white mt-1 leading-snug">
                {book.title}
              </h2>
            </div>
            <div>
              <p className="text-[10px] text-slate-300">Penerbit Resmi</p>
              <p className="text-[11px] font-medium text-white truncate">{book.publisher}</p>
            </div>
          </div>

          {/* Metadata & Actions */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{book.curriculum}</Badge>
              <Badge variant="default">{book.edition}</Badge>
              <span className="text-xs text-slate-400">Tahun {book.publishYear}</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {book.title}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              {book.synopsis}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Penulis</span>
                <span className="font-medium text-slate-800">{book.authors.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Jumlah Halaman</span>
                <span className="font-medium text-slate-800">{book.totalPages} Halaman</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Status Pembaca</span>
                <span className="font-semibold text-emerald-600">Digital Reader Aktif</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(`/reader/${book.id}`)}
                leftIcon={<BookOpen className="w-4 h-4" />}
              >
                Buka Digital Book Reader
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => toggleBookmarkBook(book.id)}
                leftIcon={<Bookmark className="w-4 h-4" />}
              >
                {isBookmarked ? 'Buku Tersimpan' : 'Simpan ke Bookmark'}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/ai/assistant')}
                leftIcon={<Sparkles className="w-4 h-4 text-[#142B50]" />}
              >
                Tanya AI tentang Buku Ini
              </Button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              * Rujukan Resmi: Buku Teks Utama Kemendikdasmen RI. Hak Cipta dilindungi undang-undang.
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Isi (Table of Contents) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-1">
          Daftar Isi & Struktur Bab Pembelajaran
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Pilih bab untuk langsung membukanya di Digital Book Reader
        </p>

        <div className="space-y-2.5">
          {book.chapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => navigate(`/reader/${book.id}?page=${ch.pageNumber}`)}
              className="p-3.5 rounded-lg border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded bg-[#EAF0F8] text-[#142B50] font-bold text-xs flex items-center justify-center shrink-0">
                  {ch.chapterNumber}
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-slate-900">{ch.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{ch.previewSummary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
                <span>Hal. {ch.pageNumber}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
