# Benefits Eligibility Calculator

A guided questionnaire that helps users in England, Wales, and Scotland check which UK benefits they may be eligible to claim. Built with Next.js, React, and Tailwind CSS.

## Features

- **Step-by-step form** across 5 sections: About You, Health & Disability, Work & Income, Housing, and Caring Responsibilities
- **Conditional questions** that show or hide based on previous answers
- **Client-side eligibility engine** that evaluates answers against benefit rules
- **Results summary** with likely/possibly/unlikely eligibility for each benefit, plus links to GOV.UK and Citizens Advice
- **Accessible** — keyboard navigation, ARIA landmarks, skip links, focus management
- **Privacy-first** — all data stays in the browser; nothing is sent to a server
- **Dark theme** UI
- **Print-friendly** results page

## Tech Stack

- [Next.js](https://nextjs.org/) 13 (App Router)
- [React](https://react.dev/) 18
- [Tailwind CSS](https://tailwindcss.com/) 3

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.jsx          # Root layout with header and footer
  page.jsx            # Main page with form logic and state management
  globals.css         # Global styles and Tailwind directives
components/
  FormStepper.jsx     # Step progress indicator
  QuestionField.jsx   # Individual form field (radio, select, checkbox, text, number)
  QuestionGroup.jsx   # Renders all visible questions for a section
  ResultsView.jsx     # Eligibility results display
  PrintButton.jsx     # Save/print button
lib/
  questions.js        # Section and question definitions
  benefits.js         # Benefit metadata (names, descriptions, links)
  eligibilityEngine.js # Rules that evaluate answers into eligibility results
  analytics.js        # Lightweight event tracking
```

## License

This project is provided as-is for guidance purposes only. It does not guarantee eligibility for any benefit.
