import React from "react";

const Field = ({ name, label, type, onChange, error, onSubmit, value }) => {
  return (
    <div className="formGroup">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default Field;
