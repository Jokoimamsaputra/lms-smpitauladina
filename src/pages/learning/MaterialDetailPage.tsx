import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Send,
  Share2,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const MaterialDetailPage: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const navigate = useNavigate();
  const { materials, toggleMaterialCompleted, addMaterialComment, currentUser } = useStore();

  const material = materials.find((m) => m.id === materialId) || materials[0];
  const [commentText, setCommentText] = useState('');

  const handleToggleComplete = () => {
    toggleMaterialCompleted(material.id);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addMaterialComment(material.id, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      content: commentText,
    });
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Kelas Virtual', href: '/virtual-classes' },
          { label: material.subjectName, href: `/subjects/${material.subjectId}` },
          { label: material.title },
        ]}
      />

      {/* Main Material Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-[#F5F7FB]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="primary">Pertemuan {material.meetingNumber}</Badge>
              <span className="text-xs text-slate-500 font-medium">
                {material.subjectName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {material.durationMinutes} Menit
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {material.title}
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">{material.chapter}</p>

          {/* Action Toolbar */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              variant={material.isCompletedByStudent ? 'outline' : 'primary'}
              size="sm"
              onClick={handleToggleComplete}
              leftIcon={<CheckCircle2 className={`w-4 h-4 ${material.isCompletedByStudent ? 'text-emerald-600' : ''}`} />}
            >
              {material.isCompletedByStudent ? 'Selesai Dipelajari (Klik untuk Batal)' : 'Tandai Selesai Membaca'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/ai/assistant')}
              leftIcon={<Sparkles className="w-4 h-4 text-[#142B50]" />}
            >
              Tanya AI Tutor tentang Topik Ini
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 max-w-4xl mx-auto prose prose-slate text-xs sm:text-sm leading-relaxed">
          <div className="bg-blue-50/70 border border-blue-200/80 p-4 rounded-xl mb-6 text-xs text-blue-900 font-medium">
            <strong>Ringkasan Pertemuan:</strong> {material.summary}
          </div>

          <div className="whitespace-pre-line text-slate-700 leading-relaxed font-sans space-y-4">
            {material.content}
          </div>
        </div>
      </div>

      {/* Discussion & Question Forum */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
          <MessageSquare className="w-4 h-4 text-[#142B50]" />
          <span>Tanya Jawab & Diskusi Materi ({material.comments?.length || 0})</span>
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Ajukan pertanyaan kepada guru pengampu atau diskusikan konsep bersama teman sekelas.
        </p>

        {/* Post Comment Input */}
        <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ketik pertanyaan atau tanggapan Anda..."
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50]"
          />
          <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
            Kirim
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-3">
          {(!material.comments || material.comments.length === 0) ? (
            <p className="text-xs text-slate-400 py-3 text-center">
              Belum ada pertanyaan pada pertemuan ini. Jadilah yang pertama bertanya!
            </p>
          ) : (
            material.comments.map((comm) => (
              <div key={comm.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{comm.authorName}</span>
                    <Badge variant={comm.authorRole === 'guru' ? 'primary' : 'default'} size="sm">
                      {comm.authorRole === 'guru' ? 'Guru' : 'Siswa'}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(comm.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mt-2">
                  {comm.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
