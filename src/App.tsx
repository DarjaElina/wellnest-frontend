import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "./components/ui/app-loader";

const WelcomePage = lazy(() => import("@/pages/welcome-page.tsx"));
const Dashboard = lazy(() => import("@/layouts/dashboard"));
const MoodTrackerPage = lazy(() => import("@/pages/mood-tracker-page"));
const Home = lazy(() => import("@/pages/home.tsx"));
const JournalLayout = lazy(() => import("@/pages/journal-layout.tsx"));
const JournalView = lazy(() => import("@/pages/journal-view"));
const JournalEditorView = lazy(() => import("@/pages/journal-editor-view"));
const LoginPage = lazy(() => import("@/pages/login-page"));
const RegisterPage = lazy(() => import("@/pages/register-page"));
const AuthLayout = lazy(() => import("@/layouts/auth"));
const PrivateRoutes = lazy(() => import("@/components/shared/private-routes"));

export default function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="journals" element={<JournalLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path=":journalId" element={<JournalView />} />
              <Route
                path=":journalId/:entryId"
                element={<JournalEditorView />}
              />
            </Route>

            <Route path="mood" element={<MoodTrackerPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
