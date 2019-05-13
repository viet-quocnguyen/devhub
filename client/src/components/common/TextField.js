import React from "react";
import PropTypes from "prop-types";

function TextField({ type, placeholder, name, value, onChange, error, info }) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={`${error ? "is-invalid" : ""} form-control form-control-lg`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        info={info}
      />
      <div className="invalid-feedback">{error}</div>
      <small className="form-text text-muted">{info}</small>
    </div>
  );
}

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextField;
