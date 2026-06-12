import { NavLink } from 'react-router-dom';
import { Home, Zap, BarChart3 } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/train', label: 'Train', icon: Zap },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 h-16 border-t border-border bg-white"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-full max-w-md items-stretch">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={label}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                isActive ? 'text-accent' : 'text-ink-tertiary'
              }`
            }
          >
            <Icon size={20} strokeWidth={1.75} aria-hidden />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
