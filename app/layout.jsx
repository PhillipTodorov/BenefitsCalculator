import "./globals.css";

export const metadata = {
  title: "CheckMyEntitlements",
  description:
    "A simple, supportive tool to help you understand which UK benefits you might be able to claim."
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-slate-800 focus:px-4 focus:py-2 focus:rounded focus:shadow focus:text-brand-light"
        >
          Skip to main content
        </a>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-800 bg-slate-900">
            <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-50">
                  CheckMyEntitlements
                </h1>
                <p className="text-sm text-slate-400">
                  Guidance tool for England, Wales and Scotland
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-950 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-800">
                Beta guidance only
              </span>
            </div>
          </header>
          <main id="main-content" className="flex-1">
            <div className="mx-auto max-w-4xl px-4 py-6">{children}</div>
          </main>
          <footer className="border-t border-slate-800 bg-slate-900">
            <div className="mx-auto max-w-4xl px-4 py-4 text-xs text-slate-400 space-y-1">
              <p>
                This calculator provides guidance only. It does not guarantee
                that you will receive any benefit. Final decisions are made by
                the Department for Work and Pensions (DWP) and other relevant
                authorities.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
