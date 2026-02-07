import { PrintButton } from "./PrintButton";

const STATUS_LABELS = {
  likely: { label: "Likely eligible", color: "bg-emerald-950 text-emerald-300" },
  uncertain: {
    label: "Possibly eligible",
    color: "bg-amber-950 text-amber-300"
  },
  unlikely: { label: "Unlikely eligible", color: "bg-slate-800 text-slate-400" }
};

export function ResultsView({ results, benefits, onEditAnswers }) {
  const entries = Object.entries(results);

  const counts = entries.reduce(
    (acc, [, result]) => {
      acc[result.status] += 1;
      return acc;
    },
    { likely: 0, uncertain: 0, unlikely: 0 }
  );

  return (
    <section
      aria-labelledby="results-heading"
      className="bg-slate-900 border border-slate-700 rounded-lg shadow-sm p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h2
            id="results-heading"
            className="text-xl font-semibold tracking-tight mb-1 text-slate-50"
          >
            Your benefit guidance
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Based on your answers, here is a summary of benefits that may be
            relevant for you. This is guidance only &ndash; it does not guarantee you
            will receive any benefit.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 no-print">
          <PrintButton />
          <button
            type="button"
            onClick={onEditAnswers}
            className="inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300"
          >
            Go back and edit answers
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-slate-300">
        <p>
          Likely eligible:{" "}
          <span className="font-semibold text-emerald-400">
            {counts.likely}
          </span>{" "}
          &nbsp;|&nbsp; Possibly eligible:{" "}
          <span className="font-semibold text-amber-400">
            {counts.uncertain}
          </span>{" "}
          &nbsp;|&nbsp; Unlikely:{" "}
          <span className="font-semibold text-slate-400">
            {counts.unlikely}
          </span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {entries.map(([benefitId, result]) => {
          const config = benefits[benefitId];
          if (!config) return null;
          const status = STATUS_LABELS[result.status];
          const messages = config.messages[result.status];
          return (
            <article
              key={benefitId}
              className="rounded-lg border border-slate-700 bg-slate-800 p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    {config.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {config.shortDescription}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-slate-200 mb-2">{messages.short}</p>
              <details className="text-xs text-slate-300">
                <summary className="cursor-pointer font-medium text-slate-100">
                  What this means and what to do next
                </summary>
                <div className="mt-2 space-y-2">
                  <p>{messages.long}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {config.nextSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                  {config.links && (
                    <p>
                      Find out more on{" "}
                      <a
                        href={config.links.official}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-light underline"
                      >
                        GOV.UK
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {config.links.support && (
                        <>
                          {" "}
                          or{" "}
                          <a
                            href={config.links.support}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-light underline"
                          >
                            Citizens Advice
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </>
                      )}
                      .
                    </p>
                  )}
                </div>
              </details>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-md border border-amber-800 bg-amber-950 px-3 py-2 text-xs text-amber-200">
        <p className="font-semibold">Important</p>
        <p>
          This calculator cannot take every detail of your situation into
          account. If you are unsure, it is usually worth making a claim or
          speaking to a welfare rights adviser. Getting independent advice can
          help you understand your options.
        </p>
      </div>
    </section>
  );
}
