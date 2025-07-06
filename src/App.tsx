import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/welcome-page.tsx"));
const Dashboard = lazy(() => import("@/pages/dashboard.tsx"));
const SymptomLog = lazy(() => import("@/pages/symptom-log.tsx"));
const JournalEntries = lazy(() => import("@/pages/journal-entry-view"));
const Home = lazy(() => import("@/pages/home.tsx"));
const JournalView = lazy(() => import("@/pages/journal-view"));
const Journals = lazy(() => import("@/pages/journals"));
const JournalEntryView = lazy(() => import("@/pages/journal-entry-view"));

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route index element={<WelcomePage />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="journals" element={<Journals/>}>
            <Route path="journals/:id" element={<JournalView />}/>
            <Route path="journals/:id/entries" element={<JournalEntries/>}/>
            <Route path="journals/:id/entries/:id" element={<JournalEntryView/>}/>
          </Route>
          <Route path="symptom-log" element={<SymptomLog />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
