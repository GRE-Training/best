import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Download, Trash2, Volume2, HardDrive } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { soundEnabled, setSoundEnabled } from '../utils/sound';
import { toast } from '../store/useToastStore';
import { GOOGLE_CONFIGURED, OAUTH_SCOPES, fetchUserInfo } from '../services/auth';
import { useGoogleLogin } from '@react-oauth/google';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// Inline component so the hook is only rendered when Google is configured.
function ConnectGoogleButton() {
  const signIn = useAuthStore((s) => s.signIn);
  const login = useGoogleLogin({
    scope: OAUTH_SCOPES,
    onSuccess: async (tokenResponse) => {
      try {
        const user = await fetchUserInfo(tokenResponse.access_token);
        signIn(user, tokenResponse.access_token);
        toast('success', 'Google account connected — progress will sync to Drive.');
      } catch {
        toast('error', "Couldn't connect Google. Try again.");
      }
    },
    onError: () => toast('error', 'Sign-in was cancelled.'),
  });

  return (
    <Button
      variant="secondary"
      full
      onClick={() => login()}
      className="flex items-center justify-center gap-2"
    >
      <HardDrive size={16} aria-hidden />
      Connect Google — sync progress to Drive
    </Button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const signIn = useAuthStore((s) => s.signIn);
  const resetAll = useProgressStore((s) => s.resetAll);
  const exportJson = useProgressStore((s) => s.exportJson);
  const [resetModal, setResetModal] = useState(false);
  const [scoringOpen, setScoringOpen] = useState(false);
  const [sound, setSound] = useState(soundEnabled());

  if (!user) return null;

  const isAnonymous = user.demo === true;

  const doExport = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gre-trainer-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('success', 'Progress exported');
  };

  const toggleSound = () => {
    setSoundEnabled(!sound);
    setSound(!sound);
  };

  const disconnectGoogle = () => {
    // Downgrade back to anonymous — create a fresh local identity.
    const id = `local-${crypto.randomUUID()}`;
    const anonUser = { id, email: '', name: 'Trainer', givenName: 'Trainer', demo: true as const };
    signIn(anonUser, null);
    toast('info', 'Disconnected from Google. Progress saved locally.');
  };

  return (
    <div className="page mx-auto max-w-md px-5 pb-12 pt-6">
      <button
        onClick={() => navigate('/')}
        aria-label="Back to home"
        className="tap-feedback -ml-2 flex items-center gap-1 rounded-btn p-2 text-small text-ink-secondary"
      >
        <ChevronLeft size={18} />
        Back
      </button>

      <h1 className="mt-4 text-h1 text-ink">Settings</h1>

      <p className="mt-6 text-label uppercase text-ink-secondary">Account</p>
      <Card className="mt-2 flex items-center gap-4">
        {user.picture ? (
          <img src={user.picture} alt="" className="h-11 w-11 rounded-full" referrerPolicy="no-referrer" />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-bg text-h3 text-accent">
            {user.givenName.charAt(0)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {isAnonymous ? (
            <>
              <p className="text-h3 text-ink">Local device</p>
              <p className="text-small text-ink-secondary">Progress saved on this device</p>
            </>
          ) : (
            <>
              <p className="truncate text-h3 text-ink">{user.name}</p>
              <p className="truncate text-small text-ink-secondary">{user.email}</p>
            </>
          )}
        </div>
        {!isAnonymous && (
          <button
            onClick={disconnectGoogle}
            aria-label="Disconnect Google"
            className="tap-feedback shrink-0 rounded-btn px-3 py-2 text-small text-ink-secondary"
          >
            Disconnect
          </button>
        )}
      </Card>

      {isAnonymous && GOOGLE_CONFIGURED && (
        <div className="mt-2">
          <ConnectGoogleButton />
        </div>
      )}

      <p className="mt-6 text-label uppercase text-ink-secondary">Preferences</p>
      <Card className="mt-2 flex items-center justify-between p-4">
        <span className="flex items-center gap-2 text-body text-ink">
          <Volume2 size={17} className="text-ink-secondary" aria-hidden />
          Sound effects
        </span>
        <button
          role="switch"
          aria-checked={sound}
          aria-label="Toggle sound effects"
          onClick={toggleSound}
          className={`relative h-6 w-11 rounded-full transition-colors ${sound ? 'bg-accent' : 'bg-border-strong'}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
              sound ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </Card>

      <p className="mt-6 text-label uppercase text-ink-secondary">Data</p>
      <div className="mt-2 space-y-2">
        <Button variant="secondary" full onClick={doExport} className="flex items-center justify-center gap-2">
          <Download size={16} aria-hidden />
          Export my progress (JSON)
        </Button>
        <Button variant="danger" full onClick={() => setResetModal(true)} className="flex items-center justify-center gap-2">
          <Trash2 size={16} aria-hidden />
          Reset all progress
        </Button>
      </div>

      <p className="mt-6 text-label uppercase text-ink-secondary">About</p>
      <Card className="mt-2 p-4">
        <div className="flex items-center justify-between text-small">
          <span className="text-ink-secondary">Version</span>
          <span className="text-ink">1.0.0</span>
        </div>
        <button
          onClick={() => setScoringOpen(!scoringOpen)}
          aria-expanded={scoringOpen}
          className="mt-3 flex w-full items-center justify-between text-small text-ink"
        >
          How scoring works
          <ChevronDown size={15} className={`text-ink-tertiary transition-transform ${scoringOpen ? 'rotate-180' : ''}`} />
        </button>
        {scoringOpen && (
          <div className="mt-2 space-y-2 text-small text-ink-secondary">
            <p>Each step answered correctly earns 1 point. Using a hint halves the step to 0.5 points.</p>
            <p>Your level score is points ÷ total steps × 100. Reaching the pass threshold unlocks the next level.</p>
            <p>The estimated GRE score starts at 130 and adds up to 5.5 points per completed level, weighted by your score in it, capped at 170.</p>
          </div>
        )}
      </Card>

      <Modal open={resetModal} title="Reset all progress?" onClose={() => setResetModal(false)}>
        <p className="text-small text-ink-secondary">
          This permanently deletes your scores, history and unlocked levels. There is no undo.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="secondary" full onClick={() => setResetModal(false)}>
            Cancel
          </Button>
          <Button
            full
            className="!bg-error"
            onClick={() => {
              resetAll();
              setResetModal(false);
              toast('success', 'Progress reset');
            }}
          >
            Reset
          </Button>
        </div>
      </Modal>
    </div>
  );
}
