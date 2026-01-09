import React, { useState, useMemo } from "react";
import { formConfig } from "./formConfig";
import { applyRules } from "./ruleEngine";

function App() {
  const [selected, setSelected] = useState({
    state: "",
    age: "",
    scale: "",
    cover: "",
  });

  const handleChange = (field, value) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
      ...(field !== "cover" && { cover: "" }), // reset cover if dependency changes
    }));
  };

  const coverOptions = useMemo(() => {
    return applyRules(
      selected,
      formConfig.cover.value,
      formConfig.rules,
      "cover"
    );
  }, [selected]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Rule-Driven Form</h2>

      {/* State */}
      <SelectField
        label="State"
        value={selected.state}
        options={formConfig.state.value}
        onChange={(v) => handleChange("state", v)}
      />

      {/* Age */}
      <SelectField
        label="Age"
        value={selected.age}
        options={formConfig.age.value}
        onChange={(v) => handleChange("age", v)}
      />

      {/* Scale */}
      <SelectField
        label="Scale"
        value={selected.scale}
        options={formConfig.scale.value}
        onChange={(v) => handleChange("scale", v)}
      />

      {/* Cover (rule-filtered) */}
      <SelectField
        label="Cover"
        value={selected.cover}
        options={coverOptions}
        onChange={(v) => handleChange("cover", v)}
      />

      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <br />
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
