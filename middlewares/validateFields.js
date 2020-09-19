const { request, response, next } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req = request, res = response, next = next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  } else {
    next();
  }
};

module.exports = { validateFields };
