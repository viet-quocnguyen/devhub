const validator = require("validator");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = validatePost = data => {
  let errors = {};

  if (!validator.isLength(data.text, { min: 3, max: 300 })) {
    errors.text = "Text must be betwwen 3 and 300 characters";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Text must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
