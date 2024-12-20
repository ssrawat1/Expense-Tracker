import React from "react";

const TitleField = ({ label, id, name, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input autoComplete="off" id={id} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default TitleField;
