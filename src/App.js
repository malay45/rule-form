import React, { useEffect, useState } from "react";
import { formConfig } from "./formConfig";
import { applyRules } from "./ruleEngine";

export default function App() {
  const [values, setValues] = useState({});

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  /* Auto-reset cover if invalid */
  useEffect(() => {
    const coverField = formConfig.fields.cover;
    const { options } = applyRules(
      values,
      "cover",
      coverField,
      formConfig.rules
    );

    if (values.cover && !options.includes(values.cover)) {
      setValues((prev) => ({ ...prev, cover: "" }));
    }
  }, [values]);

  return (
    <div className="container">
      <h2>Rule-Driven Cover Selection</h2>

      {Object.entries(formConfig.fields).map(([key, field]) => {
        const { options, min, max } = applyRules(
          values,
          key,
          field,
          formConfig.rules
        );

        return (
          <div className="field" key={key}>
            <label>{field.label}</label>

            {field.type === "select" && (
              <select
                value={values[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "number" && (
              <>
                <input
                  type="number"
                  min={min}
                  max={max}
                  value={values[key] ?? ""}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                />
                <small>
                  Min {min} / Max {max}
                </small>
              </>
            )}
          </div>
        );
      })}

      <pre className="debug">{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
