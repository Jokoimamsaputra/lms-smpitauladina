export type UserRole = 'admin' | 'guru' | 'siswa' | 'kepala' | 'orangtua';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  identifierNumber: string; // NIP or NISN or demo ID
  className?: string; // For students & parents
  classId?: string;
  subjectSpecialization?: string; // For teachers
  avatarUrl?: string;
  status: 'active' | 'inactive';
  phoneNumber?: string;
  childStudentId?: string; // For parents linking to student
}

export interface AcademicYear {
  id: string;
  year: string;
  semester: 'Ganjil' | 'Genap';
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface SchoolClass {
  id: string;
  name: string; // e.g. "X IPA 1", "XII RPL 2"
  grade: string; // "10", "11", "12", etc.
  educationLevel: 'SD' | 'SMP' | 'SMA' | 'SMK';
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  studentCount: number;
  academicYearId: string;
}

export interface Subject {
  id: string;
  name: string; // e.g. "Matematika Tingkat Lanjut", "Fisika", "Informatika"
  code: string;
  educationLevel: 'SD' | 'SMP' | 'SMA' | 'SMK';
  grade: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  description: string;
  bannerColor: string;
  scheduleDays: string; // e.g. "Senin, 08.00 - 09.30"
  room: string;
}

export interface DiscussionComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface LearningMaterial {
  id: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  title: string;
  chapter: string;
  meetingNumber: number;
  type: 'pdf' | 'video' | 'article' | 'presentation';
  summary: string;
  content: string;
  fileUrl?: string;
  videoUrl?: string;
  durationMinutes: number;
  publishedAt: string;
  isCompletedByStudent?: boolean;
  comments: DiscussionComment[];
}

export interface NationalBookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  pageNumber: number;
  previewSummary: string;
}

export interface NationalBook {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  educationLevel: 'SD' | 'SMP' | 'SMA' | 'SMK';
  grade: string;
  subject: string;
  curriculum: 'Kurikulum Merdeka' | 'Kurikulum 2013';
  publishYear: number;
  edition: string;
  coverImage: string;
  synopsis: string;
  isDigitalAvailable: boolean;
  totalPages: number;
  officialSourceUrl: string;
  chapters: NationalBookChapter[];
  samplePagesContent: { pageNumber: number; title: string; content: string }[];
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  teacherId: string;
  title: string;
  description: string;
  instructions: string[];
  dueDate: string;
  createdAt: string;
  maxScore: number;
  attachments?: { name: string; size: string; url: string }[];
  status: 'published' | 'draft';
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentNis: string;
  submittedAt: string;
  status: 'submitted' | 'late' | 'graded';
  fileAttachment?: { name: string; size: string; url: string };
  studentNotes?: string;
  score?: number;
  feedback?: string;
  gradedAt?: string;
  gradedByTeacherName?: string;
}

export interface CBTQuestion {
  id: string;
  number: number;
  type: 'multiple_choice' | 'complex_multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  questionText: string;
  codeSnippet?: string;
  imageUrl?: string;
  options?: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface CBTExam {
  id: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  startTime: string;
  endTime: string;
  questions: CBTQuestion[];
  isRandomized: boolean;
}

export interface StudentExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  answers: Record<string, string>; // questionId -> answerKey
  flaggedQuestionIds: string[];
  score: number;
  submittedAt: string;
  durationSpentSeconds: number;
  status: 'in_progress' | 'completed';
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentNis: string;
  classId: string;
  subjectId: string;
  subjectName: string;
  assignmentsAverage: number;
  quizAverage: number;
  midtermExam: number;
  finalExam: number;
  finalScore: number;
  letterGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  teacherNotes: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  classId: string;
  className: string;
  subjectId?: string;
  studentId: string;
  studentName: string;
  studentNis?: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alfa';
  checkInTime?: string;
  notes?: string;
}

export interface TeacherAttendanceRecord {
  id: string;
  date: string;
  teacherId: string;
  teacherName: string;
  teacherNip: string;
  subjectSpecialization?: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'hadir' | 'izin' | 'sakit' | 'dinas_luar' | 'alfa';
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'announcement' | 'assignment' | 'exam' | 'grade' | 'academic';
  timestamp: string;
  isRead: boolean;
  linkUrl?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sourceReferences?: { title: string; page?: number; curriculum?: string }[];
  suggestedFollowUps?: string[];
}

export interface AIGeneratedItem {
  id: string;
  type: 'modul_ajar' | 'materi' | 'soal_pg' | 'soal_esai' | 'rubrik' | 'kisi_kisi';
  title: string;
  subject: string;
  grade: string;
  topic: string;
  content: string;
  createdAt: string;
}

export interface SchoolProfile {
  name: string;
  npsn: string;
  address: string;
  accreditation: string;
  principalName: string;
  activeAcademicYear: string;
  activeSemester: 'Ganjil' | 'Genap';
}

export interface TeacherJournal {
  id: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  journalDate: string; // YYYY-MM-DD
  dayName: string;
  periodTime: string; // e.g. "Jam 1-2 (07.15 - 08.45)"
  materialTopic: string;
  activityDescription: string;
  learningMedia: string;
  presentCount: number;
  absentCount: number;
  attendanceNotes: string;
  notes?: string;
  status: 'selesai' | 'tertunda';
}

export interface CounselingSession {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  counselorName: string;
  date: string;
  category: 'akademik' | 'karir_kuliah' | 'pribadi' | 'sosial';
  issueSummary: string;
  agreementFollowUp: string;
  status: 'selesai' | 'terjadwal' | 'butuh_tindak_lanjut';
  isConfidential: boolean;
}

export interface StudentViolation {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  violationType: string;
  category: 'ringan' | 'sedang' | 'berat';
  points: number;
  sanctionFollowUp: string;
  reportedBy: string;
  status: 'tuntas' | 'dalam_pembinaan';
}

export interface StudentAchievement {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  title: string;
  category: 'akademik' | 'olahraga' | 'seni_budaya' | 'teknologi';
  level: 'sekolah' | 'kota_kab' | 'provinsi' | 'nasional' | 'internasional';
  rank: string;
  organizer: string;
  certificateNumber?: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  period: string; // e.g. "07.15 - 08.45 (Jam 1-2)"
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  room: string;
}
