import React from "react";

const field = ({
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
}) => (
  <div className="form-group p-2">
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder || label}
      name={name}
      id={name}
      disabled
      className={"form-control" + (error && " is-invalid")}
    />
    {error && <p className="">{error}</p>}
  </div>
);

export default field;
