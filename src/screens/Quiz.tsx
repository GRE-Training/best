import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lightbulb, Eye, EyeOff, Check, X, ChevronDown } from 'lucide-react';
import { useQuizStore } from '../store/useQuizStore';
import { useProgressStore } from '../store/useProgressStore';
import { getLevel } from '../data/levels';
import { sounds } from '../utils/sound';
import MathText from '../components/MathText';
import ChoiceButton from '../components/quiz/ChoiceButton';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Pill from '../components/ui/Pill';
import ProgressBar from '../components/ui/ProgressBar';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function DifficultyDots({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Difficulty ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= value ? 'bg-ink-secondary' : 'bg-border'}`}
        />
      ))}
    </span>
  );
}

function CompletedStep({
  label,
  answer,
  why,
}: {
  label: string;
  answer: string;
  why: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full rounded-btn border border-border border-l-[3px] border-l-success bg-white px-4 py-3 text-left"
      aria-expanded={open}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-label uppercase text-ink-secondary">{label}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-ink-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </span>
      <MathText text={answer} className="mt-1 block text-small text-ink" />
      {open && <MathText text={why} className="mt-2 block text-small italic text-ink-secondary" />}
    </button>
  );
}

export default function Quiz() {
  const navigate = useNavigate();
  const quiz = useQuizStore();
  const recordSession = useProgressStore((s) => s.recordSession);
  const [exitModal, setExitModal] = useState(false);
  const recorded = useRef(false);

  const level = quiz.levelId !== null ? getLevel(quiz.levelId) : null;
  const problem = quiz.problems[quiz.problemIndex];

  // Record the session exactly once when the last step completes.
  useEffect(() => {
    if (!quiz.finished || recorded.current || quiz.levelId === null) return;
    recorded.current = true;
    const outcome = recordSession({
      levelId: quiz.levelId,
      results: quiz.results,
      topics: [...new Set(quiz.problems.map((p) => p.topic))],
      perTopic: quiz.perTopic,
      durationSeconds: Math.round((Date.now() - quiz.startedAt) / 1000),
      practice: quiz.mode === 'practice',
    });
    navigate('/results', { state: outcome, replace: true });
  }, [quiz.finished]); // eslint-disable-line react-hooks/exhaustive-deps

  if (quiz.levelId === null || !level) {
    return (
      <div className="page mx-auto max-w-md px-5 pt-16 text-center">
        <p className="text-body text-ink-secondary">No active session.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to Levels
        </Button>
      </div>
    );
  }

  if (quiz.loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-5">
        <p className="text-body text-ink-tertiary">Loading problems…</p>
      </div>
    );
  }

  if (quiz.loadError || !problem) {
    return (
      <div className="page mx-auto max-w-md px-5 pt-16 text-center">
        <p className="text-body text-ink">Couldn’t load problems. Check your connection.</p>
        <Button className="mt-4" onClick={() => void quiz.start(quiz.levelId!, quiz.mode)}>
          Retry
        </Button>
      </div>
    );
  }

  const step = problem.steps[quiz.stepIndex];
  const isFeedback = quiz.phase === 'feedback';
  const lastResult = quiz.results[quiz.results.length - 1];
  const isLastStepOfProblem = quiz.stepIndex === problem.steps.length - 1;
  const isLastProblem = quiz.problemIndex === quiz.problems.length - 1;

  const answered = quiz.results.length;
  const correctCount = quiz.results.filter((r) => r.correct).length;
  const hintsUsed = quiz.results.filter((r) => r.usedHint).length + (quiz.hintShown && !isFeedback ? 1 : 0);
  const accuracy = answered ? Math.round((correctCount / answered) * 100) : 0;

  const choose = (i: number) => {
    sounds.tap();
    quiz.choose(i);
    const correct = i === step.correctIndex;
    setTimeout(() => (correct ? sounds.correct() : sounds.wrong()), 120);
  };

  const choiceState = (i: number): 'idle' | 'correct' | 'wrong' | 'dim' => {
    if (!isFeedback) return 'idle';
    if (i === step.correctIndex) return 'correct';
    if (i === quiz.chosenIndex) return 'wrong';
    return 'dim';
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col pb-8">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-3">
        <button
          onClick={() => setExitModal(true)}
          aria-label="Exit level"
          className="tap-feedback rounded-btn p-2 text-ink-secondary"
        >
          <ChevronLeft size={20} />
        </button>
        {!quiz.focusMode && (
          <span className="text-[13px] text-ink-secondary">
            {level.name}
            {quiz.mode === 'practice' && (
              <Pill color="blue" className="ml-2">
                Practice
              </Pill>
            )}
          </span>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={quiz.toggleFocus}
            aria-label={quiz.focusMode ? 'Exit focus mode' : 'Enter focus mode'}
            className="tap-feedback rounded-btn p-2 text-ink-tertiary"
          >
            {quiz.focusMode ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
          <span className="pr-2 text-small text-ink-secondary">
            {quiz.problemIndex + 1} / {quiz.problems.length}
          </span>
        </div>
      </header>

      <ProgressBar value={(quiz.completedSteps() / Math.max(1, quiz.totalSteps())) * 100} />

      <div className="flex-1 px-5">
        {/* Live stats */}
        {!quiz.focusMode && answered > 0 && (
          <div className="mt-4 flex items-center gap-4 text-small text-ink-secondary">
            <span className="flex items-center gap-1">
              <Check size={14} className="text-success" aria-hidden /> {correctCount} correct
            </span>
            <span>{accuracy}% accuracy</span>
            <span className="flex items-center gap-1">
              <Lightbulb size={13} aria-hidden /> {hintsUsed} hints
            </span>
          </div>
        )}

        {/* Problem card */}
        <div className="mt-4 rounded-card border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <Pill color="blue">{problem.topic}</Pill>
            <DifficultyDots value={problem.difficulty} />
          </div>
          <MathText
            text={problem.questionText}
            className="mt-3 block text-[16px] leading-[1.75] text-ink"
          />
        </div>

        {/* Completed steps for this problem */}
        {quiz.stepIndex > 0 && (
          <div className="mt-4 space-y-2">
            {problem.steps.slice(0, quiz.stepIndex).map((s, i) => (
              <CompletedStep
                key={i}
                label={s.label}
                answer={s.choices[s.correctIndex]}
                why={s.why}
              />
            ))}
          </div>
        )}

        {/* Active step */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="text-label uppercase text-ink-secondary">
              Step {quiz.stepIndex + 1} of {problem.steps.length}
            </span>
            <span className="flex gap-1" aria-hidden>
              {problem.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i < quiz.stepIndex ? 'bg-success' : i === quiz.stepIndex ? 'bg-accent' : 'bg-border'
                  }`}
                />
              ))}
            </span>
          </div>
          <p className="mt-2 text-label uppercase text-accent">{step.label}</p>
          <MathText text={step.question} className="mt-2 block text-body text-ink" />

          <div className="mt-4 space-y-2.5">
            {step.choices.map((choice, i) => (
              <ChoiceButton
                key={i}
                letter={LETTERS[i]}
                text={choice}
                state={choiceState(i)}
                disabled={isFeedback}
                onClick={() => choose(i)}
              />
            ))}
          </div>

          {/* Hint + Skip row */}
          {!isFeedback && (
            <>
              {quiz.hintShown ? (
                <div className="mt-4 rounded-btn bg-warning-bg px-4 py-3">
                  <MathText text={problem.hint} className="text-small text-warning" />
                  <p className="mt-1 text-[11px] text-warning/70">Hint used — this step counts for half credit.</p>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={quiz.showHint}
                    className="flex items-center gap-1.5 text-small text-ink-secondary"
                  >
                    <Lightbulb size={15} aria-hidden />
                    Show hint
                  </button>
                  <button
                    onClick={quiz.skip}
                    className="text-small text-ink-tertiary"
                  >
                    Skip problem →
                  </button>
                </div>
              )}
              {quiz.hintShown && (
                <button
                  onClick={quiz.skip}
                  className="mt-3 w-full text-right text-small text-ink-tertiary"
                >
                  Skip problem →
                </button>
              )}
            </>
          )}

          {/* Feedback */}
          {isFeedback && lastResult && (
            <div
              className={`mt-4 animate-slideUp rounded-card border p-5 ${
                lastResult.correct ? 'border-success/30 bg-success-bg' : 'border-error/30 bg-error-bg'
              }`}
            >
              <p className={`flex items-center gap-2 text-h3 ${lastResult.correct ? 'text-success' : 'text-error'}`}>
                {lastResult.correct ? <Check size={17} aria-hidden /> : <X size={17} aria-hidden />}
                {lastResult.correct ? 'Correct' : 'Not quite'}
              </p>
              <MathText text={step.explanation} className="mt-2 block text-small text-ink" />
              <p className="mt-2 text-small italic text-ink-secondary">
                Why this matters: <MathText text={step.why} />
              </p>

              {isLastStepOfProblem && (
                <div className="mt-3 border-t border-ink/10 pt-3">
                  <p className="text-label uppercase text-success">Problem solved</p>
                  <p className="mt-1 text-small text-ink">
                    Answer: <MathText text={problem.answer} className="font-medium" />
                  </p>
                </div>
              )}

              <Button full className="mt-4" onClick={quiz.continueNext}>
                {!isLastStepOfProblem ? 'Continue' : isLastProblem ? 'Finish level' : 'Next problem'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal open={exitModal} title="Leave this level?" onClose={() => setExitModal(false)}>
        <p className="text-small text-ink-secondary">
          Your answers so far won’t be scored. You can resume from the home screen.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="secondary" full onClick={() => setExitModal(false)}>
            Keep going
          </Button>
          <Button full onClick={() => navigate('/')}>
            Leave
          </Button>
        </div>
      </Modal>
    </div>
  );
}
