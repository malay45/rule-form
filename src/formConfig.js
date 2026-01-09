export const formConfig = {
  state: {
    type: "click",
    value: ["NSW", "ACT", "NT", "SA"],
  },
  age: {
    type: "click",
    value: ["Under 18", "31-40", "41-50"],
  },
  scale: {
    type: "click",
    value: ["Single", "Couple", "Family"],
  },
  cover: {
    type: "click",
    value: [
      "Just the basics",
      "Young fit & healthy",
      "Planning a family",
      "Total peace of mind",
    ],
  },

  rules: [
    {
      if: { age: "Under 18" },
      exclude: { cover: ["Total peace of mind"] },
    },
    {
      if: { scale: "Single" },
      exclude: { cover: ["Planning a family"] },
    },
    {
      if: { state: "NT" },
      exclude: { cover: ["Young fit & healthy"] },
    },
  ],
};
