import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useProgressStore } from './store/useProgressStore';
import BottomNav from './components/layout/BottomNav';
import OfflineBanner from './components/layout/OfflineBanner';
import ToastHost from './components/ui/ToastHost';

const Home = lazy(() => import('./screens/Home'));
const Train = lazy(() => import('./screens/Train'));
const LevelIntro = lazy(() => import('./screens/LevelIntro'));
const Quiz = lazy(() => import('./screens/Quiz'));
const Results = lazy(() => import('./screens/Results'));
const Analytics = lazy(() => import('./screens/Analytics'));
const Settings = lazy(() => import('./screens/Settings'));

const NAV_ROUTES = ['/', '/train', '/analytics'];

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <svg viewBox="0 0 32 32" className="h-10 w-10" aria-label="Loading">
        <rect x="3" y="3" width="19" height="19" rx="5" fill="#0066FF" />
        <rect x="10" y="10" width="19" height="19" rx="5" fill="#0066FF" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

export default function App() {
  const { user, ready, restore } = useAuthStore();
  const initProgress = useProgressStore((s) => s.init);
  const progressLoading = useProgressStore((s) => s.loading);
  const location = useLocation();

  useEffect(() => {
    restore();
  }, [restore]);

  useEffect(() => {
    if (user) void initProgress();
  }, [user, initProgress]);

  if (!ready || progressLoading) return <Splash />;

  const showNav = NAV_ROUTES.includes(location.pathname);

  return (
    <>
      <OfflineBanner />
      <ToastHost />
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<Train />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/level/:id" element={<LevelIntro />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {showNav && <BottomNav />}
    </>
  );
}
