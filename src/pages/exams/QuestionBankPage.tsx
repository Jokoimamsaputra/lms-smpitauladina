import React, { useState } from 'react';
import {
  HelpCircle,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  BookOpen,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CBTQuestion } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const QuestionBankPage: React.FC = () => {
  const { subjects, exams } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Bank of questions
  const [questions, setQuestions] = useState<CBTQuestion[]>([
    ...exams[0]?.questions || [],
    {
      id: 'q-bank-extra-1',
      number: 6,
      type: 'multiple_choice',
      questionText: 'Berapakah sisa pembagian polinomial P(x) = 2x^3 - 4x^2 + x - 5 jika dibagi oleh (x - 2)?',
      options: [
        { key: 'A', text: '-3' },
        { key: 'B', text: '-5' },
        { key: 'C', text: '3' },
        { key: 'D', text: '7' },
      ],
      correctAnswer: 'A',
      explanation: 'Berdasarkan Teorema Sisa, S = P(2) = 2(2)^3 - 4(2)^2 + 2 - 5 = 16 - 16 + 2 - 5 = -3.',
      points: 20,
    },
    {
      id: 'q-bank-extra-2',
      number: 7,
      type: 'multiple_choice',
      questionText: 'Manakah dari hukum fisika berikut yang menyatakan hubungan antara kelajuan fluida ideal dengan tekanan statis fluida?',
      options: [
        { key: 'A', text: 'Hukum Pascal' },
        { key: 'B', text: 'Hukum Archimedes' },
        { key: 'C', text: 'Hukum Bernoulli' },
        { key: 'D', text: 'Hukum Stokes' },
      ],
      correctAnswer: 'C',
      explanation: 'Asas Bernoulli menyatakan bahwa pada aliran fluida yang bertambah laju kecepatannya, terjadi penurunan tekanan secara simultan.',
      points: 20,
    },
  ]);

  // Form states
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctKey, setCorrectKey] = useState('A');
  const [explanation, setExplanation] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || !optA || !optB) return;

    const newQ: CBTQuestion = {
      id: `q-bank-${Date.now()}`,
      number: questions.length + 1,
      type: 'multiple_choice',
      questionText,
      options: [
        { key: 'A', text: optA },
        { key: 'B', text: optB },
        { key: 'C', text: optC || 'Opsi C' },
        { key: 'D', text: optD || 'Opsi D' },
      ],
      correctAnswer: correctKey,
      explanation: explanation || 'Penjelasan materi terstandar.',
      points: 20,
    };

    setQuestions([...questions, newQ]);
    setIsAddModalOpen(false);
    triggerToast('Butir soal baru berhasil disimpan ke Bank Soal.');
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    triggerToast('Soal telah dihapus dari bank soal.');
  };

  const filteredQuestions = questions.filter((q) =>
    q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B50] text-white px-4 py-3 rounded-xl shadow-modal flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'Evaluasi', href: '/exams' },
          { label: 'Bank Soal Sekolah' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Bank Soal & Asesmen Terpusat
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gudang butir soal objektif dan esai yang dapat digunakan kembali untuk pembuatan paket ujian CBT.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Tambah Soal Baru
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari teks soal atau kata kunci materi..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Tersedia: <strong>{filteredQuestions.length} Butir Soal</strong>
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#142B50]">Butir #{idx + 1}</span>
                <Badge variant="primary" size="sm">Pilihan Ganda</Badge>
                <Badge variant="default" size="sm">Bobot: {q.points} Poin</Badge>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(q.id)}
                className="text-slate-400 hover:text-red-600 p-1 rounded cursor-pointer"
                title="Hapus Soal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {q.questionText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options?.map((opt) => (
                <div
                  key={opt.key}
                  className={`p-2.5 rounded-lg border ${
                    opt.key === q.correctAnswer
                      ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900'
                      : 'bg-slate-50 border-slate-100 text-slate-600'
                  }`}
                >
                  <span className="font-bold mr-1.5">{opt.key}.</span>
                  <span>{opt.text}</span>
                  {opt.key === q.correctAnswer && (
                    <span className="ml-2 text-[10px] text-emerald-600 font-bold uppercase">(Kunci)</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <strong>Pembahasan:</strong> {q.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Tambah Soal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Butir Soal ke Bank Soal"
        description="Lengkapi stimulus pertanyaan, opsi pilihan ganda, dan pembahasan."
        maxWidth="lg"
      >
        <form onSubmit={handleAddQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teks Pertanyaan
            </label>
            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Tuliskan stimulus narasi atau butir pertanyaan..."
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opsi Pilihan A
              </label>
              <input
                type="text"
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                required
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opsi Pilihan B
              </label>
              <input
                type="text"
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                required
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opsi Pilihan C
              </label>
              <input
                type="text"
                value={optC}
                onChange={(e) => setOptC(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opsi Pilihan D
              </label>
              <input
                type="text"
                value={optD}
                onChange={(e) => setOptD(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kunci Jawaban yang Benar
              </label>
              <select
                value={correctKey}
                onChange={(e) => setCorrectKey(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] bg-white font-bold"
              >
                <option value="A">Opsi A</option>
                <option value="B">Opsi B</option>
                <option value="C">Opsi C</option>
                <option value="D">Opsi D</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pembahasan & Rujukan Solusi
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Jelaskan alasan kunci jawaban untuk review siswa..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50]"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Simpan Soal ke Bank
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
