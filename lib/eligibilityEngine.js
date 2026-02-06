import { BENEFITS } from "./benefits";

function checkCondition(condition, answers) {
  const value = answers[condition.field];
  const { operator } = condition;

  switch (operator) {
    case "equals":
      return value === condition.value;
    case "notEquals":
      return value !== condition.value;
    case "greaterOrEqual":
      return Number(value ?? 0) >= condition.value;
    case "lessThan":
      return Number(value ?? 0) < condition.value;
    case "betweenInclusive": {
      const [min, max] = condition.value;
      const num = Number(value ?? 0);
      return num >= min && num <= max;
    }
    case "in":
      return condition.value.includes(value);
    default:
      return true;
  }
}

export function evaluateBenefit(benefitId, answers) {
  const config = BENEFITS[benefitId];
  if (!config) return { status: "uncertain" };

  const meetsBasics = (config.conditions ?? []).every((cond) =>
    checkCondition(cond, answers)
  );

  if (!meetsBasics) {
    return { status: "unlikely" };
  }

  if (typeof config.extraChecks === "function") {
    const status = config.extraChecks(answers);
    if (status === "likely" || status === "uncertain" || status === "unlikely") {
      return { status };
    }
  }

  return { status: "uncertain" };
}

export function evaluateAllBenefits(answers) {
  const result = {};
  for (const benefitId of Object.keys(BENEFITS)) {
    result[benefitId] = evaluateBenefit(benefitId, answers);
  }
  return result;
}
