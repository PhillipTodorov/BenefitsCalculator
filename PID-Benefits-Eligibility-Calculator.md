# Project Initiation Document

## CheckMyEntitlements
**Core Product Feature**

---

**Document Version:** 1.0  
**Date:** February 2026  
**Author:** Phillip  
**Status:** In Development

---

## 1. Executive Summary

This document outlines the development of a CheckMyEntitlements — a web-based tool designed to help individuals understand which UK welfare benefits they may be eligible for based on their circumstances. The tool is a core feature of the benefits support platform, providing users with an accessible entry point to understanding their entitlements.

The calculator guides users through a series of questions about their health, living situation, employment status, and care needs, then provides a personalised summary of potentially relevant benefits with guidance on next steps.

**Primary Purpose:** Enable users to quickly identify which benefits they may be entitled to claim, reducing the barriers to accessing financial support.

**Secondary Purpose:** Serve as the foundation for a broader benefits application support toolkit, with future features building on the data and user journey established here.

---

## 2. Project Background

### 2.1 Context

The UK benefits system is notoriously complex. There are over 20 distinct benefits and tax credits, each with different eligibility criteria, application processes, and assessment methods. Citizens Advice estimates that £19 billion in benefits goes unclaimed each year, largely because people don't know what they're entitled to or find the application process too daunting.

Existing tools (Turn2us Benefits Calculator, Entitled To, Policy in Practice) provide comprehensive eligibility checks but can be overwhelming for users, particularly those experiencing mental health difficulties or cognitive impairments. There is an opportunity for a streamlined, accessible tool that focuses on the most common benefits and provides clear, actionable guidance.

### 2.2 Strategic Fit

The CheckMyEntitlements is a foundational component of the benefits support platform. It serves as the primary user entry point, helping individuals understand their potential entitlements before proceeding to more detailed application support tools. The calculator:

- Reduces user anxiety by providing clear, personalised guidance
- Captures initial user data that can inform subsequent support features
- Demonstrates the platform's value proposition immediately
- Establishes trust through accessible, jargon-free interaction

### 2.3 Link to Previous Work

This project builds on research conducted for the St Ann's Early Intervention Service PIP application support tool, which identified significant barriers in the benefits application process for people with mental health conditions. The eligibility calculator represents a logical first step in a broader benefits support toolkit.

---

## 3. Project Objectives

### 3.1 Primary Objectives

| Objective | Success Measure |
|-----------|-----------------|
| Launch a functional benefits eligibility tool | Tool is live and accessible to users |
| Enable users to identify relevant benefits quickly | Average completion time under 8 minutes |
| Provide accurate eligibility guidance | Eligibility assessments align with GOV.UK criteria in >90% of test cases |

### 3.2 Secondary Objectives

| Objective | Success Measure |
|-----------|-----------------|
| Build reusable component library for future features | At least 3 components (form stepper, conditional logic handler, results generator) are extractable for PIP application support tool |
| Establish baseline user journey data | Analytics capture completion rates and drop-off points |
| Create foundation for integration with application support features | Data structure supports passing user answers to subsequent tools |

---

## 4. Scope

### 4.1 In Scope

**Benefits Covered:**

The tool will assess potential eligibility for the following benefits, selected based on prevalence and relevance to the target user group:

1. **Personal Independence Payment (PIP)** — disability benefit for those with long-term health conditions affecting daily living or mobility
2. **Universal Credit** — means-tested benefit for those on low income or out of work
3. **Employment and Support Allowance (ESA)** — for those with limited capability for work due to illness or disability
4. **Housing Benefit / UC Housing Element** — help with rent costs
5. **Council Tax Reduction** — reduction in council tax for those on low income
6. **Carer's Allowance** — for those providing substantial care to a disabled person
7. **Attendance Allowance** — for those over State Pension age with care needs

**Functional Requirements:**

- Multi-step questionnaire with progress indicator
- Conditional question logic (questions appear/disappear based on previous answers)
- Real-time eligibility assessment (no server round-trips required)
- Results summary with benefit-by-benefit breakdown
- "What to do next" guidance for each potentially eligible benefit
- Print/save results functionality
- Fully responsive design (mobile-first)
- Accessibility compliance (WCAG 2.1 AA minimum)

**User Journey:**

1. Landing page explaining the tool's purpose and limitations
2. Initial screening questions (age, UK residency, current benefits)
3. Health and disability section (conditions, daily living impact, mobility)
4. Employment and income section (work status, household income)
5. Housing section (tenure type, rent amount, council tax band)
6. Caring responsibilities section
7. Results page with eligibility summary
8. Detailed guidance for each benefit with next steps

### 4.2 Out of Scope

