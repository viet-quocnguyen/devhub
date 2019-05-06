const validator = require("validator");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = validateRegister = data => {
  let errors = {};
  let name = data.name;
  let email = data.email;
  let password = data.password;
  let password2 = data.password2;

  // Name validation
  if (!validator.isLength(name, { min: 3 })) {
    errors.name = "Name must be at least 3 characters";
  }
  if (validator.isEmpty(name)) {
    errors.name = "Name must not be empty";
  }

  // Email validation
  if (!validator.isEmail(email)) {
    errors.email = "Email must be in the email format";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email must not be empty";
  }

  // Password validation
  if (!validator.isLength(password, { min: 5, max: 25 })) {
    errors.password = "Password must be between 5 and 25 characters";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password must not be empty";
  }
  if (password2 != password) {
    errors.password2 = "Confirmed password not correct";
  }
  if (validator.isEmpty(password2)) {
    errors.password2 = "Confirm password must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
