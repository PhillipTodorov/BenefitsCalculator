export function FormStepper({ sections, currentIndex, onStepClick }) {
  return (
    <nav
      aria-label="Calculator progress"
      className="bg-slate-900 border border-slate-700 rounded-lg shadow-sm p-4"
    >
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
        {sections.map((section, index) => {
          const isCurrent = index === currentIndex;
          const isCompleted = index < currentIndex;
          return (
            <li key={section.id} className="flex-1">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={`flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-xs sm:text-sm ${
                  isCurrent
                    ? "border-brand bg-blue-950 text-blue-200"
                    : isCompleted
                    ? "border-emerald-700 bg-emerald-950 text-emerald-200"
                    : "border-slate-700 bg-slate-800 text-slate-400"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    isCurrent
                      ? "bg-brand text-white"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{section.shortTitle}</span>
                  <span className="block text-xs text-slate-400">
                    {section.summary}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
