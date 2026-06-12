const SOUND_KEY = 'gre-sound-enabled';

export function soundEnabled(): boolean {
  return localStorage.getItem(SOUND_KEY) === '1';
}

export function setSoundEnabled(on: boolean): void {
  localStorage.setItem(SOUND_KEY, on ? '1' : '0');
}

let ctx: AudioContext | null = null;

function play(freq: number, durationMs: number, type: OscillatorType = 'sine', gain = 0.04) {
  if (!soundEnabled()) return;
  try {
    ctx ??= new AudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  } catch {
    // audio unavailable — sounds are decorative
  }
}

export const sounds = {
  tap: () => play(660, 60),
  correct: () => {
    play(740, 120);
    setTimeout(() => play(988, 160), 90);
  },
  wrong: () => play(220, 220, 'sine', 0.05),
};
