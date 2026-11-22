import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldAlert,
  Trophy,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Trash2,
  Calendar,
  Sparkles,
  Award,
  Medal,
  ChevronRight,
  Shield,
  Send,
  Lock,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CounselingSession, StudentViolation, StudentAchievement } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const CounselingPage: React.FC = () => {
  const {
    currentUser,
    users,
    classes,
    counselingSessions,
    addCounselingSession,
    deleteCounselingSession,
    violations,
    addViolation,
    deleteViolation,
    achievements,
    addAchievement,
    deleteAchievement,
  } = useStore();

  const isStudent = currentUser.role === 'siswa';
  const isParent = currentUser.role === 'orangtua';
  const isStaff = currentUser.role === 'guru' || currentUser.role === 'admin' || currentUser.role === 'kepala';

  const [activeTab, setActiveTab] = useState<'konseling' | 'pelanggaran' | 'prestasi'>(
    isStudent || isParent ? 'prestasi' : 'konseling'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals state
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  // Students list
  const students = users.filter((u) => u.role === 'siswa');

  // Form states - Counseling
  const [counselingForm, setCounselingForm] = useState({
    studentId: isStudent ? currentUser.id : students[0]?.id || '',
    studentName: isStudent ? currentUser.name : students[0]?.name || '',
    className: isStudent ? (currentUser.classId || 'IX JavaScript') : 'IX JavaScript',
    counselorName: 'Dra. Endang Sulastri (Koordinator BK)',
    date: new Date().toISOString().split('T')[0],
    category: 'akademik' as 'akademik' | 'karir_kuliah' | 'pribadi' | 'sosial',
    issueSummary: '',
    agreementFollowUp: '',
    status: 'terjadwal' as 'selesai' | 'terjadwal' | 'butuh_tindak_lanjut',
    isConfidential: true,
  });

  // Form states - Violation
  const [violationForm, setViolationForm] = useState({
    studentId: students[0]?.id || '',
    studentName: students[0]?.name || '',
    className: 'IX JavaScript',
    date: new Date().toISOString().split('T')[0],
    violationType: '',
    category: 'ringan' as 'ringan' | 'sedang' | 'berat',
    points: 5,
    sanctionFollowUp: '',
    reportedBy: currentUser.name,
    status: 'dalam_pembinaan' as 'tuntas' | 'dalam_pembinaan',
  });

  // Form states - Achievement
  const [achievementForm, setAchievementForm] = useState({
    studentId: students[0]?.id || '',
    studentName: students[0]?.name || '',
    className: 'IX JavaScript',
    date: new Date().toISOString().split('T')[0],
    title: '',
    category: 'akademik' as 'akademik' | 'olahraga' | 'seni_budaya' | 'teknologi',
    level: 'nasional' as 'sekolah' | 'kota_kab' | 'provinsi' | 'nasional' | 'internasional',
    rank: 'Juara 1',
    organizer: '',
    certificateNumber: '',
  });

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filtered lists
  const filteredCounseling = counselingSessions.filter((s) => {
    if (isStudent && s.studentId !== currentUser.id) return false;
    if (filterCategory !== 'all' && s.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.studentName.toLowerCase().includes(q) ||
        s.issueSummary.toLowerCase().includes(q) ||
        s.counselorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredViolations = violations.filter((v) => {
    if (isStudent && v.studentId !== currentUser.id) return false;
    if (filterCategory !== 'all' && v.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        v.studentName.toLowerCase().includes(q) ||
        v.violationType.toLowerCase().includes(q) ||
        v.sanctionFollowUp.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredAchievements = achievements.filter((a) => {
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.studentName.toLowerCase().includes(q) ||
        a.organizer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handlers
  const handleSaveCounseling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselingForm.issueSummary.trim()) {
      alert('Mohon isi pokok bahasan / ringkasan sesi konseling.');
      return;
    }

    const selectedStudent = students.find((s) => s.id === counselingForm.studentId);
    addCounselingSession({
      ...counselingForm,
      studentName: selectedStudent ? selectedStudent.name : counselingForm.studentName,
      className: selectedStudent?.classId || counselingForm.className,
    });

    setIsCounselingModalOpen(false);
    showNotification('Sesi konseling bimbingan berhasil dicatat ke sistem.');
    setCounselingForm({
      studentId: students[0]?.id || '',
      studentName: students[0]?.name || '',
      className: 'IX JavaScript',
      counselorName: 'Dra. Endang Sulastri (Koordinator BK)',
      date: new Date().toISOString().split('T')[0],
      category: 'akademik',
      issueSummary: '',
      agreementFollowUp: '',
      status: 'terjadwal',
      isConfidential: true,
    });
  };

  const handleSaveViolation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!violationForm.violationType.trim()) {
      alert('Mohon isi uraian pelanggaran tata tertib.');
      return;
    }

    const selectedStudent = students.find((s) => s.id === violationForm.studentId);
    addViolation({
      ...violationForm,
      studentName: selectedStudent ? selectedStudent.name : violationForm.studentName,
      className: selectedStudent?.classId || violationForm.className,
    });

    setIsViolationModalOpen(false);
    showNotification('Catatan pelanggaran kedisiplinan dan poin sanksi berhasil disimpan.');
    setViolationForm({
      studentId: students[0]?.id || '',
      studentName: students[0]?.name || '',
      className: 'IX JavaScript',
      date: new Date().toISOString().split('T')[0],
      violationType: '',
      category: 'ringan',
      points: 5,
      sanctionFollowUp: '',
      reportedBy: currentUser.name,
      status: 'dalam_pembinaan',
    });
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achievementForm.title.trim() || !achievementForm.organizer.trim()) {
      alert('Mohon lengkapi judul prestasi dan penyelenggara lomba.');
      return;
    }

    const selectedStudent = students.find((s) => s.id === achievementForm.studentId);
    addAchievement({
      ...achievementForm,
      studentName: selectedStudent ? selectedStudent.name : achievementForm.studentName,
      className: selectedStudent?.classId || achievementForm.className,
    });

    setIsAchievementModalOpen(false);
    showNotification('Data prestasi siswa berhasil dipublikasikan ke galeri sekolah.');
    setAchievementForm({
      studentId: students[0]?.id || '',
      studentName: students[0]?.name || '',
      className: 'IX JavaScript',
      date: new Date().toISOString().split('T')[0],
      title: '',
      category: 'akademik',
      level: 'nasional',
      rank: 'Juara 1',
      organizer: '',
      certificateNumber: '',
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Portal Akademik', href: '/' },
          { label: 'Bimbingan Konseling & Prestasi' },
        ]}
      />

      {/* Notification Toast */}
      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center space-x-3 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#142B50] tracking-tight">
              {isStudent
                ? 'Pusat Prestasi & Bimbingan Siswa'
                : 'Bimbingan Konseling, Disiplin & Prestasi'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#142B50]/10 text-[#142B50]">
              SMP IT Auladina Indonesia QIIBS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isStudent
              ? 'Ruang aman konsultasi akademik & karir serta etalase kebanggaan piagam prestasi.'
              : 'Manajemen terpadu sesi konseling BK, inventarisasi kedisiplinan siswa, dan database prestasi resmi.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {isStudent && (
            <Button
              variant="primary"
              className="bg-[#142B50] hover:bg-[#0E1E38] text-xs font-bold rounded-xl flex items-center gap-1.5 min-h-[44px]"
              onClick={() => setIsCounselingModalOpen(true)}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Ajukan Konseling BK</span>
            </Button>
          )}

          {isStaff && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {activeTab === 'konseling' && (
                <Button
                  variant="primary"
                  className="bg-[#142B50] hover:bg-[#0E1E38] text-xs font-bold rounded-xl flex items-center gap-1.5 min-h-[44px]"
                  onClick={() => setIsCounselingModalOpen(true)}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Catat Sesi Konseling</span>
                </Button>
              )}
              {activeTab === 'pelanggaran' && (
                <Button
                  variant="primary"
                  className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 min-h-[44px]"
                  onClick={() => setIsViolationModalOpen(true)}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Catat Pelanggaran</span>
                </Button>
              )}
              {activeTab === 'prestasi' && (
                <Button
                  variant="primary"
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 min-h-[44px]"
                  onClick={() => setIsAchievementModalOpen(true)}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Input Prestasi Siswa</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1">
          {(!isStudent || currentUser.role === 'siswa') && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('konseling');
                setFilterCategory('all');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap min-h-[44px] ${
                activeTab === 'konseling'
                  ? 'bg-[#142B50] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Sesi Konseling ({filteredCounseling.length})</span>
            </button>
          )}

          {!isStudent && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('pelanggaran');
                setFilterCategory('all');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap min-h-[44px] ${
                activeTab === 'pelanggaran'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Tata Tertib & Poin Disiplin ({violations.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setActiveTab('prestasi');
              setFilterCategory('all');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap min-h-[44px] ${
              activeTab === 'prestasi'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Galeri Prestasi Siswa ({achievements.length})</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium px-3 hidden lg:block">
          Guru Pembimbing BK: <strong className="text-slate-700">Dra. Endang Sulastri</strong>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === 'konseling'
                ? 'Cari nama siswa atau topik konseling...'
                : activeTab === 'pelanggaran'
                ? 'Cari pelanggaran atau nama siswa...'
                : 'Cari judul prestasi atau kejuaraan...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20 focus:border-[#142B50]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
          >
            <option value="all">Semua Kategori</option>
            {activeTab === 'konseling' && (
              <>
                <option value="akademik">Akademik & Studi</option>
                <option value="karir_kuliah">Karir & Kuliah PTN</option>
                <option value="pribadi">Pribadi & Emosional</option>
                <option value="sosial">Sosial & Pertemanan</option>
              </>
            )}
            {activeTab === 'pelanggaran' && (
              <>
                <option value="ringan">Tingkat Ringan (1-10 Poin)</option>
                <option value="sedang">Tingkat Sedang (11-25 Poin)</option>
                <option value="berat">Tingkat Berat (26+ Poin)</option>
              </>
            )}
            {activeTab === 'prestasi' && (
              <>
                <option value="akademik">Olimpiade & Sains</option>
                <option value="teknologi">Teknologi & Robotik</option>
                <option value="olahraga">Olahraga & Atletik</option>
                <option value="seni_budaya">Seni & Budaya</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* TAB 1: SESI KONSELING */}
      {activeTab === 'konseling' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">{filteredCounseling.length}</div>
                  <div className="text-xs text-slate-500 font-medium">Total Sesi Bimbingan</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">
                    {filteredCounseling.filter((s) => s.status === 'selesai').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Konseling Tuntas</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">
                    {filteredCounseling.filter((s) => s.status !== 'selesai').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Terjadwal / Tindak Lanjut</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCounseling.length > 0 ? (
              filteredCounseling.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#142B50]/30 transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-slate-900">
                        {item.studentName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {item.className}
                      </span>
                      {item.isConfidential && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Rahasia</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono">{item.date}</span>
                      <Badge
                        variant={
                          item.status === 'selesai'
                            ? 'success'
                            : item.status === 'butuh_tindak_lanjut'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {item.status === 'selesai'
                          ? 'Selesai'
                          : item.status === 'butuh_tindak_lanjut'
                          ? 'Butuh Tindak Lanjut'
                          : 'Terjadwal'}
                      </Badge>
                      {isStaff && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Hapus riwayat sesi konseling ini?')) {
                              deleteCounselingSession(item.id);
                              showNotification('Sesi konseling berhasil dihapus.');
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div className="font-bold text-[#142B50] mb-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Pokok Masalah / Topik Konseling:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{item.issueSummary}</p>
                    </div>

                    <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200/60">
                      <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        <span>Kesepakatan & Rencana Tindak Lanjut:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{item.agreementFollowUp}</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>
                      Guru Pembimbing BK: <strong className="text-slate-700">{item.counselorName}</strong>
                    </span>
                    <span className="capitalize font-semibold text-[#142B50]">
                      Kategori: {item.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-10 text-center rounded-2xl border border-slate-200/90 text-slate-400">
                <HeartHandshake className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="font-semibold text-sm">Belum ada riwayat sesi bimbingan konseling.</p>
                <p className="text-xs mt-1">Ajukan sesi konseling untuk bimbingan studi atau minat bakat.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PELANGGARAN & POIN DISIPLIN */}
      {activeTab === 'pelanggaran' && !isStudent && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Buku Catatan Pelanggaran Tata Tertib & Akumulasi Poin
                </h3>
                <p className="text-xs text-slate-500">
                  Sistem monitoring kedisiplinan berkarakter untuk pembinaan peserta didik SMP IT Auladina Indonesia QIIBS.
                </p>
              </div>
              <div className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                Total: {filteredViolations.length} Kasus
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-4 py-3.5">Tanggal</th>
                    <th className="px-4 py-3.5">Nama Siswa</th>
                    <th className="px-4 py-3.5">Kelas</th>
                    <th className="px-4 py-3.5">Bentuk Pelanggaran</th>
                    <th className="px-4 py-3.5 text-center">Bobot Poin</th>
                    <th className="px-4 py-3.5">Sanksi & Tindak Lanjut</th>
                    <th className="px-4 py-3.5 text-center">Status</th>
                    <th className="px-4 py-3.5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredViolations.length > 0 ? (
                    filteredViolations.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-4 py-3.5 font-mono text-slate-600">{v.date}</td>
                        <td className="px-4 py-3.5 font-bold text-slate-900">{v.studentName}</td>
                        <td className="px-4 py-3.5 font-medium text-slate-700">{v.className}</td>
                        <td className="px-4 py-3.5 text-slate-800 font-medium">{v.violationType}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-md font-bold text-[11px] border ${
                              v.category === 'berat'
                                ? 'bg-rose-100 text-rose-800 border-rose-300'
                                : v.category === 'sedang'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            +{v.points} Poin
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-600 max-w-xs">{v.sanctionFollowUp}</td>
                        <td className="px-4 py-3.5 text-center">
                          <Badge variant={v.status === 'tuntas' ? 'success' : 'warning'}>
                            {v.status === 'tuntas' ? 'Tuntas' : 'Dalam Pembinaan'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Hapus catatan pelanggaran ini?')) {
                                deleteViolation(v.id);
                                showNotification('Catatan pelanggaran telah dihapus.');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-slate-400">
                        Tidak ada catatan pelanggaran kedisiplinan yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GALERI PRESTASI */}
      {activeTab === 'prestasi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.length > 0 ? (
              filteredAchievements.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        item.level === 'internasional'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : item.level === 'nasional'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : item.level === 'provinsi'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      Tingkat {item.level}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-200 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        <span className="text-amber-700 font-bold">{item.rank}</span> &bull;{' '}
                        <span className="text-slate-900 font-bold">{item.studentName}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.className} &bull; Penyelenggara: {item.organizer}
                      </p>
                      {item.certificateNumber && (
                        <p className="text-[10px] text-slate-400 font-mono mt-1">
                          No. Piagam: {item.certificateNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {isStaff && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Hapus data prestasi ini?')) {
                            deleteAchievement(item.id);
                            showNotification('Data prestasi berhasil dihapus.');
                          }
                        }}
                        className="text-xs text-slate-400 hover:text-rose-600 font-medium transition inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-white p-10 text-center rounded-2xl border border-slate-200/90 text-slate-400">
                <Trophy className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="font-semibold text-sm">Belum ada prestasi yang dicatat pada filter ini.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Tambah Sesi Konseling */}
      <Modal
        isOpen={isCounselingModalOpen}
        onClose={() => setIsCounselingModalOpen(false)}
        title={isStudent ? 'Pengajuan Bimbingan Konseling' : 'Tambah Catatan Konseling BK'}
      >
        <form onSubmit={handleSaveCounseling} className="space-y-4">
          {!isStudent && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pilih Peserta Didik
              </label>
              <select
                value={counselingForm.studentId}
                onChange={(e) => {
                  const s = students.find((item) => item.id === e.target.value);
                  setCounselingForm({
                    ...counselingForm,
                    studentId: e.target.value,
                    studentName: s?.name || '',
                    className: s?.classId || 'IX JavaScript',
                  });
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.classId || 'IX JavaScript'})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal Sesi
              </label>
              <input
                type="date"
                value={counselingForm.date}
                onChange={(e) => setCounselingForm({ ...counselingForm, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Konseling
              </label>
              <select
                value={counselingForm.category}
                onChange={(e) =>
                  setCounselingForm({
                    ...counselingForm,
                    category: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                <option value="akademik">Akademik & Gaya Belajar</option>
                <option value="karir_kuliah">Karir & Seleksi PTN</option>
                <option value="pribadi">Pribadi & Karakter</option>
                <option value="sosial">Sosial & Adaptasi Lingkungan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Topik / Pokok Bahasan Masalah
            </label>
            <textarea
              rows={3}
              value={counselingForm.issueSummary}
              onChange={(e) => setCounselingForm({ ...counselingForm, issueSummary: e.target.value })}
              placeholder="Jelaskan pokok hal yang dikonsultasikan secara jelas..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kesepakatan & Solusi Tindak Lanjut
            </label>
            <textarea
              rows={2}
              value={counselingForm.agreementFollowUp}
              onChange={(e) =>
                setCounselingForm({ ...counselingForm, agreementFollowUp: e.target.value })
              }
              placeholder="Rencana aksi yang disepakati bersama..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={counselingForm.isConfidential}
                onChange={(e) =>
                  setCounselingForm({ ...counselingForm, isConfidential: e.target.checked })
                }
                className="rounded border-slate-300 text-[#142B50] focus:ring-[#142B50]"
              />
              <span>Tandai sebagai sesi rahasia (Confidential)</span>
            </label>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="text-xs"
                onClick={() => setIsCounselingModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="primary" className="bg-[#142B50] text-xs">
                Simpan Sesi
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal: Catat Pelanggaran */}
      <Modal
        isOpen={isViolationModalOpen}
        onClose={() => setIsViolationModalOpen(false)}
        title="Catat Pelanggaran Tata Tertib"
      >
        <form onSubmit={handleSaveViolation} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pilih Peserta Didik
            </label>
            <select
              value={violationForm.studentId}
              onChange={(e) => {
                const s = students.find((item) => item.id === e.target.value);
                setViolationForm({
                  ...violationForm,
                  studentId: e.target.value,
                  studentName: s?.name || '',
                  className: s?.classId || 'IX JavaScript',
                });
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.classId || 'IX JavaScript'})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal Pelanggaran
              </label>
              <input
                type="date"
                value={violationForm.date}
                onChange={(e) => setViolationForm({ ...violationForm, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Sanksi
              </label>
              <select
                value={violationForm.category}
                onChange={(e) => {
                  const cat = e.target.value as 'ringan' | 'sedang' | 'berat';
                  const pts = cat === 'ringan' ? 5 : cat === 'sedang' ? 15 : 30;
                  setViolationForm({
                    ...violationForm,
                    category: cat,
                    points: pts,
                  });
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                <option value="ringan">Ringan (5 Poin)</option>
                <option value="sedang">Sedang (15 Poin)</option>
                <option value="berat">Berat (30 Poin)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Uraian Pelanggaran Tata Tertib
            </label>
            <input
              type="text"
              value={violationForm.violationType}
              onChange={(e) =>
                setViolationForm({ ...violationForm, violationType: e.target.value })
              }
              placeholder="Contoh: Terlambat masuk KBM jam pertama tanpa keterangan"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tindakan Pembinaan Karakter
            </label>
            <textarea
              rows={2}
              value={violationForm.sanctionFollowUp}
              onChange={(e) =>
                setViolationForm({ ...violationForm, sanctionFollowUp: e.target.value })
              }
              placeholder="Contoh: Teguran lisan, tugas literasi di perpustakaan, komitmen hadir tepat waktu..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="text-xs"
              onClick={() => setIsViolationModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" className="bg-rose-700 text-xs">
              Simpan Pelanggaran
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Input Prestasi Siswa */}
      <Modal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
        title="Input Prestasi & Piagam Siswa"
      >
        <form onSubmit={handleSaveAchievement} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pilih Peserta Didik Berprestasi
            </label>
            <select
              value={achievementForm.studentId}
              onChange={(e) => {
                const s = students.find((item) => item.id === e.target.value);
                setAchievementForm({
                  ...achievementForm,
                  studentId: e.target.value,
                  studentName: s?.name || '',
                  className: s?.classId || 'IX JavaScript',
                });
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.classId || 'IX JavaScript'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Kompetisi / Piagam Prestasi
            </label>
            <input
              type="text"
              value={achievementForm.title}
              onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
              placeholder="Contoh: Juara 1 Olimpiade Sains Nasional (OSN) Bidang Fisika"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bidang / Kategori
              </label>
              <select
                value={achievementForm.category}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    category: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                <option value="akademik">Akademik / Sains</option>
                <option value="teknologi">Teknologi / Coding</option>
                <option value="olahraga">Olahraga</option>
                <option value="seni_budaya">Seni & Budaya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kejuaraan
              </label>
              <select
                value={achievementForm.level}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    level: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              >
                <option value="sekolah">Sekolah</option>
                <option value="kota_kab">Kota / Kabupaten</option>
                <option value="provinsi">Provinsi</option>
                <option value="nasional">Nasional</option>
                <option value="internasional">Internasional</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Peringkat Juara
              </label>
              <input
                type="text"
                value={achievementForm.rank}
                onChange={(e) => setAchievementForm({ ...achievementForm, rank: e.target.value })}
                placeholder="Contoh: Juara 1 / Medali Emas"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lembaga Penyelenggara
              </label>
              <input
                type="text"
                value={achievementForm.organizer}
                onChange={(e) =>
                  setAchievementForm({ ...achievementForm, organizer: e.target.value })
                }
                placeholder="Contoh: Kemendikdasmen RI / Puspresnas"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor Piagam / Sertifikat
              </label>
              <input
                type="text"
                value={achievementForm.certificateNumber}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    certificateNumber: e.target.value,
                  })
                }
                placeholder="Contoh: 1482/OSN-SM/2026"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142B50]/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="text-xs"
              onClick={() => setIsAchievementModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" className="bg-amber-600 text-xs">
              Simpan Prestasi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
