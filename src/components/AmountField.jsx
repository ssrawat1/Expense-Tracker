import React from "react";

const AmountField = ({ label, id, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor="amount">{label}</label>
      <input
        type="number"
        autoComplete="off"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AmountField;
