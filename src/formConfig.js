export const formConfig = {
  fields: {
    state: {
      label: "State",
      type: "select",
      options: ["NSW", "ACT", "NT", "SA", "VIC"],
    },

    age: {
      label: "Age Group",
      type: "select",
      options: ["Under 18", "18-30", "31-40", "41-50", "51+"],
    },

    scale: {
      label: "Family Type",
      type: "select",
      options: ["Single", "Couple", "Family", "Single Parent"],
    },

    dependents: {
      label: "Dependents",
      type: "number",
      min: 0,
      max: 5,
    },

    cover: {
      label: "Cover Type",
      type: "select",
      options: [
        "Just the basics",
        "Young fit & healthy",
        "Planning a family",
        "Total peace of mind",
        "Hospital only",
        "Extras only",
      ],
    },
  },

  rules: [
    /* ---------- AGE RULES ---------- */
    {
      if: { age: "Under 18" },
      cover: {
        exclude: ["Total peace of mind"],
      },
    },
    {
      if: { age: "51+" },
      cover: {
        exclude: ["Young fit & healthy"],
      },
    },

    /* ---------- SCALE RULES ---------- */
    {
      if: { scale: "Single" },
      cover: {
        exclude: ["Planning a family"],
      },
      set: {
        dependents: { min: 0, max: 0 },
      },
    },
    {
      if: { scale: "Family" },
      cover: {
        allowOnly: [
          "Planning a family",
          "Total peace of mind",
          "Hospital only",
        ],
      },
      set: {
        dependents: { min: 1 },
      },
    },

    /* ---------- STATE RULES ---------- */
    {
      if: { state: "NT" },
      cover: {
        allowOnly: ["Hospital only", "Extras only"],
      },
    },

    /* ---------- COMBINED RULES ---------- */
    {
      if: { age: "Under 18", scale: "Family" },
      cover: {
        allowOnly: ["Planning a family"],
      },
    },
  ],
};
