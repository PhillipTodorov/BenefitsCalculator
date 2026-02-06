export const SECTIONS = [
  {
    id: "aboutYou",
    shortTitle: "About you",
    title: "About you",
    summary: "Age, where you live, and your current situation.",
    description:
      "These questions help check which parts of the UK benefits system are likely to apply to you."
  },
  {
    id: "health",
    shortTitle: "Health",
    title: "Health and disability",
    summary: "How your health affects your daily life and mobility.",
    description:
      "These questions look at how any health conditions or disabilities affect your day-to-day life."
  },
  {
    id: "workIncome",
    shortTitle: "Work & money",
    title: "Work and income",
    summary: "Your work situation, income, and savings.",
    description:
      "These questions help identify means-tested benefits that depend on income and savings."
  },
  {
    id: "housing",
    shortTitle: "Housing",
    title: "Housing",
    summary: "Your housing costs and council tax.",
    description:
      "These questions relate to help with rent and council tax, if you pay them."
  },
  {
    id: "caring",
    shortTitle: "Caring",
    title: "Caring responsibilities",
    summary: "If you regularly care for someone else.",
    description:
      "These questions check whether you might get help because you care for someone who is disabled or ill."
  }
];

export const QUESTIONS = [
  // Section 1: About You
  {
    id: "age",
    section: "aboutYou",
    label: "What is your age?",
    description: "Please enter your age in years.",
    type: "number",
    required: true,
    min: 0,
    max: 120
  },
  {
    id: "nation",
    section: "aboutYou",
    label: "Do you live in England, Wales, or Scotland?",
    description:
      "This calculator currently covers England, Wales, and Scotland only.",
    type: "select",
    required: true,
    options: [
      { value: "england", label: "England" },
      { value: "wales", label: "Wales" },
      { value: "scotland", label: "Scotland" },
      { value: "other", label: "Somewhere else" }
    ]
  },
  {
    id: "ukResident",
    section: "aboutYou",
    label: "Are you a UK resident?",
    description:
      "This usually means you have lived in the UK for at least 2 of the last 3 years.",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "notSure", label: "I'm not sure" }
    ]
  },
  {
    id: "currentBenefits",
    section: "aboutYou",
    label: "Are you currently receiving any benefits?",
    description:
      "For your reference only. This does not affect your results but may help you when reading the guidance.",
    type: "text",
    required: false
  },
  {
    id: "livingSituation",
    section: "aboutYou",
    label: "What is your current living situation?",
    description: "Choose the option that best describes where you live.",
    type: "select",
    required: true,
    options: [
      { value: "rent", label: "I rent my home" },
      { value: "own", label: "I own my home (with or without a mortgage)" },
      { value: "family", label: "I live with family or friends" },
      { value: "supported", label: "I live in supported or temporary housing" },
      { value: "other", label: "Something else" }
    ]
  },

  // Section 2: Health and Disability
  {
    id: "hasHealthCondition",
    section: "health",
    label:
      "Do you have a health condition, disability, or illness that affects your daily life?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "notSure", label: "I'm not sure" }
    ]
  },
  {
    id: "conditionDuration",
    section: "health",
    label: "How long have you had this condition?",
    type: "select",
    required: true,
    options: [
      { value: "<3", label: "Less than 3 months" },
      { value: "3-9", label: "3\u20139 months" },
      { value: "9+", label: "More than 9 months" }
    ],
    visibleWhen: (answers) => answers.hasHealthCondition === "yes"
  },
  {
    id: "dailyLivingDifficulty",
    section: "health",
    label:
      "Does your condition affect your ability to do everyday activities like cooking, washing, or getting dressed?",
    type: "select",
    required: true,
    options: [
      { value: "none", label: "No, or only very slightly" },
      { value: "some", label: "Yes, it makes some things harder" },
      { value: "aLot", label: "Yes, I often need help or it takes a long time" }
    ],
    visibleWhen: (answers) => answers.hasHealthCondition === "yes"
  },
  {
    id: "mobilityDifficulty",
    section: "health",
    label:
      "Does your condition affect your ability to get around, either indoors or outdoors?",
    type: "select",
    required: true,
    options: [
      { value: "none", label: "No, or only very slightly" },
      { value: "some", label: "Yes, short distances or stairs can be hard" },
      {
        value: "aLot",
        label: "Yes, I struggle to walk or move around without help"
      }
    ],
    visibleWhen: (answers) => answers.hasHealthCondition === "yes"
  },
  {
    id: "needsHelpFromAnotherPerson",
    section: "health",
    label: "Do you need help or supervision from another person?",
    description:
      "For example with washing, dressing, cooking, taking medication, or staying safe.",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "sometimes", label: "Sometimes" }
    ],
    visibleWhen: (answers) => answers.hasHealthCondition === "yes"
  },
  {
    id: "treatmentChangeExpected",
    section: "health",
    label:
      "Are you currently waiting for or recovering from treatment that might improve your condition?",
    type: "radio",
    required: false,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "notSure", label: "I'm not sure" }
    ],
    visibleWhen: (answers) => answers.hasHealthCondition === "yes"
  },

  // Section 3: Work and Income
  {
    id: "workSituation",
    section: "workIncome",
    label: "What is your current work situation?",
    type: "select",
    required: true,
    options: [
      { value: "employed", label: "Employed" },
      { value: "selfEmployed", label: "Self-employed" },
      { value: "unemployed", label: "Unemployed and looking for work" },
      { value: "unableToWork", label: "Unable to work because of health" },
      { value: "retired", label: "Retired" },
      { value: "student", label: "In full-time education" }
    ]
  },
  {
    id: "workHoursPerWeek",
    section: "workIncome",
    label: "If you are working, how many hours per week do you usually work?",
    type: "number",
    required: false,
    min: 0,
    max: 168,
    visibleWhen: (answers) =>
      answers.workSituation === "employed" ||
      answers.workSituation === "selfEmployed"
  },
  {
    id: "householdIncome",
    section: "workIncome",
    label: "What is your approximate household income per month after tax?",
    description:
      "Include wages, benefits, and pensions for you and any partner you live with.",
    type: "number",
    required: true,
    min: 0,
    max: 50000
  },
  {
    id: "savingsOver16k",
    section: "workIncome",
    label: "Do you have savings over \u00a316,000?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes, over \u00a316,000" },
      { value: "no", label: "No, less than \u00a316,000" },
      { value: "notSure", label: "I'm not sure" }
    ]
  },
  {
    id: "liveWithPartner",
    section: "workIncome",
    label: "Do you live with a partner?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "partnerWorking",
    section: "workIncome",
    label: "If you live with a partner, are they working?",
    type: "radio",
    required: false,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "notSure", label: "I'm not sure" }
    ],
    visibleWhen: (answers) => answers.liveWithPartner === "yes"
  },

  // Section 4: Housing
  {
    id: "rentHome",
    section: "housing",
    label: "Do you rent your home?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "rentAmount",
    section: "housing",
    label: "If you rent, how much is your rent per month?",
    type: "number",
    required: false,
    min: 0,
    max: 10000,
    visibleWhen: (answers) => answers.rentHome === "yes"
  },
  {
    id: "paysCouncilTax",
    section: "housing",
    label: "Do you pay council tax for your home?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "included", label: "It is included in my rent" }
    ]
  },
  {
    id: "supportedHousing",
    section: "housing",
    label: "Do you live in supported housing or temporary accommodation?",
    type: "radio",
    required: false,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "notSure", label: "I'm not sure" }
    ]
  },

  // Section 5: Caring
  {
    id: "providesCare",
    section: "caring",
    label:
      "Do you provide regular care for someone who is disabled, ill, or elderly?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "careHoursPerWeek",
    section: "caring",
    label: "If yes, how many hours per week do you usually provide care?",
    type: "number",
    required: false,
    min: 0,
    max: 168,
    visibleWhen: (answers) => answers.providesCare === "yes"
  },
  {
    id: "personGetsDisabilityBenefit",
    section: "caring",
    label:
      "Does the person you care for receive a disability benefit (PIP, DLA, or Attendance Allowance)?",
    type: "radio",
    required: false,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "notSure", label: "I'm not sure" }
    ],
    visibleWhen: (answers) => answers.providesCare === "yes"
  }
];
