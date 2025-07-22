import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "./components/ui/app-loader";
import PageWallpaperWrapper from "./layouts/wallpaper";
import { Toaster } from "@/components/ui/sonner";

const WelcomePage = lazy(() => import("@/pages/welcome-page.tsx"));
const Dashboard = lazy(() => import("@/layouts/dashboard"));
const MoodTrackerPage = lazy(() => import("@/pages/mood-tracker-page"));
const Home = lazy(() => import("@/pages/home.tsx"));
const JournalEntryLayout = lazy(() => import("@/layouts/journal-entry-layout"));
const JournalView = lazy(() => import("@/pages/journal-view"));
const JournalEntryEditorView = lazy(
  () => import("@/pages/journal-entry-editor-view"),
);
const LoginPage = lazy(() => import("@/pages/login-page"));
const RegisterPage = lazy(() => import("@/pages/register-page"));
const AuthLayout = lazy(() => import("@/layouts/auth"));
const PrivateRoutes = lazy(() => import("@/components/shared/private-routes"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const AllEntriesLayout = lazy(() => import("@/layouts/all-entries-layout"));
const PlacesPage = lazy(() => import("@/pages/places"));

const DemoRoutes = lazy(() => import("@/components/shared/demo/demo-routes"));

export default function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route element={<PageWallpaperWrapper />}>
              <Route index element={<Home />} />
              <Route path="mood" element={<MoodTrackerPage />} />
              <Route path="places" element={<PlacesPage />} />
            </Route>

            <Route path="journals" element={<JournalEntryLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />

              <Route path=":journalId" element={<JournalView />} />

              <Route
                path=":journalId/:entryId"
                element={<JournalEntryEditorView />}
              />
            </Route>
            <Route path="journal-entries/all" element={<AllEntriesLayout />} />

            <Route path="places" element={<PlacesPage />} />
          </Route>
        </Route>

        <Route path="demo" element={<DemoRoutes />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route element={<PageWallpaperWrapper />}>
              <Route index element={<Home />} />
              <Route path="mood" element={<MoodTrackerPage />} />
              <Route path="places" element={<PlacesPage />} />
            </Route>

            <Route path="journals" element={<JournalEntryLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />

              <Route path=":journalId" element={<JournalView />} />

              <Route
                path=":journalId/:entryId"
                element={<JournalEntryEditorView />}
              />
            </Route>
            <Route path="journal-entries/all" element={<AllEntriesLayout />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
