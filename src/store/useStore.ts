import { create } from 'zustand';
import {
  User,
  UserRole,
  SchoolClass,
  Subject,
  LearningMaterial,
  NationalBook,
  Assignment,
  AssignmentSubmission,
  CBTExam,
  StudentExamAttempt,
  GradeRecord,
  AttendanceRecord,
  TeacherAttendanceRecord,
  NotificationItem,
  AIChatMessage,
  AIGeneratedItem,
  SchoolProfile,
  DiscussionComment,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_MATERIALS,
  INITIAL_BOOKS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_EXAMS,
  INITIAL_GRADES,
  INITIAL_ATTENDANCE,
  INITIAL_TEACHER_ATTENDANCE,
  INITIAL_NOTIFICATIONS,
  INITIAL_SCHOOL_PROFILE,
  INITIAL_AI_CHAT_STUDENT,
} from '../data/mockData';

interface AppState {
  // Current user
  currentUser: User;
  switchRole: (role: UserRole) => void;
  setCurrentUser: (user: User) => void;

  // School Profile
  schoolProfile: SchoolProfile;
  updateSchoolProfile: (profile: Partial<SchoolProfile>) => void;

  // Users Management
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Classes Management
  classes: SchoolClass[];
  addClass: (cls: Omit<SchoolClass, 'id'>) => void;
  updateClass: (id: string, updates: Partial<SchoolClass>) => void;
  deleteClass: (id: string) => void;

  // Subjects
  subjects: Subject[];
  addSubject: (subj: Omit<Subject, 'id'>) => void;

  // Materials
  materials: LearningMaterial[];
  addMaterial: (mat: Omit<LearningMaterial, 'id' | 'comments'>) => void;
  toggleMaterialCompleted: (id: string) => void;
  addMaterialComment: (materialId: string, comment: Omit<DiscussionComment, 'id' | 'createdAt'>) => void;

  // Books & Digital Reader
  books: NationalBook[];
  bookmarkedBookIds: string[];
  toggleBookmarkBook: (bookId: string) => void;

  // Assignments
  assignments: Assignment[];
  addAssignment: (asg: Omit<Assignment, 'id' | 'createdAt'>) => void;
  submissions: AssignmentSubmission[];
  submitAssignment: (assignmentId: string, studentNotes?: string, fileAttachment?: { name: string; size: string; url: string }) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;

  // Exams & CBT
  exams: CBTExam[];
  examAttempts: StudentExamAttempt[];
  submitExamAttempt: (attempt: Omit<StudentExamAttempt, 'id' | 'submittedAt'>) => void;

  // Grades
  grades: GradeRecord[];
  updateGradeRecord: (id: string, updates: Partial<GradeRecord>) => void;

  // Student Attendance
  attendance: AttendanceRecord[];
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  studentSelfCheckIn: (studentId: string, studentName: string, classId: string, className: string, studentNis: string) => void;

  // Teacher Attendance
  teacherAttendance: TeacherAttendanceRecord[];
  markTeacherAttendance: (record: Omit<TeacherAttendanceRecord, 'id'>) => void;
  teacherCheckIn: (teacherId: string, teacherName: string, teacherNip: string, subjectSpecialization?: string) => void;
  teacherCheckOut: (teacherId: string) => void;
  submitTeacherLeave: (teacherId: string, teacherName: string, teacherNip: string, status: 'izin' | 'sakit' | 'dinas_luar', notes: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // AI Chat & Generator
  aiStudentMessages: AIChatMessage[];
  sendStudentAIMessage: (text: string) => void;
  aiGeneratedItems: AIGeneratedItem[];
  addAIGeneratedItem: (item: Omit<AIGeneratedItem, 'id' | 'createdAt'>) => void;

  // Global Reset
  resetToDefaultData: () => void;
}

const STORAGE_KEY = 'ai_lms_state_v1';

const getInitialStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed reading localStorage, using defaults', err);
  }
  return null;
};

const savedData = getInitialStoredData();