- Actual benefit calculations (amounts payable)
- Integration with government systems (DWP, HMRC)
- User accounts or data persistence
- Welsh language version (future enhancement)
- Scottish-specific benefits (Scottish Child Payment, etc.)
- Northern Ireland benefits system
- Detailed appeals guidance
- Form-filling assistance (separate tool)

### 4.3 Assumptions

- Users have basic digital literacy and internet access
- Users are answering questions about their own circumstances (not on behalf of others, except for caring questions)
- Benefit rules are based on current (February 2026) regulations
- Tool provides guidance only, not definitive eligibility determination

### 4.4 Constraints

- Initial development phase targeted at 4-6 hours for MVP
- No budget for external services or APIs in current phase
- Must be deployable on free-tier hosting (Vercel) initially
- Single developer (no team resources)

---

## 5. Technical Approach

### 5.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend Framework | React (Next.js) | Industry standard, excellent for form-heavy apps, good SEO |
| Styling | Tailwind CSS | Rapid development, consistent design system |
| State Management | React useState/useReducer | Sufficient for single-session form data |
| Eligibility Logic | Client-side JavaScript | No server needed, instant results, privacy-preserving |
| Deployment | Vercel | Free tier, instant deploys, good performance |
| Development | Cursor AI | Rapid vibecoding development |

### 5.2 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ Landing │→ │  Form   │→ │ Results │→ │ Guidance│    │
│  │  Page   │  │ Stepper │  │ Summary │  │  Pages  │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Application Logic                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Form State  │  │ Conditional  │  │  Eligibility │  │
│  │  Management  │  │    Logic     │  │    Engine    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Question   │  │  Eligibility │  │   Guidance   │  │
│  │   Config     │  │    Rules     │  │   Content    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Eligibility Logic Design

The eligibility engine will use a rule-based approach with each benefit defined as a set of conditions:

```javascript
// Example structure (simplified)
const benefits = {
  pip: {
    name: "Personal Independence Payment",
    conditions: [
      { field: "age", operator: "between", value: [16, 66] },
      { field: "ukResident", operator: "equals", value: true },
      { field: "healthConditionDuration", operator: "greaterThan", value: 3 },
      { field: "dailyLivingDifficulty", operator: "greaterThan", value: 0 },
    ],
    logic: "AND", // all conditions must be met
    result: {
      eligible: "You may be eligible for PIP",
      notEligible: "You're unlikely to be eligible for PIP",
      uncertain: "You might be eligible for PIP — it's worth applying"
    }
  }
};
```

Each benefit will return one of three states: likely eligible, unlikely eligible, or uncertain (worth applying). The uncertain category is important because many benefits have subjective assessment criteria.

### 5.4 Accessibility Considerations

- Semantic HTML throughout
- ARIA labels on all form controls
- Keyboard navigation support
- Focus management between form steps
- Error messages linked to inputs
- Sufficient colour contrast (4.5:1 minimum)
- No time limits on form completion
- Clear, simple language (aim for reading age 9-11)

---

## 6. User Experience Design

### 6.1 Design Principles

1. **Reassuring, not overwhelming** — The benefits system is intimidating. The tool should feel supportive and non-judgmental.

2. **Progressive disclosure** — Show only relevant questions. Don't ask about caring responsibilities if the user has already indicated they receive full-time care themselves.

3. **Plain English** — Avoid jargon. "Do you need help with everyday tasks like washing or getting dressed?" not "Do you have limited capability for daily living activities?"

4. **Honest about limitations** — The tool provides guidance, not guarantees. Set expectations clearly.

5. **Action-oriented results** — Don't just say "you might be eligible." Say "Here's what to do next" with specific links and steps.

### 6.2 Question Flow

**Section 1: About You (5 questions)**
- What is your age?
- Do you live in England, Wales, or Scotland?
- Are you a UK resident (lived here for at least 2 of the last 3 years)?
- Are you currently receiving any benefits? (multi-select)
- What is your current living situation? (own, rent, live with family, etc.)

**Section 2: Health and Disability (6 questions)**
- Do you have a health condition, disability, or illness that affects your daily life?
- How long have you had this condition? (less than 3 months, 3-9 months, 9+ months)
- Does your condition affect your ability to do everyday activities like cooking, washing, or getting dressed?
- Does your condition affect your ability to get around, either indoors or outdoors?
- Do you need help or supervision from another person because of your condition?
- Are you currently waiting for or recovering from treatment that might improve your condition?

**Section 3: Work and Income (5 questions)**
- What is your current work situation? (employed, self-employed, unemployed, unable to work, retired, student)
- If employed: how many hours per week do you work?
- What is your approximate household income per month after tax?
- Do you have savings over £16,000? (Yes/No/Prefer not to say)
- Do you live with a partner? If yes, are they working?

