export function QuestionField({ question, value, onChange, error }) {
  const { id, label, description, type, options } = question;

  const inputClasses =
    "mt-1 block w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm focus-visible:ring-brand-light focus-visible:ring-2 focus-visible:ring-offset-0";

  const errorInputClasses =
    "mt-1 block w-full rounded-md border border-red-500 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-0";

  const describedBy = [
    description ? `${id}-hint` : null,
    error ? `${id}-error` : null
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  function handleChange(event) {
    const target = event.target;
    if (type === "radio") {
      onChange(target.value);
    } else if (type === "checkbox") {
      onChange(target.checked);
    } else if (type === "number") {
      const next = target.value === "" ? "" : Number(target.value);
      onChange(Number.isNaN(next) ? "" : next);
    } else {
      onChange(target.value);
    }
  }

  const commonProps = {
    id,
    name: id,
    value: value ?? "",
    onChange: handleChange,
    className: error ? errorInputClasses : inputClasses,
    "aria-describedby": describedBy,
    "aria-invalid": error ? "true" : undefined
  };

  const labelContent = (
    <>
      {label}
      {question.required && (
        <span className="ml-1 text-red-400" aria-hidden="true">
          *
        </span>
      )}
    </>
  );

  const hintElement = description && (
    <p id={`${id}-hint`} className="text-xs text-slate-400">
      {description}
    </p>
  );

  const errorElement = error && (
    <p id={`${id}-error`} className="text-xs text-red-400 mt-1" role="alert">
      {error}
    </p>
  );

  if (type === "radio") {
    return (
      <fieldset className="space-y-1">
        <legend className="block text-sm font-medium text-slate-100">
          {labelContent}
        </legend>
        {hintElement}
        <div
          role="radiogroup"
          aria-labelledby={undefined}
          className="mt-1 space-y-1"
        >
          {options?.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="h-4 w-4 border-slate-600 bg-slate-800 text-brand"
                aria-invalid={error ? "true" : undefined}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {errorElement}
      </fieldset>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            className="h-4 w-4 border-slate-600 bg-slate-800 text-brand"
            aria-invalid={error ? "true" : undefined}
          />
          <span>{question.checkboxLabel ?? label}</span>
        </label>
        {hintElement}
        {errorElement}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-100">
        {labelContent}
      </label>
      {hintElement}
      {type === "select" && (
        <select {...commonProps}>
          <option value="">Please select</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {(type === "text" || type === "number") && (
        <input
          type={type}
          inputMode={type === "number" ? "numeric" : undefined}
          min={question.min}
          max={question.max}
          {...commonProps}
        />
      )}
      {errorElement}
    </div>
  );
}
