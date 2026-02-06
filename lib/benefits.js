export const BENEFITS = {
  pip: {
    id: "pip",
    name: "Personal Independence Payment (PIP)",
    shortDescription:
      "Extra money if you have a long-term health condition or disability that affects daily living or mobility.",
    conditions: [
      { field: "age", operator: "betweenInclusive", value: [16, 66] },
      { field: "nation", operator: "in", value: ["england", "wales", "scotland"] },
      { field: "ukResident", operator: "equals", value: "yes" },
      { field: "hasHealthCondition", operator: "equals", value: "yes" },
      { field: "conditionDuration", operator: "in", value: ["3-9", "9+"] }
    ],
    extraChecks: (answers) => {
      const daily = answers.dailyLivingDifficulty;
      const mobility = answers.mobilityDifficulty;
      const help = answers.needsHelpFromAnotherPerson;

      const strongDifficulty =
        daily === "aLot" || mobility === "aLot" || help === "yes";
      const someDifficulty =
        daily === "some" || mobility === "some" || help === "sometimes";

      if (strongDifficulty) return "likely";
      if (someDifficulty) return "uncertain";
      return "unlikely";
    },
    messages: {
      likely: {
        short: "You may be eligible for PIP based on your age, residency and how your condition affects you.",
        long: "PIP is for people aged 16 to State Pension age whose long-term health condition or disability makes daily living or moving around harder. Based on your answers, it looks like you meet the basic rules and your difficulties may score enough points in the assessment. It is usually worth making a claim."
      },
      uncertain: {
        short: "You might be eligible for PIP \u2013 it is worth checking in more detail.",
        long: "You meet some of the basic rules for PIP and your condition has some impact on daily living or mobility. Whether you qualify will depend on the details of how you are affected on most days. It may be worth making a claim or speaking to an adviser to go through your situation."
      },
      unlikely: {
        short: "You are unlikely to be eligible for PIP based on your answers.",
        long: "From what you have told us, it does not look like you have enough ongoing difficulties with daily living or mobility to meet the PIP rules. If your condition changes, or if we have not captured your situation fully, you may still want to check with an adviser."
      }
    },
    nextSteps: [
      "Read the PIP eligibility guidance on GOV.UK.",
      "Think about how your condition affects you on a bad day and most days, not just good days.",
      "Consider speaking to a welfare rights adviser before you make a claim."
    ],
    links: {
      official: "https://www.gov.uk/pip/eligibility",
      support: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/"
    }
  },
  universalCredit: {
    id: "universalCredit",
    name: "Universal Credit",
    shortDescription:
      "A means-tested benefit for people on a low income or out of work.",
    conditions: [
      { field: "age", operator: "greaterOrEqual", value: 18 },
      { field: "age", operator: "lessThan", value: 66 },
      { field: "nation", operator: "in", value: ["england", "wales", "scotland"] },
      { field: "savingsOver16k", operator: "notEquals", value: "yes" }
    ],
    extraChecks: (answers) => {
      const income = Number(answers.householdIncome ?? 0);
      const workSituation = answers.workSituation;

      if (!income || income < 1400 || workSituation === "unemployed") {
        return "likely";
      }
      if (income < 2200) {
        return "uncertain";
      }
      return "unlikely";
    },
    messages: {
      likely: {
        short: "You may be eligible for Universal Credit based on your age, savings and income.",
        long: "Universal Credit can top up low income or support you if you are out of work. From your age, where you live, and your savings and income, it looks like you may meet the basic rules. The exact amount depends on your full circumstances, including rent and children."
      },
      uncertain: {
        short: "You might be eligible for Universal Credit depending on your full circumstances.",
        long: "Your income may be towards the upper end for Universal Credit. Whether you qualify, and for how much, will depend on details such as rent, children, disabilities and your partner\u2019s situation. It is worth checking with an online calculator or adviser."
      },
      unlikely: {
        short: "You are unlikely to be eligible for Universal Credit based on your income and savings.",
        long: "From your answers, your income or savings may be too high for Universal Credit. If your circumstances change \u2013 for example if your income falls or you stop work \u2013 it may be worth checking again."
      }
    },
    nextSteps: [
      "Use the full GOV.UK or Turn2us calculators for a more detailed check.",
      "If you rent, make sure you include your housing costs when checking UC.",
      "If you have a health condition, ask about getting your work capability assessed."
    ],
    links: {
      official: "https://www.gov.uk/universal-credit/eligibility",
      support: "https://www.citizensadvice.org.uk/benefits/universal-credit/"
    }
  },
  esa: {
    id: "esa",
    name: "Employment and Support Allowance (new style or income-related)",
    shortDescription:
      "For people under State Pension age whose health limits their ability to work.",
    conditions: [
      { field: "age", operator: "lessThan", value: 66 },
      { field: "hasHealthCondition", operator: "equals", value: "yes" }
    ],
    extraChecks: (answers) => {
      if (answers.workSituation === "unableToWork") return "likely";
      if (answers.workSituation === "unemployed") return "uncertain";
      if (
        answers.workSituation === "employed" ||
        answers.workSituation === "selfEmployed"
      ) {
        return "unlikely";
      }
      return "uncertain";
    },
    messages: {
      likely: {
        short: "You may be eligible for Employment and Support Allowance.",
        long: "Because you are under State Pension age and say you are unable to work because of your health, you may be able to claim new style ESA or an income-related equivalent. This will depend on your National Insurance record and any current benefits."
      },
      uncertain: {
        short: "You might be able to claim ESA depending on your work history and health.",
        long: "ESA is for people whose ability to work is limited by illness or disability. Whether you qualify will depend on medical assessments and, for new style ESA, your National Insurance contributions. An adviser can help you check this."
      },
      unlikely: {
        short: "You are less likely to qualify for ESA based on your current work situation.",
        long: "ESA is mainly for people who cannot work or whose ability to work is limited by health problems. If you are working full time without major health restrictions, you are unlikely to qualify. If your health worsens, you may want to check again."
      }
    },
    nextSteps: [
      "Read about new style ESA on GOV.UK.",
      "Check your National Insurance record if you are not on a low income benefit.",
      "Speak to an adviser if you are moving from Statutory Sick Pay or another benefit."
    ],
    links: {
      official: "https://www.gov.uk/employment-support-allowance",
      support: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/esa/"
    }
  },
  housing: {
    id: "housing",
    name: "Housing Benefit / Universal Credit housing element",
    shortDescription:
      "Help with rent if you are on a low income and rent your home.",
    conditions: [
      { field: "rentHome", operator: "equals", value: "yes" }
    ],
    extraChecks: (answers) => {
      const income = Number(answers.householdIncome ?? 0);
      if (!income || income < 1800) return "likely";
      if (income < 2600) return "uncertain";
      return "unlikely";
    },
    messages: {
      likely: {
        short: "You may be able to get help with your rent.",
        long: "Because you rent your home and appear to be on a relatively low income, you may be able to get Housing Benefit (in some cases) or help with housing costs through Universal Credit. The exact amount depends on your rent, where you live, and who lives with you."
      },
      uncertain: {
        short: "You might get some help with rent depending on your full circumstances.",
        long: "Help with rent depends on your income, savings, who lives in your home, and local housing allowance rates. You may still get some help even if your income is higher, so it is worth checking with a full calculator or your council."
      },
      unlikely: {
        short: "You may not get much help with rent based on your income.",
        long: "If your income is relatively high for your area, you might not receive much or any help with rent. If your income drops or your household changes, it is worth checking again."
      }
    },
    nextSteps: [
      "Check your entitlement using a full benefits calculator.",
      "If you already get Universal Credit, look at the housing costs on your statement.",
      "If you are pension age or in supported housing, contact your council about Housing Benefit."
    ],
    links: {
      official: "https://www.gov.uk/housing-benefit",
      support: "https://www.citizensadvice.org.uk/benefits/help-with-your-rent/"
    }
  },
  councilTaxReduction: {
    id: "councilTaxReduction",
    name: "Council Tax Reduction",
    shortDescription:
      "A reduction in your council tax bill if you are on a low income.",
    conditions: [
      { field: "paysCouncilTax", operator: "in", value: ["yes", "included"] }
    ],
    extraChecks: (answers) => {
      const income = Number(answers.householdIncome ?? 0);
      if (!income || income < 2000) return "likely";
      return "uncertain";
    },
    messages: {
      likely: {
        short: "You may be able to get a reduction on your council tax bill.",
        long: "Most councils offer Council Tax Reduction if you are on a low income or get certain benefits. Based on your answers, it is likely you could receive some help, but the rules and amounts vary by council."
      },
      uncertain: {
        short: "You might get some Council Tax Reduction depending on your council\u2019s rules.",
        long: "Each local council runs its own scheme. Even with a higher income, you may still get a small reduction, especially if you live alone or have a disability. You will need to check on your council\u2019s website."
      },
      unlikely: {
        short: "You are less likely to get Council Tax Reduction based on your income.",
        long: "If your income is relatively high, you might not qualify for much or any reduction. If your situation changes, it is worth checking again with your local council."
      }
    },
    nextSteps: [
      "Visit your local council\u2019s website and search for \u201cCouncil Tax Reduction\u201d.",
      "Check if you already receive any discounts, such as single person discount.",
      "Ask your council or an adviser for help if you are unsure how to apply."
    ],
    links: {
      official: "https://www.gov.uk/apply-council-tax-reduction",
      support: "https://www.citizensadvice.org.uk/benefits/help-if-on-a-low-income/help-with-your-council-tax/"
    }
  },
  carersAllowance: {
    id: "carersAllowance",
    name: "Carer\u2019s Allowance",
    shortDescription:
      "For people who provide regular unpaid care for someone who gets a disability benefit.",
    conditions: [
      { field: "age", operator: "greaterOrEqual", value: 16 },
      { field: "providesCare", operator: "equals", value: "yes" }
    ],
    extraChecks: (answers) => {
      const hours = Number(answers.careHoursPerWeek ?? 0);
      const workHours = Number(answers.workHoursPerWeek ?? 0);
      const worksFullTime = workHours >= 35;

      if (hours >= 35 && answers.personGetsDisabilityBenefit === "yes") {
        if (worksFullTime) return "uncertain";
        return "likely";
      }
      if (hours >= 20 && answers.personGetsDisabilityBenefit !== "no") {
        return "uncertain";
      }
      return "unlikely";
    },
    messages: {
      likely: {
        short: "You may be eligible for Carer\u2019s Allowance.",
        long: "Because you provide at least 35 hours of care per week to someone who gets a qualifying disability benefit, you may be able to claim Carer\u2019s Allowance. There is an earnings limit and it can affect the benefits of the person you care for."
      },
      uncertain: {
        short: "You might be able to get Carer\u2019s Allowance depending on your exact hours and earnings.",
        long: "Carer\u2019s Allowance has strict rules about how many hours you care, which benefits the person you care for receives, and how much you earn. You may be close to the threshold, so it is important to check the current earnings limit."
      },
      unlikely: {
        short: "You are unlikely to be eligible for Carer\u2019s Allowance based on your answers.",
        long: "You usually need to care for at least 35 hours per week for someone who gets a qualifying disability benefit to get Carer\u2019s Allowance. If your caring role increases or the person you care for starts getting a disability benefit, you may want to check again."
      }
    },
    nextSteps: [
      "Check how many hours of care you provide in a typical week.",
      "Check whether the person you care for gets PIP, DLA, or Attendance Allowance.",
      "Check your earnings against the current Carer\u2019s Allowance earnings limit."
    ],
    links: {
      official: "https://www.gov.uk/carers-allowance",
      support: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/carers-allowance/"
    }
  },
  attendanceAllowance: {
    id: "attendanceAllowance",
    name: "Attendance Allowance",
    shortDescription:
      "For people over State Pension age who need help with personal care.",
    conditions: [
      { field: "age", operator: "greaterOrEqual", value: 66 },
      { field: "hasHealthCondition", operator: "equals", value: "yes" }
    ],
    extraChecks: (answers) => {
      const help = answers.needsHelpFromAnotherPerson;
      const daily = answers.dailyLivingDifficulty;
      if (help === "yes" || daily === "aLot") return "likely";
      if (help === "sometimes" || daily === "some") return "uncertain";
      return "unlikely";
    },
    messages: {
      likely: {
        short: "You may be eligible for Attendance Allowance.",
        long: "Attendance Allowance is for people over State Pension age who need help with personal care or supervision. Based on your age and the help you need, it looks like you may meet the basic rules."
      },
      uncertain: {
        short: "You might be able to get Attendance Allowance depending on the level of help you need.",
        long: "Whether you qualify for Attendance Allowance depends on how often you need help or supervision. If you have frequent difficulties, it is worth making a claim or speaking to an adviser."
      },
      unlikely: {
        short: "You are less likely to qualify for Attendance Allowance based on your answers.",
        long: "Attendance Allowance is mainly for people who regularly need help with personal care or supervision. If your needs are occasional or minor, you may not qualify, but you can seek advice if you are unsure."
      }
    },
    nextSteps: [
      "Read the Attendance Allowance rules on GOV.UK.",
      "Think about how your needs look over a typical week, including bad days.",
      "Ask a trusted person or adviser to help you describe the help you need."
    ],
    links: {
      official: "https://www.gov.uk/attendance-allowance",
      support: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/attendance-allowance/"
    }
  }
};
