export function applyRules(selected, fieldKey, fieldConfig, rules) {
  let options = fieldConfig.options ? [...fieldConfig.options] : null;
  let min = fieldConfig.min;
  let max = fieldConfig.max;

  rules.forEach((rule) => {
    const matches = Object.entries(rule.if).every(
      ([key, value]) => selected[key] === value
    );

    if (!matches) return;

    if (rule.cover && fieldKey === "cover") {
      if (rule.cover.exclude) {
        options = options.filter((o) => !rule.cover.exclude.includes(o));
      }

      if (rule.cover.allowOnly) {
        options = options.filter((o) => rule.cover.allowOnly.includes(o));
      }
    }

    if (rule.set?.[fieldKey]) {
      min = rule.set[fieldKey].min ?? min;
      max = rule.set[fieldKey].max ?? max;
    }
  });

  return { options, min, max };
}
