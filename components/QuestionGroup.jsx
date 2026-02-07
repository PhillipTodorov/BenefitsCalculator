import { QuestionField } from "./QuestionField";

export function QuestionGroup({ sectionId, questions, answers, dispatch, errors }) {
  if (!questions.length) {
    return (
      <p className="text-sm text-slate-400">
        There are no questions for this section based on your previous answers.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="rounded-md border border-slate-700 bg-slate-800 px-3 py-3"
        >
          <QuestionField
            question={question}
            value={answers[question.id]}
            onChange={(value) =>
              dispatch({ type: "SET_ANSWER", id: question.id, value })
            }
            error={errors?.[question.id]}
          />
        </div>
      ))}
    </div>
  );
}
