import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  if (!offline) return null;
  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-warning-bg px-4 py-2 text-small text-warning">
      <WifiOff size={14} aria-hidden />
      You’re offline — progress will sync when you reconnect
    </div>
  );
}
