const validator = require("validator");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = validateProfile = data => {
  let errors = {};

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle must not be empty";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status must not be empty";
  }

  if (validator.isEmpty(data.bio)) {
    errors.bio = "Bio must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
