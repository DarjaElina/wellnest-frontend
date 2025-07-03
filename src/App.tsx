import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/welcome-page.tsx"));
const Dashboard = lazy(() => import("@/pages/dashboard.tsx"));
const SymptomLog = lazy(() => import("@/pages/symptom-log.tsx"));
const Journal = lazy(() => import("@/pages/journal.tsx"));
const Home = lazy(() => import("@/pages/home.tsx"));

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route index element={<WelcomePage />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="journal" element={<Journal />} />
          <Route path="symptom-log" element={<SymptomLog />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
