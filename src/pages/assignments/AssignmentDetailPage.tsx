import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  Upload,
  FileText,
  User,
  ArrowLeft,
  Edit3,
  Calendar,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const AssignmentDetailPage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const {
    assignments,
    submissions,
    submitAssignment,
    gradeSubmission,
    currentUser,
  } = useStore();

  const assignment = assignments.find((a) => a.id === assignmentId) || assignments[0];
  const assignmentSubmissions = submissions.filter((s) => s.assignmentId === assignment.id);
  const mySubmission = assignmentSubmissions.find((s) => s.studentId === currentUser.id);

  // Student form state
  const [studentNotes, setStudentNotes] = useState('');
  const [fileName, setFileName] = useState('Jawaban_Praktik_AhmadRizky.pdf');

  // Teacher grading modal state
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [selectedSubmId, setSelectedSubmId] = useState<string | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(90);
  const [feedbackInput, setFeedbackInput] = useState('Pengerjaan rapi dan logika algoritma terstruktur dengan baik.');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssignment(assignment.id, studentNotes, {
      name: fileName,
      size: '1.5 MB',
      url: '#demo-download',
    });
    triggerToast('Tugas Anda berhasil diserahkan kepada guru pengampu.');
  };

  const handleOpenGrading = (submId: string, currentScore?: number, currentFeedback?: string) => {
    setSelectedSubmId(submId);
    setScoreInput(currentScore || 90);
    setFeedbackInput(currentFeedback || 'Sangat baik. Pertahankan prestasimu!');
    setGradingModalOpen(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmId) return;

    gradeSubmission(selectedSubmId, Number(scoreInput), feedbackInput);
    setGradingModalOpen(false);
    triggerToast(`Nilai ${scoreInput} dan feedback telah berhasil disimpan.`);
  };

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
          { label: 'Tugas Siswa', href: '/assignments' },
          { label: assignment.title },
        ]}
      />

      {/* Assignment Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary">{assignment.subjectName}</Badge>
            <span className="text-xs text-slate-500 font-medium">{assignment.className}</span>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Tenggat: {new Date(assignment.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {assignment.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {assignment.description}
        </p>

        {/* Instructions */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <span className="font-bold text-slate-900 block mb-2">Petunjuk Pengerjaan:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            {assignment.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* STUDENT VIEW: Submission Form or Submission Status */}
      {currentUser.role === 'siswa' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-1">
            Pengumpulan Tugas Anda
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Pastikan berkas telah sesuai dengan ketentuan format yang diminta.
          </p>

          {mySubmission ? (
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Status: Berhasil Diserahkan
                </span>
                <span className="text-[11px] text-slate-500">
                  Waktu: {new Date(mySubmission.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} WIB
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">
                    {mySubmission.fileAttachment?.name || 'Berkas_Jawaban.pdf'}
                  </span>
                  <span className="text-slate-400">({mySubmission.fileAttachment?.size || '1.2 MB'})</span>
                </div>
                <Badge variant="success">Tersimpan</Badge>
              </div>

              {mySubmission.studentNotes && (
                <p className="text-xs text-slate-600 italic">
                  Catatan Anda: "{mySubmission.studentNotes}"
                </p>
              )}

              {/* Teacher Grading Feedback if graded */}
              {mySubmission.status === 'graded' && (
                <div className="mt-4 p-4 rounded-xl bg-white border border-emerald-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Hasil Evaluasi Guru
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      Nilai: {mySubmission.score} / 100
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong>Feedback Guru:</strong> "{mySubmission.feedback}"
                  </p>
                  <p className="text-[10px] text-slate-400 text-right">
                    Dinilai oleh: {mySubmission.gradedByTeacherName || 'Guru Pengampu'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 text-center flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  Simulasi Lampiran Berkas Tugas
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Format didukung: PDF, ZIP, PY, DOCX (Maks 10 MB)
                </p>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="mt-3 text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white w-full max-w-sm text-center font-mono"
                  placeholder="Nama file lampiran..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan Siswa (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Tuliskan catatan pengerjaan bila diperlukan..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50]"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="md">
                  Kumpulkan Tugas Sekarang
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TEACHER / ADMIN VIEW: Submissions Table & Grading */}
      {currentUser.role !== 'siswa' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Rekap Pengumpulan Siswa ({assignmentSubmissions.length} Terkumpul)
              </h2>
              <p className="text-xs text-slate-500">
                Pilih siswa untuk memeriksa lampiran dan memberikan skor serta feedback evaluasi.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">NISN</th>
                  <th className="py-3 px-4">Waktu Penyerahan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Nilai</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignmentSubmissions.map((subm) => (
                  <tr key={subm.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {subm.studentName}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {subm.studentNis}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(subm.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} WIB
                    </td>
                    <td className="py-3 px-4">
                      {subm.status === 'graded' ? (
                        <Badge variant="success">Sudah Dinilai</Badge>
                      ) : (
                        <Badge variant="warning">Menunggu Nilai</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {subm.status === 'graded' ? `${subm.score} / 100` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant={subm.status === 'graded' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleOpenGrading(subm.id, subm.score, subm.feedback)}
                        leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                      >
                        {subm.status === 'graded' ? 'Edit Nilai' : 'Beri Nilai'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Penilaian Guru */}
      <Modal
        isOpen={gradingModalOpen}
        onClose={() => setGradingModalOpen(false)}
        title="Penilaian Tugas Siswa"
        description="Masukkan skor angka dan catatan konstruktif untuk siswa."
      >
        <form onSubmit={handleSaveGrade} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Skor Nilai (Skala 0 : 100)
            </label>
            <input
              type="number"
              value={scoreInput}
              onChange={(e) => setScoreInput(Number(e.target.value))}
              min={0}
              max={100}
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none font-bold text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Feedback & Rekomendasi Guru
            </label>
            <textarea
              rows={3}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              placeholder="Berikan masukan edukatif bagi siswa..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setGradingModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Simpan Nilai & Feedback
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
