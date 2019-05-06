const validator = require("validator");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = validateInput = data => {
  let errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Email must be in the email format";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
