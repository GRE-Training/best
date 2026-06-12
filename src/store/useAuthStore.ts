import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  /** true once the persisted session has been checked */
  ready: boolean;
  signIn: (user: User, accessToken: string | null) => void;
  signOut: () => void;
  restore: () => void;
}

const SESSION_KEY = 'gre-session';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  ready: false,

  signIn: (user, accessToken) => {
    // OAuth access tokens are short-lived; persist only the user identity.
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user }));
    set({ user, accessToken, ready: true });
  },

  signOut: () => {
    localStorage.removeItem(SESSION_KEY);
    set({ user: null, accessToken: null, ready: true });
  },

  restore: () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const { user } = JSON.parse(raw);
        // Local anonymous users persist across reloads.
        // Google sessions need a fresh token — they also survive here
        // (the app is public, so we just restore the identity; Drive
        // sync requires a fresh token which the user can reconnect via
        // Settings if needed).
        if (user?.id) {
          set({ user, accessToken: null, ready: true });
          return;
        }
      }
    } catch {
      // corrupted session — fall through to creating a fresh local user
    }
    // No prior session: auto-create an anonymous local user so there is
    // never a login gate. Each device gets its own stable identity.
    const id = `local-${crypto.randomUUID()}`;
    const anonUser = {
      id,
      email: '',
      name: 'Trainer',
      givenName: 'Trainer',
      demo: true,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: anonUser }));
    set({ user: anonUser, accessToken: null, ready: true });
  },
}));
