export function applyRules(selected, options, rules, field) {
  let filtered = [...options];

  rules.forEach((rule) => {
    const match = Object.entries(rule.if).every(
      ([key, value]) => selected[key] === value
    );

    if (match && rule.exclude?.[field]) {
      filtered = filtered.filter((opt) => !rule.exclude[field].includes(opt));
    }
  });

  return filtered;
}