export const useStore = create<AppState>((set, get) => ({
  currentUser: savedData?.currentUser || INITIAL_USERS[0], // default Admin
  schoolProfile: savedData?.schoolProfile || INITIAL_SCHOOL_PROFILE,
  users: savedData?.users || INITIAL_USERS,
  classes: savedData?.classes || INITIAL_CLASSES,
  subjects: savedData?.subjects || INITIAL_SUBJECTS,
  materials: savedData?.materials || INITIAL_MATERIALS,
  books: savedData?.books || INITIAL_BOOKS,
  bookmarkedBookIds: savedData?.bookmarkedBookIds || ['book-info-sma-11'],
  assignments: savedData?.assignments || INITIAL_ASSIGNMENTS,
  submissions: savedData?.submissions || INITIAL_SUBMISSIONS,
  exams: savedData?.exams || INITIAL_EXAMS,
  examAttempts: savedData?.examAttempts || [],
  grades: savedData?.grades || INITIAL_GRADES,
  attendance: savedData?.attendance || INITIAL_ATTENDANCE,
  teacherAttendance: savedData?.teacherAttendance || INITIAL_TEACHER_ATTENDANCE,
  notifications: savedData?.notifications || INITIAL_NOTIFICATIONS,
  aiStudentMessages: savedData?.aiStudentMessages || INITIAL_AI_CHAT_STUDENT,
  aiGeneratedItems: savedData?.aiGeneratedItems || [
    {
      id: 'gen-1',
      type: 'modul_ajar',
      title: 'Modul Ajar: Rekursi dan Dynamic Programming',
      subject: 'Informatika',
      grade: 'Kelas XI',
      topic: 'Strategi Algoritmik',
      content: 'Capaian Pembelajaran: Peserta didik mampu menganalisis permasalahan kompleks dan merancang solusi menggunakan fungsi rekursif optimal serta memoization.',
      createdAt: '2026-11-17T10:00:00Z',
    },
  ],

  switchRole: (role: UserRole) => {
    const matched = get().users.find((u) => u.role === role);
    if (matched) {
      set({ currentUser: matched });
      saveState(get());
    }
  },

  setCurrentUser: (user: User) => {
    set({ currentUser: user });
    saveState(get());
  },

  updateSchoolProfile: (profileUpdates) => {
    set((state) => ({
      schoolProfile: { ...state.schoolProfile, ...profileUpdates },
    }));
    saveState(get());
  },

  addUser: (newUser) => {
    const id = `user-${Date.now()}`;
    set((state) => ({
      users: [{ ...newUser, id }, ...state.users],
    }));
    saveState(get());
  },

  updateUser: (id, updates) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
      currentUser: state.currentUser.id === id ? { ...state.currentUser, ...updates } : state.currentUser,
    }));
    saveState(get());
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
    saveState(get());
  },

  addClass: (newClass) => {
    const id = `class-${Date.now()}`;
    set((state) => ({
      classes: [...state.classes, { ...newClass, id }],
    }));
    saveState(get());
  },

  updateClass: (id, updates) => {
    set((state) => ({
      classes: state.classes.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
    saveState(get());
  },

  deleteClass: (id) => {
    set((state) => ({
      classes: state.classes.filter((c) => c.id !== id),
    }));
    saveState(get());
  },

  addSubject: (newSubj) => {
    const id = `subj-${Date.now()}`;
    set((state) => ({
      subjects: [...state.subjects, { ...newSubj, id }],
    }));
    saveState(get());
  },

  addMaterial: (newMat) => {
    const id = `mat-${Date.now()}`;
    set((state) => ({
      materials: [{ ...newMat, id, comments: [] }, ...state.materials],
    }));
    saveState(get());
  },

  toggleMaterialCompleted: (id) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === id ? { ...m, isCompletedByStudent: !m.isCompletedByStudent } : m
      ),
    }));
    saveState(get());
  },

  addMaterialComment: (materialId, comment) => {
    const newComment: DiscussionComment = {
      ...comment,
      id: `comm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === materialId ? { ...m, comments: [...m.comments, newComment] } : m
      ),
    }));
    saveState(get());
  },

  toggleBookmarkBook: (bookId) => {
    set((state) => {
      const exists = state.bookmarkedBookIds.includes(bookId);
      const updated = exists
        ? state.bookmarkedBookIds.filter((id) => id !== bookId)
        : [...state.bookmarkedBookIds, bookId];
      return { bookmarkedBookIds: updated };
    });
    saveState(get());
  },

  addAssignment: (newAsg) => {
    const id = `asg-${Date.now()}`;
    set((state) => ({
      assignments: [
        { ...newAsg, id, createdAt: new Date().toISOString() },
        ...state.assignments,
      ],
    }));
    saveState(get());
  },

  submitAssignment: (assignmentId, studentNotes, fileAttachment) => {
    const { currentUser } = get();
    const id = `subm-${Date.now()}`;
    const newSubm: AssignmentSubmission = {
      id,
      assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentNis: currentUser.identifierNumber,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      studentNotes,
      fileAttachment: fileAttachment || {
        name: 'Jawaban_Tugas_Praktik.pdf',
        size: '1.2 MB',
        url: '#demo-download',
      },
    };

    set((state) => ({
      submissions: [newSubm, ...state.submissions.filter((s) => !(s.assignmentId === assignmentId && s.studentId === currentUser.id))],
    }));
    saveState(get());
  },

  gradeSubmission: (submissionId, score, feedback) => {
    const { currentUser } = get();
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              score,
              feedback,
              status: 'graded',
              gradedAt: new Date().toISOString(),
              gradedByTeacherName: currentUser.name,
            }
          : s
      ),
    }));
    saveState(get());
  },

  submitExamAttempt: (attempt) => {
    const id = `attempt-${Date.now()}`;
    const newAttempt: StudentExamAttempt = {
      ...attempt,
      id,
      submittedAt: new Date().toISOString(),
    };
    set((state) => ({
      examAttempts: [newAttempt, ...state.examAttempts],
    }));
    saveState(get());
  },

  updateGradeRecord: (id, updates) => {
    set((state) => ({
      grades: state.grades.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    }));
    saveState(get());
  },

  markAttendance: (record) => {
    const id = `att-${Date.now()}`;
    set((state) => ({
      attendance: [{ ...record, id }, ...state.attendance.filter((a) => !(a.studentId === record.studentId && a.date === record.date))],
    }));
    saveState(get());
  },

  studentSelfCheckIn: (studentId, studentName, classId, className, studentNis) => {
    const today = new Date().toISOString().split('T')[0];
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const checkInTime = `${nowHours.toString().padStart(2, '0')}.${nowMinutes.toString().padStart(2, '0')} WIB`;
    const id = `att-${Date.now()}`;

    const newRecord: AttendanceRecord = {
      id,
      date: today,
      classId,
      className,
      studentId,
      studentName,
      studentNis,
      status: 'hadir',
      checkInTime,
      notes: nowHours >= 7 && nowMinutes > 0 ? 'Terlambat Masuk' : 'Tepat Waktu',
    };

    set((state) => ({
      attendance: [newRecord, ...state.attendance.filter((a) => !(a.studentId === studentId && a.date === today))],
    }));
    saveState(get());
  },

  markTeacherAttendance: (record) => {
    const id = `t-att-${Date.now()}`;
    set((state) => ({
      teacherAttendance: [{ ...record, id }, ...state.teacherAttendance.filter((t) => !(t.teacherId === record.teacherId && t.date === record.date))],
    }));
    saveState(get());
  },

  teacherCheckIn: (teacherId, teacherName, teacherNip, subjectSpecialization) => {
    const today = new Date().toISOString().split('T')[0];
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const checkInTime = `${nowHours.toString().padStart(2, '0')}.${nowMinutes.toString().padStart(2, '0')} WIB`;
    const id = `t-att-${Date.now()}`;

    const newRecord: TeacherAttendanceRecord = {
      id,
      date: today,
      teacherId,
      teacherName,
      teacherNip,
      subjectSpecialization,
      status: 'hadir',
      checkInTime,
      notes: nowHours >= 7 && nowMinutes > 0 ? 'Terlambat Masuk' : 'Hadir Tepat Waktu',
    };

    set((state) => ({
      teacherAttendance: [newRecord, ...state.teacherAttendance.filter((t) => !(t.teacherId === teacherId && t.date === today))],
    }));
    saveState(get());
  },

  teacherCheckOut: (teacherId) => {
    const today = new Date().toISOString().split('T')[0];
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const checkOutTime = `${nowHours.toString().padStart(2, '0')}.${nowMinutes.toString().padStart(2, '0')} WIB`;

    set((state) => ({
      teacherAttendance: state.teacherAttendance.map((t) =>
        t.teacherId === teacherId && t.date === today
          ? { ...t, checkOutTime }
          : t
      ),
    }));
    saveState(get());
  },

  submitTeacherLeave: (teacherId, teacherName, teacherNip, status, notes) => {
    const today = new Date().toISOString().split('T')[0];
    const id = `t-att-${Date.now()}`;

    const newRecord: TeacherAttendanceRecord = {
      id,
      date: today,
      teacherId,
      teacherName,
      teacherNip,
      status,
      notes,
    };

    set((state) => ({
      teacherAttendance: [newRecord, ...state.teacherAttendance.filter((t) => !(t.teacherId === teacherId && t.date === today))],
    }));
    saveState(get());
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    }));
    saveState(get());
  },

  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    }));
    saveState(get());
  },

  sendStudentAIMessage: (text) => {
    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    // Realistic pedagogical AI answers in Indonesian
    let assistantReply = '';
    let sources: { title: string; page?: number; curriculum?: string }[] = [];
    let followUps: string[] = [];

    const lower = text.toLowerCase();
    if (lower.includes('binary search') || lower.includes('linear search')) {
      assistantReply = `Mari kita bandingkan kedua algoritma pencarian tersebut dengan analogi buku telepon:

1. **Linear Search (Pencarian Sekuensial)**:
Bayangkan kamu mencari nama seseorang dengan membaca buku telepon dari halaman 1, baris demi baris hingga halaman terakhir.
- **Efisiensi**: Jika ada 1.000 halaman, kamu mungkin butuh hingga 1.000 kali pemeriksaan (O(n)).
- **Syarat**: Bekerja pada data acak maupun terurut.

2. **Binary Search (Pencarian Biner)**:
Buku telepon sudah terurut secara alfabetis. Kamu langsung membuka halaman tengah:
- Jika nama yang dicari berawalan 'M' dan halaman tengah berhuruf 'P', kamu langsung mengabaikan setengah buku bagian belakang.
- Kamu ulangi membagi dua sisa halaman tersebut.
- **Efisiensi**: Untuk 1.024 nama, hanya butuh maksimal 10 atau 11 langkah perbandingan (O(log n)).
- **Syarat Mutlak**: Kumpulan data harus sudah terurut.`;
      sources = [
        { title: 'Informatika SMA Kelas XI - Bab 1', page: 26, curriculum: 'Kurikulum Merdeka' },
      ];
      followUps = [
        'Bagaimana cara mengimplementasikan Binary Search secara rekursif?',
        'Mengapa Binary Search tidak cocok untuk struktur data Linked List?',
      ];
    } else if (lower.includes('polinomial') || lower.includes('horner')) {
      assistantReply = `Berikut rangkuman konsep inti Polinomial dan metode Horner:

- **Bentuk Umum**: P(x) = an*x^n + an-1*x^(n-1) + ... + a1*x + a0.
- **Metode Horner**:
1. Tuliskan koefisien secara berurutan mulai dari derajat tertinggi hingga suku konstanta (jangan lewatkan suku bernilai 0).
2. Turunkan koefisien pertama ke baris hasil.
3. Kalikan dengan nilai x = k, letakkan di bawah koefisien berikutnya, lalu jumlahkan ke bawah.
4. Nilai paling ujung kanan adalah sisa pembagian S = P(k).`;
      sources = [
        { title: 'Matematika Tingkat Lanjut SMA Kelas XI - Bab 1', page: 12, curriculum: 'Kurikulum Merdeka' },
      ];
      followUps = [
        'Berikan contoh soal pembagian polinomial berderajat 3 dengan metode Horner',
        'Bagaimana membuktikan Teorema Sisa secara aljabar?',
      ];
    } else {
      assistantReply = `Pertanyaan yang sangat menarik mengenai "${text}".

Dalam konteks kurikulum pembelajaran SMA, pemahaman konsep ini dapat kita telaah melalui pendekatan bertahap:
1. **Identifikasi Konsep Dasar**: Perhatikan prinsip fundamental yang melandasi fenomena atau formula tersebut.
2. **Keterkaitan Antarvariabel**: Amati bagaimana perubahan satu parameter memengaruhi hasil akhir.
3. **Penerapan Nyata**: Kaitkan rumus atau teori ini dengan studi kasus praktis di bidang teknologi atau sains sehari-hari.

Apakah kamu ingin kita coba kerjakan satu latihan soal terkait topik ini bersama?`;
      sources = [
        { title: 'Katalog Referensi Buku Kemendikdasmen RI', curriculum: 'Kurikulum Merdeka' },
      ];
      followUps = [
        'Buatkan latihan soal singkat mengenai topik ini',
        'Bantu jelaskan rumus turunan rumusnya dengan bahasa yang lebih santai',
      ];
    }

    const aiMsg: AIChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant',
      content: assistantReply,
      timestamp: new Date().toISOString(),
      sourceReferences: sources,
      suggestedFollowUps: followUps,
    };

    set((state) => ({
      aiStudentMessages: [...state.aiStudentMessages, userMsg, aiMsg],
    }));
    saveState(get());
  },

  addAIGeneratedItem: (item) => {
    const id = `gen-${Date.now()}`;
    set((state) => ({
      aiGeneratedItems: [
        { ...item, id, createdAt: new Date().toISOString() },
        ...state.aiGeneratedItems,
      ],
    }));
    saveState(get());
  },

  resetToDefaultData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      currentUser: INITIAL_USERS[0],
      schoolProfile: INITIAL_SCHOOL_PROFILE,
      users: INITIAL_USERS,
      classes: INITIAL_CLASSES,
      subjects: INITIAL_SUBJECTS,
      materials: INITIAL_MATERIALS,
      books: INITIAL_BOOKS,
      bookmarkedBookIds: ['book-info-sma-11'],
      assignments: INITIAL_ASSIGNMENTS,
      submissions: INITIAL_SUBMISSIONS,
      exams: INITIAL_EXAMS,
      examAttempts: [],
      grades: INITIAL_GRADES,
      attendance: INITIAL_ATTENDANCE,
      teacherAttendance: INITIAL_TEACHER_ATTENDANCE,
      notifications: INITIAL_NOTIFICATIONS,
      aiStudentMessages: INITIAL_AI_CHAT_STUDENT,
      aiGeneratedItems: [
        {
          id: 'gen-1',
          type: 'modul_ajar',
          title: 'Modul Ajar: Rekursi dan Dynamic Programming',
          subject: 'Informatika',
          grade: 'Kelas XI',
          topic: 'Strategi Algoritmik',
          content: 'Capaian Pembelajaran: Peserta didik mampu menganalisis permasalahan kompleks dan merancang solusi menggunakan fungsi rekursif optimal serta memoization.',
          createdAt: '2026-11-17T10:00:00Z',
        },
      ],
    });
  },
}));

function saveState(state: AppState) {
  try {
    const toSave = {
      currentUser: state.currentUser,
      schoolProfile: state.schoolProfile,
      users: state.users,
      classes: state.classes,
      subjects: state.subjects,
      materials: state.materials,
      books: state.books,
      bookmarkedBookIds: state.bookmarkedBookIds,
      assignments: state.assignments,
      submissions: state.submissions,
      exams: state.exams,
      examAttempts: state.examAttempts,
      grades: state.grades,
      attendance: state.attendance,
      teacherAttendance: state.teacherAttendance,
      notifications: state.notifications,
      aiStudentMessages: state.aiStudentMessages,
      aiGeneratedItems: state.aiGeneratedItems,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.warn('Failed saving state to localStorage', err);
  }
}
