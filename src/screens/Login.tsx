import { useGoogleLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';
import { GOOGLE_CONFIGURED, OAUTH_SCOPES, demoUser, fetchUserInfo } from '../services/auth';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from '../store/useToastStore';
import Button from '../components/ui/Button';
import Pill from '../components/ui/Pill';

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
        <rect x="3" y="3" width="19" height="19" rx="5" fill="#0066FF" />
        <rect x="10" y="10" width="19" height="19" rx="5" fill="#0066FF" fillOpacity="0.35" />
      </svg>
      <span className="text-h1 text-ink">GRE Trainer</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

function GoogleSignInButton() {
  const signIn = useAuthStore((s) => s.signIn);
  const login = useGoogleLogin({
    scope: OAUTH_SCOPES,
    onSuccess: async (tokenResponse) => {
      try {
        const user = await fetchUserInfo(tokenResponse.access_token);
        signIn(user, tokenResponse.access_token);
      } catch {
        toast('error', 'Couldn’t complete sign-in. Try again.');
      }
    },
    onError: () => toast('error', 'Sign-in was cancelled or failed.'),
  });

  return (
    <Button full onClick={() => login()} className="flex items-center justify-center gap-3">
      <GoogleIcon />
      Continue with Google
    </Button>
  );
}

export default function Login() {
  const signIn = useAuthStore((s) => s.signIn);
  const location = useLocation();
  const expired = (location.state as { expired?: boolean } | null)?.expired;

  return (
    <div className="page mx-auto flex min-h-screen max-w-md flex-col px-6 py-12">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <Logo />
        <p className="text-body text-ink-secondary">From zero to Harvard — one step at a time.</p>

        {expired && (
          <p className="rounded-btn bg-warning-bg px-4 py-2 text-small text-warning">
            Your session expired. Please sign in again.
          </p>
        )}

        <div className="mt-4 w-full space-y-3">
          {GOOGLE_CONFIGURED ? (
            <GoogleSignInButton />
          ) : (
            <Button full onClick={() => signIn(demoUser(), null)}>
              Start training
            </Button>
          )}
          {GOOGLE_CONFIGURED && (
            <button
              onClick={() => signIn(demoUser(), null)}
              className="w-full py-2 text-small text-ink-tertiary"
            >
              Try the demo without an account
            </button>
          )}
        </div>

        <p className="text-small text-ink-tertiary">
          {GOOGLE_CONFIGURED
            ? 'Your progress is saved to your Google Drive'
            : 'Progress is saved on this device. Connect Google in .env to sync with Drive.'}
        </p>
      </div>

      <div className="flex justify-center pb-4">
        <Pill color="blue">Made for Harvard MBA applicants</Pill>
      </div>
    </div>
  );
}
