import React from "react";

const SelectField = ({ id, name, value, onChange, label, defaultOption, options }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="" hidden>
          { defaultOption || "Select an option"}
        </option>
        {options?.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
