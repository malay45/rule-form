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

/* ---------------- URL & Name Combinations ---------------- */

const urls = ["https://example.com/page1", "https://example.com/page2"];
const names = ["Alice", "Bob"];

// 2 nested loops to create all combinations
for (const url of urls) {
  for (const name of names) {
    // Dynamically create test title
    const testTitle = `Test rules for ${name} on ${url}`;

    test(testTitle, async ({ page }) => {
      // Go to the URL
      await page.goto(url);

      // Example: generate random age between min and max
      const age =
        Math.floor(
          Math.random() *
            (ruleConfig.fields.age.max - ruleConfig.fields.age.min + 1)
        ) + ruleConfig.fields.age.min;

      // Apply rules
      const options = applyRules(age);

      // You can do more: e.g., select age in form, check options in UI, etc.
      console.log(
        `Name: ${name}, URL: ${url}, Age: ${age}, Cover options: ${options}`
      );

      // Example assertion for demo
      expect(Array.isArray(options)).toBe(true);
      expect(options.length).toBeGreaterThan(0);
    });
  }
}
