export function FormStepper({ sections, currentIndex, onStepClick }) {
  return (
    <nav
      aria-label="Calculator progress"
      className="bg-white border rounded-lg shadow-sm p-4"
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
                    ? "border-brand bg-blue-50 text-blue-900"
                    : isCompleted
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    isCurrent
                      ? "bg-brand text-white"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{section.shortTitle}</span>
                  <span className="block text-xs text-slate-600">
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
