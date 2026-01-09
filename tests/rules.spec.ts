import { test, expect } from "@playwright/test";

/* ---------------- RULE CONFIG ---------------- */

const ruleConfig = {
  fields: {
    age: {
      type: "number",
      min: 18,
      max: 70,
    },
    cover: {
      type: "select",
      options: ["Basic", "Premium", "Family"],
    },
  },

  rules: [
    {
      when: { age: { lt: 25 } },
      then: { cover: { remove: ["Premium"] } },
    },
    {
      when: { age: { gt: 60 } },
      then: { cover: { allow: ["Basic"] } },
    },
  ],
};

/* ---------------- RULE ENGINE ---------------- */

function applyRules(age: number) {
  let options = [...ruleConfig.fields.cover.options];

  for (const rule of ruleConfig.rules) {
    if (rule.when.age?.lt && age < rule.when.age.lt) {
      options = options.filter((o) => !rule.then.cover.remove?.includes(o));
    }

    if (rule.when.age?.gt && age > rule.when.age.gt) {
      options = options.filter((o) => rule.then.cover.allow?.includes(o));
    }
  }

  return options;
}

/* ---------------- PLAYWRIGHT TEST ---------------- */

test("cover options change based on age", () => {
  expect(applyRules(20)).toEqual(["Basic", "Family"]);
  expect(applyRules(65)).toEqual(["Basic"]);
});
