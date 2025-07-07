import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/welcome-page.tsx"));
const Dashboard = lazy(() => import("@/pages/dashboard.tsx"));
const SymptomLog = lazy(() => import("@/pages/symptom-log.tsx"));
const Home = lazy(() => import("@/pages/home.tsx"));
const JournalLayout = lazy(() => import("@/pages/journal-layout.tsx"))
const JournalView = lazy(() => import("@/pages/journal-view"));
const JournalEditorView = lazy(() => import("@/pages/journal-editor-view"));

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route index element={<WelcomePage />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />

          <Route path="journals" element={<JournalLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path=":journalId" element={<JournalView />} />
            <Route path=":journalId/:entryId" element={<JournalEditorView />} />
          </Route>

          <Route path="symptom-log" element={<SymptomLog />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

