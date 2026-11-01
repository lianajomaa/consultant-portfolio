/**
 * QUIZ ENGINE — one component, three uses.
 * Specification section 14 (and the knowledge check inside section 13).
 *
 * Used by:
 *   · the knowledge check inside a lesson page
 *   · the standalone quiz page
 *   · the final assessment page
 *
 * Behaviour: one question at a time, "Submit Answer", immediate feedback with
 * an explanation, then a score summary at the end.
 *
 * Jana has not written the questions yet, so `questions` is often empty. That
 * is handled explicitly — the block says so rather than rendering broken UI.
 */

import { useState } from 'react'
import { Check, X } from 'lucide-react'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function QuizBlock({
  quiz,
  passingScore = 70,
  onFinish, // (result) => void — called once when the learner finishes
  continueLabel = 'Continue',
  onContinue, // optional; renders a button on the summary screen
}) {
  const questions = quiz?.questions || []

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  /* ---------- content not written yet ---------- */
  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <p className="text-sm font-medium text-navy">{quiz?.title || 'Knowledge Check'}</p>
        <p className="mt-1.5 text-[13px] text-navy/60">
          Questions for this knowledge check are being written.
        </p>
      </div>
    )
  }

  const question = questions[index]
  const isLast = index === questions.length - 1
  const correct = submitted && selected === question.correctIndex

  const submit = () => {
    if (selected === null) return
    setSubmitted(true)
    if (selected === question.correctIndex) setScore((s) => s + 1)
  }

  const next = () => {
    if (isLast) {
      setFinished(true)
      // Report the final score, adding this question if it was just answered.
      const total = questions.length
      const finalScore = score
      onFinish?.({ score: finalScore, total })
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setSubmitted(false)
  }

  const retry = () => {
    setIndex(0)
    setSelected(null)
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  /* ---------- summary ---------- */
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= passingScore

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-[11px] tracking-[0.18em] text-navy/50">RESULT</p>
        <p className="mt-2 font-serif text-3xl font-medium text-navy">
          Score: {score}/{questions.length}
        </p>
        <p className="mt-1 text-sm text-navy/70">
          {percentage}% · {passed ? 'Passed' : `${passingScore}% needed to pass`}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {onContinue && (
            <button
              onClick={onContinue}
              className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
            >
              {continueLabel} →
            </button>
          )}
          <button
            onClick={retry}
            className="border-b border-navy pb-0.5 text-sm font-medium text-navy"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  /* ---------- question ---------- */
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] tracking-[0.18em] text-navy/50">
          QUESTION {index + 1} OF {questions.length}
        </p>
        <p className="text-[12px] text-navy/50">
          {score} correct so far
        </p>
      </div>

      <h3 className="mt-3 text-base font-medium leading-snug text-navy md:text-lg">
        {question.prompt}
      </h3>

      {/* options */}
      <ul className="mt-5 space-y-2.5">
        {question.options.map((option, i) => {
          const chosen = selected === i
          const isAnswer = i === question.correctIndex

          // Colour only after submitting, so the learner isn't given a hint.
          let tone = 'border-slate-200 hover:border-navy/40'
          if (chosen && !submitted) tone = 'border-navy bg-baby/40'
          if (submitted && isAnswer) tone = 'border-navy bg-baby/60'
          if (submitted && chosen && !isAnswer) tone = 'border-slate-300 bg-slate-50'

          return (
            <li key={i}>
              <button
                onClick={() => !submitted && setSelected(i)}
                disabled={submitted}
                aria-pressed={chosen}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${tone} ${
                  submitted ? 'cursor-default' : ''
                }`}
              >
                <span className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-current text-[11px] text-navy/70">
                  {LETTERS[i]}
                </span>
                <span className="flex-1 text-navy">{option}</span>

                {submitted && isAnswer && (
                  <Check size={16} className="mt-0.5 flex-shrink-0 text-navy" aria-hidden="true" />
                )}
                {submitted && chosen && !isAnswer && (
                  <X size={16} className="mt-0.5 flex-shrink-0 text-navy/50" aria-hidden="true" />
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* feedback */}
      {submitted && (
        <div
          className={`mt-5 rounded-lg px-4 py-3.5 ${
            correct ? 'bg-baby/60' : 'border border-slate-200 bg-slate-50'
          }`}
        >
          <p className="text-sm font-medium text-navy">{correct ? 'Correct' : 'Not quite'}</p>
          {question.explanation && (
            <p className="mt-1 text-[13px] leading-relaxed text-navy/80">{question.explanation}</p>
          )}
        </div>
      )}

      {/* actions */}
      <div className="mt-6">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={selected === null}
            className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={next}
            className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
          >
            {isLast ? 'See Result' : 'Next Question'} →
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizBlock