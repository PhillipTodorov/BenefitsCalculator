export function PrintButton() {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      aria-label="Save or print this page"
      className="inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 no-print"
    >
      Save or print this page
    </button>
  );
}
