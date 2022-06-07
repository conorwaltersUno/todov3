const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const error = validationResult(req);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(400).json({ error: error.array() });
  } else {
    next();
  }
};
exports.validator = validator;
