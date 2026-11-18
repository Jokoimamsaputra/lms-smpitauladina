import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const ExamResultPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { exams, examAttempts, currentUser } = useStore();

  const exam = exams.find((e) => e.id === examId) || exams[0];
  const attempt = examAttempts.find((a) => a.examId === exam.id && a.studentId === currentUser.id) || {
    id: 'demo-att',
    examId: exam.id,
    studentId: currentUser.id,
    studentName: currentUser.name,
    answers: { 'q-1': 'B', 'q-2': 'D', 'q-3': 'C', 'q-4': 'A', 'q-5': 'C' },
    flaggedQuestionIds: [],
    score: 100,
    submittedAt: new Date().toISOString(),
    durationSpentSeconds: 1420,
    status: 'completed' as const,
  };

  const isPassed = attempt.score >= exam.passingScore;

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Ujian CBT', href: '/exams' },
          { label: exam.title, href: `/exams/${exam.id}` },
          { label: 'Hasil & Pembahasan Soal' },
        ]}
      />

      {/* Result Hero Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center max-w-3xl mx-auto">
        <div
          className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}
        >
          <Award className="w-8 h-8" />
        </div>

        <Badge variant={isPassed ? 'success' : 'danger'} size="md" className="mb-2">
          {isPassed ? 'LULUS (MEMENUHI KKM)' : 'PERLU REMEDIAL'}
        </Badge>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Hasil Ujian CBT: {exam.title}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Peserta: {attempt.studentName} • Tanggal Evaluasi: {new Date(attempt.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {/* Big Score Box */}
        <div className="mt-6 py-6 px-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-8">
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase">Nilai Akhir</span>
            <span className="text-4xl font-extrabold text-[#142B50]">{attempt.score}</span>
            <span className="text-xs text-slate-400 block mt-0.5">dari 100 Poin</span>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase">Passing Score</span>
            <span className="text-2xl font-bold text-slate-700">{exam.passingScore}</span>
            <span className="text-xs text-slate-400 block mt-0.5">Batas KKM</span>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase">Durasi Pengerjaan</span>
            <span className="text-2xl font-bold text-slate-700">
              {Math.floor(attempt.durationSpentSeconds / 60)} Menit
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">dari {exam.durationMinutes} Menit</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/student/dashboard')}
          >
            Kembali ke Dashboard Belajar
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/gradebook')}
          >
            Lihat Rekap Rapor
          </Button>
        </div>
      </div>

      {/* Pembahasan Soal demi Soal */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#142B50]" />
          <span>Analisis Pembahasan & Kunci Jawaban</span>
        </h2>

        <div className="space-y-6">
          {exam.questions.map((q, idx) => {
            const studentAns = attempt.answers[q.id];
            const isCorrect = studentAns === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#142B50]">Soal {idx + 1}</span>
                    {isCorrect ? (
                      <Badge variant="success" size="sm">Benar (+{q.points} Poin)</Badge>
                    ) : (
                      <Badge variant="danger" size="sm">Salah (0 Poin)</Badge>
                    )}
                  </div>
                  <span className="text-slate-400 font-mono">
                    Jawaban Anda: <strong>{studentAns || 'Kosong'}</strong> | Kunci: <strong>{q.correctAnswer}</strong>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mb-4">
                  {q.questionText}
                </p>

                {/* Options List */}
                <div className="space-y-1.5 mb-4">
                  {q.options?.map((opt) => {
                    const isSelected = studentAns === opt.key;
                    const isRightAnswer = q.correctAnswer === opt.key;
                    return (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-lg text-xs flex items-center justify-between border ${
                          isRightAnswer
                            ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900'
                            : isSelected
                            ? 'bg-red-50 border-red-300 text-red-900'
                            : 'bg-white border-slate-100 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{opt.key}.</span>
                          <span>{opt.text}</span>
                        </div>
                        {isRightAnswer && (
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
                            Kunci Jawaban
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-[#142B50] block mb-1">
                    Pembahasan Pedagogis:
                  </span>
                  <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
