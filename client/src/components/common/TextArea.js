import React from "react";
import PropTypes from "prop-types";

function TextArea({ placeholder, name, value, onChange, error, info }) {
  return (
    <div className="form-group">
      <textarea
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

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextArea;
