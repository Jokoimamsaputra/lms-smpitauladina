import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileCheck2,
  FileText,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  Send,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const SubjectDetailPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { subjects, materials, assignments, exams, users, currentUser } = useStore();

  const [activeTab, setActiveTab] = useState<'materi' | 'tugas' | 'ujian' | 'diskusi' | 'siswa'>('materi');
  const [discussionInput, setDiscussionInput] = useState('');
  const [forumPosts, setForumPosts] = useState([
    {
      id: 'post-1',
      author: 'Miryati, S.Kom.',
      role: 'Guru',
      time: 'Kemarin, 09.00 WIB',
      content: 'Selamat pagi siswa sekalian! Jangan lupa pelajari materi Pertemuan 1 mengenai Binary Search sebelum mengikuti Ujian CBT tengah semester.',
    },
    {
      id: 'post-2',
      author: 'Muhammad Al Kayyis',
      role: 'Siswa',
      time: 'Kemarin, 10.30 WIB',
      content: 'Baik Bu Siti, apakah materi modul bab 2 strategi algoritmik juga masuk kisi-kisi ujian?',
    },
  ]);

  const subject = subjects.find((s) => s.id === subjectId) || subjects[0];
  const subjectMaterials = materials.filter((m) => m.subjectId === subject.id);
  const subjectAssignments = assignments.filter((a) => a.subjectId === subject.id);
  const subjectExams = exams.filter((e) => e.subjectId === subject.id);
  const classStudents = users.filter((u) => u.role === 'siswa' && u.className === subject.className);

  const handleSendPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;

    setForumPosts([
      ...forumPosts,
      {
        id: `post-${Date.now()}`,
        author: currentUser.name,
        role: currentUser.role === 'guru' ? 'Guru' : 'Siswa',
        time: 'Baru saja',
        content: discussionInput,
      },
    ]);
    setDiscussionInput('');
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Kelas Virtual', href: '/virtual-classes' },
          { label: `${subject.name} (${subject.className})` },
        ]}
      />

      {/* Hero Header */}
      <div className={`rounded-2xl bg-gradient-to-r ${subject.bannerColor} p-6 sm:p-8 text-white shadow-sm relative overflow-hidden`}>
        <div className="max-w-2xl z-10 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">
              {subject.className}
            </span>
            <span className="text-[10px] font-mono text-white/80">
              Kode: {subject.code}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {subject.name}
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
            {subject.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-blue-100 border-t border-white/15 pt-4">
            <div>
              <span className="opacity-75 block text-[10px] uppercase font-semibold">Guru Pengampu</span>
              <span className="font-semibold text-white">{subject.teacherName}</span>
            </div>
            <div>
              <span className="opacity-75 block text-[10px] uppercase font-semibold">Jadwal Kelas</span>
              <span className="font-semibold text-white">{subject.scheduleDays}</span>
            </div>
            <div>
              <span className="opacity-75 block text-[10px] uppercase font-semibold">Ruangan</span>
              <span className="font-semibold text-white">{subject.room}</span>
            </div>
          </div>
        </div>

        {/* AI Copilot shortcut in banner */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/ai/teaching')}
            leftIcon={<Sparkles className="w-4 h-4 text-[#142B50]" />}
          >
            AI Teaching Copilot
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            onClick={() => navigate('/books')}
            leftIcon={<BookOpen className="w-4 h-4" />}
          >
            Buku Teks Pendamping
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 bg-white rounded-t-xl px-4 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'materi', label: `Materi Pelajaran (${subjectMaterials.length})`, icon: <BookOpen className="w-4 h-4" /> },
          { id: 'tugas', label: `Tugas & Proyek (${subjectAssignments.length})`, icon: <FileCheck2 className="w-4 h-4" /> },
          { id: 'ujian', label: `Ujian CBT (${subjectExams.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'diskusi', label: `Forum Diskusi (${forumPosts.length})`, icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'siswa', label: `Siswa Kelas (${classStudents.length})`, icon: <Users className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 py-3.5 px-3 text-xs font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'border-[#142B50] text-[#142B50]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 shadow-sm">
        {/* Tab 1: Materi */}
        {activeTab === 'materi' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">
                Alur Materi Pertemuan Pembelajaran
              </h2>
              {currentUser.role === 'guru' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/ai/teaching')}
                  leftIcon={<PlusCircle className="w-4 h-4" />}
                >
                  Buat Materi Baru
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {subjectMaterials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => navigate(`/materials/${mat.id}`)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      P{mat.meetingNumber}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{mat.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{mat.chapter}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">{mat.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {mat.durationMinutes} Menit
                    </span>
                    {mat.isCompletedByStudent ? (
                      <Badge variant="success">Selesai Dibaca</Badge>
                    ) : (
                      <Badge variant="default">Belum Selesai</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Tugas */}
        {activeTab === 'tugas' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">
                Daftar Penugasan Siswa
              </h2>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/assignments')}
              >
                Buka Manajemen Tugas
              </Button>
            </div>

            <div className="space-y-3">
              {subjectAssignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => navigate(`/assignments/${asg.id}`)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#142B50] hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{asg.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">{asg.description}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Batas Pengumpulan: {new Date(asg.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Lihat Tugas →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Ujian CBT */}
        {activeTab === 'ujian' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">
                Ujian Computer-Based Test (CBT)
              </h2>
            </div>

            <div className="space-y-3">
              {subjectExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{exam.title}</span>
                      <Badge variant="warning">Sedang Aktif</Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{exam.description}</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Durasi: {exam.durationMinutes} Menit • {exam.totalQuestions} Butir Soal • KKM: {exam.passingScore}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/exams/${exam.id}`)}
                  >
                    Masuk ke Ujian CBT
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Forum Diskusi */}
        {activeTab === 'diskusi' && (
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-slate-800">
              Forum Diskusi Kelas & Tanya Jawab
            </h2>

            {/* Input Form */}
            <form onSubmit={handleSendPost} className="flex gap-2">
              <input
                type="text"
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                placeholder="Tuliskan pertanyaan atau topik diskusi baru..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50]"
              />
              <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                Kirim
              </Button>
            </form>

            <div className="space-y-3 pt-3">
              {forumPosts.map((post) => (
                <div key={post.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{post.author}</span>
                      <Badge variant={post.role === 'Guru' ? 'primary' : 'default'} size="sm">
                        {post.role}
                      </Badge>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Siswa Terdaftar */}
        {activeTab === 'siswa' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800 mb-2">
              Daftar Peserta Didik ({classStudents.length} Siswa)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {classStudents.map((st) => (
                <div key={st.id} className="p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAF0F8] text-[#142B50] font-bold text-xs flex items-center justify-center">
                    {st.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">{st.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{st.identifierNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