**Section 4: Housing (4 questions)**
- Do you rent your home?
- If renting: how much is your rent per month?
- Do you pay council tax?
- Do you live in supported housing or temporary accommodation?

**Section 5: Caring (3 questions)**
- Do you provide regular care for someone who is disabled, ill, or elderly?
- If yes: how many hours per week do you provide care?
- Does the person you care for receive a disability benefit (PIP, DLA, Attendance Allowance)?

**Total: ~23 questions, but conditional logic means most users will see 12-15**

### 6.3 Results Page Design

The results page will show:

1. **Summary banner** — "Based on your answers, you may be eligible for X benefits"

2. **Benefit cards** — One card per benefit with:
   - Benefit name
   - Eligibility status (green tick, amber question mark, or grey X)
   - One-sentence explanation
   - "Learn more" expansion with next steps

3. **Important caveats** — Clear statement that this is guidance only, eligibility depends on full assessment

4. **Save/print option** — Generate a summary the user can save or print

5. **Feedback prompt** — "Was this helpful?" with thumbs up/down (for future iterations)

---

## 7. Content Requirements

### 7.1 Content to be Created

| Content Type | Description | Word Count (approx) |
|--------------|-------------|---------------------|
| Landing page copy | Explanation of tool, limitations, privacy | 200 |
| Question text | 23 questions with helper text | 400 |
| Eligibility explanations | 7 benefits × 3 states | 700 |
| Next steps guidance | 7 benefits × action steps | 500 |
| Caveats and disclaimers | Legal/accuracy disclaimers | 150 |
| **Total** | | **~1,950 words** |

### 7.2 Content Sources

- GOV.UK benefits pages (authoritative source for eligibility criteria)
- Citizens Advice benefits information
- Turn2us benefits guides
- Disability Rights UK factsheets

### 7.3 Content Principles

- Write at a reading age of 9-11 (use Hemingway Editor to check)
- Use "you" and "your" — direct address
- Avoid conditional tense where possible ("You can apply" not "You may be able to apply")
- Include specific numbers and thresholds where relevant
- Link to official sources for detailed information

---

## 8. Project Timeline

### 8.1 Development Schedule

| Phase | Activities | Duration | Status |
|-------|------------|----------|--------|
| **Setup** | Project scaffolding, component structure, Tailwind config | 30 min | ✓ Complete |
| **Form Development** | Question components, stepper logic, conditional display | 2 hours | ✓ Complete |
| **Eligibility Engine** | Rule definitions, calculation logic, result generation | 1 hour | ✓ Complete |
| **Results Page** | Summary display, benefit cards, next steps content | 1 hour | ✓ Complete |
| **Polish** | Responsive testing, accessibility check, copy refinement | 30 min | In Progress |
| **Deployment** | Vercel setup, domain config, final testing | 30 min | Pending |
| **Documentation** | User guide, technical documentation | 30 min | Pending |
| **Total** | | **6 hours** | |

### 8.2 Milestones

| Milestone | Deliverable | Status |
|-----------|-------------|--------|
| M1 | Working form with all questions | ✓ Complete |
| M2 | Eligibility logic returning results | ✓ Complete |
| M3 | Complete UI with results page | ✓ Complete |
| M4 | Deployed and documented | Pending |

---

## 9. Quality Assurance

### 9.1 Testing Approach

Given the compressed timeline, testing will focus on:

1. **Functional testing** — Complete the form with 3-4 different user personas to verify logic
2. **Responsive testing** — Check on mobile (375px), tablet (768px), and desktop (1280px)
3. **Accessibility testing** — Run aXe browser extension, test keyboard navigation
4. **Cross-browser** — Verify in Chrome and Safari (most common browsers)

### 9.2 Test Personas

| Persona | Key Characteristics | Expected Results |
|---------|---------------------|------------------|
| Sarah, 34 | Depression, unable to work, renting, single | PIP, UC, Housing Element, Council Tax Reduction |
| Mohammed, 58 | Diabetes + mobility issues, part-time work, owns home | PIP, possibly ESA |
| Janet, 72 | Arthritis, needs help with daily tasks, homeowner | Attendance Allowance, Council Tax Reduction |
| David, 28 | Full-time employed, cares for disabled mother 40hrs/week | Carer's Allowance |

### 9.3 Acceptance Criteria

- [x] All 23 questions display correctly with appropriate conditional logic
- [x] Each of the 7 benefits returns accurate eligibility assessment for test personas
- [x] Results page displays clearly with actionable next steps
- [x] Form is completable using keyboard only
- [ ] No accessibility errors reported by aXe
- [ ] Page loads in under 2 seconds on 3G connection
- [ ] Tool works correctly on iOS Safari and Android Chrome

