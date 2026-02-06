"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { SECTIONS, QUESTIONS } from "../lib/questions";
import { evaluateAllBenefits } from "../lib/eligibilityEngine";
import { BENEFITS } from "../lib/benefits";
import { trackEvent } from "../lib/analytics";
import { FormStepper } from "../components/FormStepper";
import { QuestionGroup } from "../components/QuestionGroup";
import { ResultsView } from "../components/ResultsView";

const initialAnswers = {};

function answersReducer(state, action) {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        [action.id]: action.value
      };
    case "RESET_ALL":
      return initialAnswers;
    default:
      return state;
  }
}

export default function HomePage() {
  const [answers, dispatch] = useReducer(answersReducer, initialAnswers);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const stepHeadingRef = useRef(null);

  const currentSection = SECTIONS[currentStepIndex];

  const visibleQuestionsBySection = useMemo(() => {
    const bySection = {};
    for (const question of QUESTIONS) {
      const shouldShow =
        typeof question.visibleWhen === "function"
          ? question.visibleWhen(answers)
          : true;
      if (!shouldShow) continue;
      if (!bySection[question.section]) bySection[question.section] = [];
      bySection[question.section].push(question);
    }
    return bySection;
  }, [answers]);

  const currentSectionQuestions =
    visibleQuestionsBySection[currentSection.id] ?? [];

  const results = useMemo(() => {
    if (!submitted) return null;
    return evaluateAllBenefits(answers);
  }, [answers, submitted]);

  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [currentStepIndex]);

  function goToStep(index) {
    setValidationErrors({});
    setCurrentStepIndex(index);
  }

  function handleNext() {
    const errors = {};
    for (const q of currentSectionQuestions) {
      if (q.required && (answers[q.id] === undefined || answers[q.id] === "")) {
        errors[q.id] = "This field is required.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmitted(false);
      trackEvent("step_validation_failed", {
        step: currentSection.id,
        missing: Object.keys(errors)
      });
      const firstMissingId = Object.keys(errors)[0];
      const el = document.getElementById(firstMissingId);
      el?.focus();
      return;
    }

    setValidationErrors({});

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < SECTIONS.length) {
      setCurrentStepIndex(nextIndex);
      trackEvent("step_completed", { step: currentSection.id });
    } else {
      setSubmitted(true);
      setShowResults(true);
      trackEvent("calculator_completed", {});
    }
  }

  function handleBack() {
    if (currentStepIndex === 0) return;
    setValidationErrors({});
    setCurrentStepIndex((idx) => idx - 1);
  }

  function handleStart() {
    trackEvent("calculator_started", {});
    document
      .getElementById("calculator-start")
      ?.scrollIntoView({ behavior: "smooth" });
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }

  function handleEditAnswers() {
    setShowResults(false);
    setCurrentStepIndex(0);
    setSubmitted(false);
    setValidationErrors({});
    trackEvent("results_edit_answers", {});
  }

  return (
    <div className="space-y-8">
      {!showResults && (
        <section
          aria-labelledby="landing-heading"
          className="bg-white border rounded-lg shadow-sm p-6"
        >
          <h2
            id="landing-heading"
            className="text-xl font-semibold tracking-tight mb-2"
          >
            Check which benefits you might be able to claim
          </h2>
          <p className="text-sm text-slate-700 mb-3">
            Answer a few short questions (about 8 minutes) to see which UK
            benefits might be relevant for you. This tool is designed for people
            living in England, Wales, or Scotland.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
            <li>Your answers stay in your browser and are not saved.</li>
            <li>
              The calculator gives guidance only. It cannot guarantee you will
              receive any benefit.
            </li>
            <li>You can stop at any time.</li>
          </ul>
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
          >
            Start the calculator
          </button>
        </section>
      )}

      {!showResults && (
        <section id="calculator-start" aria-label="Benefits calculator">
          <FormStepper
            sections={SECTIONS}
            currentIndex={currentStepIndex}
            onStepClick={goToStep}
          />

          <div className="mt-4 bg-white border rounded-lg shadow-sm p-6">
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-lg font-semibold tracking-tight mb-1"
            >
              {currentSection.title}
            </h2>
            <p className="text-sm text-slate-700 mb-4">
              {currentSection.description}
            </p>

            <QuestionGroup
              sectionId={currentSection.id}
              questions={currentSectionQuestions}
              answers={answers}
              dispatch={dispatch}
              errors={validationErrors}
            />

            <div className="mt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
              >
                {currentStepIndex === SECTIONS.length - 1
                  ? "See your results"
                  : "Continue"}
              </button>
            </div>
          </div>
        </section>
      )}

      {showResults && results && (
        <ResultsView
          results={results}
          benefits={BENEFITS}
          onEditAnswers={handleEditAnswers}
        />
      )}
    </div>
  );
}
