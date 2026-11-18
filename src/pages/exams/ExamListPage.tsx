import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const ExamListPage: React.FC = () => {
  const navigate = useNavigate();
  const { exams, examAttempts, currentUser } = useStore();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Evaluasi', href: '/exams' },
          { label: 'Ujian Online CBT' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Ujian Online & Kuis Berbasis Komputer (CBT)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sistem Computer-Based Test terintegrasi dengan timer otomatis, pengacakan soal, dan penilaian objektif langsung.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/question-bank')}
          leftIcon={<FileText className="w-4 h-4" />}
        >
          Lihat Bank Soal
        </Button>
      </div>

      {/* Active Exams Grid */}
      <div className="space-y-4">
        {exams.map((exam) => {
          const attempt = examAttempts.find((a) => a.examId === exam.id && a.studentId === currentUser.id);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#142B50] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{exam.subjectName}</Badge>
                  <span className="text-xs text-slate-500 font-medium">{exam.className}</span>
                  <Badge variant="warning">Sumatif Tengah Semester</Badge>
                </div>

                <h2 className="text-base font-bold text-slate-900">{exam.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{exam.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Durasi: {exam.durationMinutes} Menit
                  </span>
                  <span>•</span>
                  <span>{exam.totalQuestions} Butir Soal Objektif</span>
                  <span>•</span>
                  <span>Passing Grade (KKM): {exam.passingScore}</span>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 flex items-center gap-3">
                {attempt ? (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Nilai Terakhir</span>
                    <span className="text-lg font-bold text-emerald-600 block">
                      {attempt.score} / 100
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-1"
                      onClick={() => navigate(`/exams/${exam.id}/result`)}
                    >
                      Lihat Pembahasan
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate(`/exams/${exam.id}`)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Mulai Ujian CBT
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
