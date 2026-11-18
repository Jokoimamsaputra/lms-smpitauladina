import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { TeacherDashboard } from './pages/dashboard/TeacherDashboard';
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { PrincipalDashboard } from './pages/dashboard/PrincipalDashboard';
import { ParentDashboard } from './pages/dashboard/ParentDashboard';

import { UserManagementPage } from './pages/users/UserManagementPage';
import { ClassManagementPage } from './pages/classes/ClassManagementPage';
import { CurriculumPage } from './pages/curriculum/CurriculumPage';

import { BookCatalogPage } from './pages/library/BookCatalogPage';
import { BookDetailPage } from './pages/library/BookDetailPage';
import { DigitalReaderPage } from './pages/library/DigitalReaderPage';

import { VirtualClassPage } from './pages/learning/VirtualClassPage';
import { SubjectDetailPage } from './pages/learning/SubjectDetailPage';
import { MaterialDetailPage } from './pages/learning/MaterialDetailPage';

import { AILearningAssistantPage } from './pages/ai/AILearningAssistantPage';
import { AITeachingAssistantPage } from './pages/ai/AITeachingAssistantPage';

import { AssignmentListPage } from './pages/assignments/AssignmentListPage';
import { AssignmentDetailPage } from './pages/assignments/AssignmentDetailPage';

import { ExamListPage } from './pages/exams/ExamListPage';
import { CBTExamPage } from './pages/exams/CBTExamPage';
import { ExamResultPage } from './pages/exams/ExamResultPage';
import { QuestionBankPage } from './pages/exams/QuestionBankPage';

import { GradebookPage } from './pages/grades/GradebookPage';
import { DigitalReportPage } from './pages/grades/DigitalReportPage';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { LearningAnalyticsPage } from './pages/analytics/LearningAnalyticsPage';
import { NotificationPage } from './pages/notifications/NotificationPage';
import { SettingsPage } from './pages/settings/SettingsPage';

// School Operational Pages (Adopted from lms-techsoe-sdn9 for real daily school use)
import { TeacherJournalPage } from './pages/journal/TeacherJournalPage';
import { CounselingPage } from './pages/counseling/CounselingPage';
import { SchedulePage } from './pages/schedule/SchedulePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Landing Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Fullscreen Dedicated Viewers */}
        <Route path="/reader/:bookId" element={<DigitalReaderPage />} />
        <Route path="/exams/:examId" element={<CBTExamPage />} />

        {/* LMS Application Shell */}
        <Route element={<AppLayout />}>
          {/* Dashboards */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />

          {/* Academic & User Management */}
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/classes" element={<ClassManagementPage />} />
          <Route path="/admin/curriculum" element={<CurriculumPage />} />

          {/* Books & Library */}
          <Route path="/books" element={<BookCatalogPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />

          {/* Virtual Classes & Lessons */}
          <Route path="/virtual-classes" element={<VirtualClassPage />} />
          <Route path="/subjects/:subjectId" element={<SubjectDetailPage />} />
          <Route path="/materials/:materialId" element={<MaterialDetailPage />} />

          {/* AI Features */}
          <Route path="/ai/assistant" element={<AILearningAssistantPage />} />
          <Route path="/ai/teaching" element={<AITeachingAssistantPage />} />

          {/* Assignments */}
          <Route path="/assignments" element={<AssignmentListPage />} />
          <Route path="/assignments/:assignmentId" element={<AssignmentDetailPage />} />

          {/* Examinations & CBT */}
          <Route path="/exams" element={<ExamListPage />} />
          <Route path="/exams/:examId/result" element={<ExamResultPage />} />
          <Route path="/question-bank" element={<QuestionBankPage />} />

          {/* Grades, Attendance, Reports, Analytics */}
          <Route path="/gradebook" element={<GradebookPage />} />
          <Route path="/reports" element={<DigitalReportPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/analytics" element={<LearningAnalyticsPage />} />

          {/* School Operations: Jurnal Mengajar, BK & Prestasi, Jadwal KBM */}
          <Route path="/teacher/journal" element={<TeacherJournalPage />} />
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/schedule" element={<SchedulePage />} />

          {/* Notifications & Settings */}
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
