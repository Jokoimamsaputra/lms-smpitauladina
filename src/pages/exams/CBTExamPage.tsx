import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flag,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Save,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const CBTExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { exams, submitExamAttempt, currentUser } = useStore();

  const exam = exams.find((e) => e.id === examId) || exams[0];

  // Exam state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [autosaveIndicator, setAutosaveIndicator] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam.questions[currentIndex];

  const handleSelectAnswer = (optionKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionKey,
    }));
    // Flash autosave indicator
    setAutosaveIndicator(true);
    setTimeout(() => setAutosaveIndicator(false), 1200);
  };

  const toggleFlagQuestion = () => {
    setFlaggedQuestions((prev) =>
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleFinalSubmit = () => {
    // Calculate objective score
    let totalScore = 0;
    exam.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        totalScore += q.points;
      }
    });

    submitExamAttempt({
      examId: exam.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      answers,
      flaggedQuestionIds: flaggedQuestions,
      score: totalScore,
      durationSpentSeconds: exam.durationMinutes * 60 - timeLeftSeconds,
      status: 'completed',
    });

    setConfirmModalOpen(false);
    navigate(`/exams/${exam.id}/result`);
  };

  const answeredCount = Object.keys(answers).length;
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col fixed inset-0 z-50">
      {/* CBT Topbar */}
      <header className="h-16 bg-[#142B50] text-white px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-bold text-xs">
            CBT
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold truncate max-w-xs sm:max-w-md">
              {exam.title}
            </h1>
            <p className="text-[10px] text-blue-200">
              {currentUser.name} ({currentUser.identifierNumber})
            </p>
          </div>
        </div>

        {/* Center: Autosave status */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-blue-200">
          <Save className="w-3.5 h-3.5" />
          <span>{autosaveIndicator ? 'Menyimpan jawaban...' : 'Jawaban tersimpan otomatis'}</span>
        </div>

        {/* Right: Live Timer */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/20 flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-amber-300">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setConfirmModalOpen(true)}
          >
            Selesai Ujian
          </Button>
        </div>
      </header>

      {/* Main CBT Workspace: Question Pane + Side Question Navigator */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left: Question Box */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-[#142B50] text-white px-3 py-1 rounded-md">
                  Soal No. {currentIndex + 1}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  dari {exam.totalQuestions} Soal
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Bobot: {currentQuestion.points} Poin
              </span>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed mb-6">
              {currentQuestion.questionText}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-[#142B50] bg-[#EAF0F8] text-[#142B50] font-semibold ring-1 ring-[#142B50]'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[#142B50] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions Toolbar */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((idx) => Math.max(idx - 1, 0))}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Soal Sebelumnya
            </Button>

            <button
              type="button"
              onClick={toggleFlagQuestion}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isFlagged
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-amber-600" />
              <span>{isFlagged ? 'Telah Ditandai Ragu' : 'Tandai Ragu-ragu'}</span>
            </button>

            {currentIndex < exam.totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentIndex((idx) => Math.min(idx + 1, exam.totalQuestions - 1))}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Soal Selanjutnya
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setConfirmModalOpen(true)}
              >
                Selesai & Kumpulkan
              </Button>
            )}
          </div>
        </div>

        {/* Right: Question Navigator Grid */}
        <div className="w-full lg:w-72 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 shrink-0 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Nomor Soal Ujian
            </h2>

            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!answers[q.id];
                const isQFlagged = flaggedQuestions.includes(q.id);

                let btnClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (isQFlagged) {
                  btnClass = 'bg-amber-400 text-slate-900 font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-[#142B50] text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer ${btnClass} ${
                      isCurrent ? 'ring-2 ring-offset-2 ring-blue-600 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#142B50]" />
                <span>Sudah Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-400" />
                <span>Ragu-ragu ({flaggedQuestions.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                <span>Belum Dijawab ({exam.totalQuestions - answeredCount})</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
              onClick={() => setConfirmModalOpen(true)}
            >
              Konfirmasi Selesai
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Kumpulkan Ujian CBT?"
        description="Pastikan seluruh jawaban Anda telah diperiksa sebelum dikirimkan."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmModalOpen(false)}
            >
              Kembali Memeriksa
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleFinalSubmit}
            >
              Ya, Kumpulkan Sekarang
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            Anda telah menjawab <strong>{answeredCount} dari {exam.totalQuestions} soal</strong>.
          </p>
          {answeredCount < exam.totalQuestions && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Masih ada {exam.totalQuestions - answeredCount} soal yang belum Anda jawab!</span>
            </div>
          )}
          <p className="text-[11px] text-slate-500">
            Setelah dikumpulkan, jawaban Anda akan dinilai secara otomatis oleh sistem CBT.
          </p>
        </div>
      </Modal>
    </div>
  );
};
