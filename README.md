# CheckMyEntitlements

**Find out which UK benefits you might be able to claim.**

Answer questions → Get matched to benefits → See next steps — all in your browser, all private.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Next.js](https://img.shields.io/badge/next.js-13-blue)
![React](https://img.shields.io/badge/react-18-blue)
![Tailwind](https://img.shields.io/badge/tailwind-3-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## What It Does

| Feature | Description |
|---------|-------------|
| **Step-by-Step Form** | Guided questionnaire across 5 sections with progress tracking |
| **Smart Questions** | Conditional questions that show or hide based on your previous answers |
| **Eligibility Engine** | Client-side rules engine evaluates your answers against benefit criteria |
| **Results Summary** | Likely / Possibly / Unlikely ratings for each benefit with explanations |
| **Next Steps** | Direct links to GOV.UK and Citizens Advice for every benefit |
| **Print Summary** | Print-friendly results page to take to appointments |
| **Dark Theme** | Easy-on-the-eyes dark UI |
| **Fully Accessible** | Keyboard navigation, ARIA landmarks, skip links, focus management |

---

## Benefits Covered

| Benefit | Who It's For |
|---------|-------------|
| **Personal Independence Payment (PIP)** | People aged 16–66 with a long-term health condition or disability |
| **Universal Credit** | People on a low income or out of work |
| **Employment and Support Allowance (ESA)** | People whose health limits their ability to work |
| **Housing Benefit / UC Housing Element** | People on a low income who rent their home |
| **Council Tax Reduction** | People on a low income who pay council tax |
| **Carer's Allowance** | People who provide 35+ hours/week of unpaid care |
| **Attendance Allowance** | People over State Pension age who need help with personal care |

---

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                     CheckMyEntitlements                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────┐                                         │
│  │   Landing     │                                         │
│  │               │                                         │
│  │  • What this  │                                         │
│  │    tool does  │                                         │
│  │  • Privacy    │                                         │
│  │    notice     │                                         │
│  │  • Start CTA  │                                         │
│  └──────┬────────┘                                         │
│         ▼                                                   │
│  ┌───────────────┐     ┌───────────────┐                   │
│  │  1. About You │────▶│  2. Health &  │──────┐            │
│  │               │     │   Disability  │      │            │
│  │  • Age        │     │               │      │            │
│  │  • Location   │     │  • Condition  │      │            │
│  │  • Residency  │     │  • Daily life │      │            │
│  │  • Situation  │     │  • Mobility   │      ▼            │
│  └───────────────┘     └───────────────┘                   │
│                                          ┌───────────────┐ │
│  ┌───────────────┐     ┌───────────────┐ │  3. Work &    │ │
│  │  5. Caring    │◄────│  4. Housing   │◄│    Income     │ │
│  │               │     │               │ │               │ │
│  │  • Care hours │     │  • Rent       │ │  • Employment │ │
│  │  • Disability │     │  • Council    │ │  • Income     │ │
│  │    benefit    │     │    tax        │ │  • Savings    │ │
│  └──────┬────────┘     └───────────────┘ └───────────────┘ │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Results                           │   │
│  │                                                     │   │
│  │  • Likely / Possibly / Unlikely for each benefit    │   │
│  │  • Plain English explanations                       │   │
│  │  • Next steps with GOV.UK & Citizens Advice links   │   │
│  │  • Print / save option                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  No backend. No database. Everything stays in your browser. │
└─────────────────────────────────────────────────────────────┘
```

---

## Questionnaire Sections

### 1. About You
Age, location (England/Wales/Scotland), UK residency, current benefits, living situation.

### 2. Health & Disability
Whether you have a condition, how long you've had it, impact on daily living and mobility, need for help from others, treatment outlook.

### 3. Work & Income
Employment status, hours worked, household income, savings, partner's situation.

### 4. Housing
Whether you rent, rent amount, council tax, supported housing.

### 5. Caring Responsibilities
Whether you provide regular care, hours per week, whether the person you care for gets a disability benefit.

---

## Quick Start

### Run Locally

```bash
# Clone the repo
git clone https://github.com/PhillipTodorov/CheckMyEntitlements.git
cd CheckMyEntitlements

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
CheckMyEntitlements/
├── package.json                  # Dependencies & scripts
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Custom brand colours
├── postcss.config.js             # PostCSS + Tailwind
├── .gitignore                    # Ignored files
│
├── app/
│   ├── layout.jsx                # Root layout with header & footer
│   ├── page.jsx                  # Main page — form logic & state management
│   └── globals.css               # Global styles, focus rings, print styles
│
├── components/
│   ├── FormStepper.jsx           # Step progress indicator
│   ├── QuestionField.jsx         # Individual field (radio, select, checkbox, text, number)
│   ├── QuestionGroup.jsx         # Renders visible questions for a section
│   ├── ResultsView.jsx           # Eligibility results display
│   └── PrintButton.jsx           # Save / print button
│
└── lib/
    ├── questions.js              # Section & question definitions with conditional logic
    ├── benefits.js               # Benefit metadata, rules, messages & links
    ├── eligibilityEngine.js      # Rules engine that evaluates answers → eligibility
    └── analytics.js              # Lightweight event tracking (console only)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 13 (App Router) |
| **UI** | React 18 |
| **Styling** | Tailwind CSS 3 |
| **Linting** | ESLint + eslint-config-next |
| **Build** | Next.js compiler |

---

## Privacy & Data

**Everything stays in your browser:**
- No backend server — runs entirely client-side
- No database — nothing is persisted between sessions
- No tracking or analytics sent anywhere
- No cookies
- No data leaves your device

---

## Accessibility

Built with accessibility in mind:

| Feature | Implementation |
|---------|---------------|
| **Keyboard navigation** | Full tab/enter/space support throughout |
| **Screen readers** | ARIA labels, landmarks, roles, and live regions |
| **Skip link** | "Skip to main content" for keyboard users |
| **Focus management** | Focus moves to section heading on step change |
| **Visible focus rings** | Clear focus indicators on all interactive elements |
| **Print styles** | Clean print layout for results page |

---

## Roadmap

**Completed:**
- [x] 5-section guided questionnaire with conditional questions
- [x] 7 UK benefits with eligibility rules and plain English guidance
- [x] Client-side eligibility engine (likely / possibly / unlikely)
- [x] Links to GOV.UK and Citizens Advice for every benefit
- [x] Dark theme UI
- [x] Print-friendly results
- [x] Accessibility (keyboard, screen reader, skip links, focus management)
- [x] Form validation with inline error messages

**Planned:**
- [ ] Save/restore progress with localStorage
- [ ] Additional benefits (Pension Credit, Child Benefit, etc.)
- [ ] Detailed points-based scoring for PIP
- [ ] PDF export of results
- [ ] Multi-language support
- [ ] PWA with offline support

---

## FAQ

**Q: Is this an official government tool?**
A: No. This is an independent guidance tool. You still need to apply for benefits through the official channels (GOV.UK, your local council, etc.).

**Q: Are the results guaranteed?**
A: No. The calculator gives guidance based on your answers, but final decisions are made by the DWP or your local authority. Use the results as a starting point, not a guarantee.

**Q: Is my data safe?**
A: Yes. Everything runs in your browser. No data is sent to any server, stored in any database, or shared with anyone.

**Q: Does it work on mobile?**
A: Yes. The interface is fully responsive and works on any device.

**Q: Which benefits does it cover?**
A: PIP, Universal Credit, ESA, Housing Benefit/UC housing element, Council Tax Reduction, Carer's Allowance, and Attendance Allowance.

**Q: Why only England, Wales, and Scotland?**
A: Northern Ireland has a separate benefits system. This tool currently covers GB only.

---

## Contributing

If you'd like to contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## Disclaimer

This calculator is **not** affiliated with the Department for Work and Pensions (DWP) or any government body. It is a free, independent tool designed to help you understand which benefits might be relevant for your situation. The results are guidance only and are **not** a substitute for professional advice. Always seek guidance from [Citizens Advice](https://www.citizensadvice.org.uk/) or a welfare rights adviser if you need help with a claim.

---

## License

MIT — use it, share it, help someone with it.

---

<p align="center">
  <i>Built because navigating the benefits system shouldn't be this hard.</i>
</p>