---

## 10. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Eligibility logic errors | Medium | High | Use GOV.UK as authoritative source; include "uncertain" category for edge cases; add disclaimer |
| Scope creep (adding more benefits) | Medium | Medium | Strict scope boundary; document future enhancements separately |
| Accessibility issues | Low | High | Use semantic HTML; test with aXe; follow established patterns |
| Deployment issues | Low | Low | Use proven Vercel workflow; have Netlify as backup |
| Content takes longer than expected | Medium | Medium | Draft content first; use GOV.UK wording as starting point |

---

## 11. Future Enhancements

The following are explicitly out of scope for this portfolio version but represent potential future development:

1. **Welsh language version** — Required for deployment with Welsh organisations
2. **Scottish benefits** — Scottish Child Payment, Best Start Grant, etc.
3. **Benefit amount estimates** — Calculate approximate weekly/monthly amounts
4. **Save and return** — Allow users to save progress and return later
5. **Advisor mode** — Version for support workers to use with clients
6. **Integration with application forms** — Pre-populate GOV.UK forms with answers
7. **Localised signposting** — Connect users with local advice services based on postcode
8. **Analytics dashboard** — For deploying organisations to understand user needs

---

## 12. Success Metrics

### 12.1 Launch Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Tool deployed and accessible | Live URL available | Manual verification |
| All 7 benefits assessed correctly | 100% accuracy against test personas | QA testing |
| Accessibility compliance | WCAG 2.1 AA | aXe audit |

### 12.2 Usage Metrics (Post-Launch)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Form completion rate | >60% | Analytics |
| Time to complete | <8 minutes | Analytics |
| User satisfaction | >80% positive | Feedback widget |

---

## 13. Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Project Owner | Phillip | | |
| Developer | Phillip | | |

---

## Appendix A: Eligibility Criteria Summary

### Personal Independence Payment (PIP)

**Basic criteria:**
- Aged 16 to State Pension age (currently 66)
- Difficulty with daily living activities OR mobility
- Difficulties have lasted at least 3 months and expected to last at least 9 more months
- UK resident (2 of last 3 years)
- Not subject to immigration control

**Assessment:** Points-based assessment of daily living and mobility activities

### Universal Credit

**Basic criteria:**
- Aged 18+ (or 16-17 in specific circumstances)
- Under State Pension age
- UK resident
- Less than £16,000 in savings
- Not in full-time education (with exceptions)
- Working less than full-time OR on low income

**Assessment:** Income and capital assessment; work capability assessment if health condition

### Employment and Support Allowance (ESA)

**Basic criteria:**
- Limited capability for work due to illness or disability
- Under State Pension age
- Not receiving Statutory Sick Pay
- National Insurance contributions (contributory) OR low income (income-related)

**Assessment:** Work Capability Assessment

### Housing Benefit / UC Housing Element

**Basic criteria:**
- Renting from a private landlord, housing association, or council
- On low income or receiving means-tested benefits
- Less than £16,000 in savings (Housing Benefit)

**Assessment:** Rent amount vs Local Housing Allowance rates; bedroom calculation

### Council Tax Reduction

**Basic criteria:**
- Responsible for paying council tax
- On low income or receiving qualifying benefits

**Assessment:** Varies by local authority; typically linked to income

### Carer's Allowance

**Basic criteria:**
- Caring for someone who receives a qualifying disability benefit
- Providing care for at least 35 hours per week
- Not in full-time education (21+ hours)
- Earning less than £151 per week (after deductions)
- Aged 16+

**Assessment:** Verification of care recipient's benefits; earnings check

### Attendance Allowance

**Basic criteria:**
- State Pension age or over
- Physical or mental disability requiring help with personal care
- Needs have existed for at least 6 months (unless terminally ill)
- UK resident

**Assessment:** Needs-based assessment of care and supervision requirements

---

## Appendix B: Implementation

The CheckMyEntitlements has been built as a React application with the following components:

- Multi-step form with 5 sections and ~23 questions
- Conditional question logic based on user answers
- Client-side eligibility engine evaluating 7 benefits
- Results page with status badges, explanations, and next steps
- Print functionality for saving results
- Fully responsive design (mobile-first)
- Accessible form controls with ARIA labels

**File:** `checkmyentitlements.jsx`

---

## Appendix C: Content

All content has been drafted and implemented in the calculator, including:

- Landing page copy explaining the tool's purpose and limitations
- Question text for all 23 questions with helper text where needed
- Eligibility explanations for all 7 benefits across all status types
- Next steps guidance for each benefit
- Appropriate caveats and disclaimers

---

**Document End**
