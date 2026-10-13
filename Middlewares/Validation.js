const { body, validationResult } = require("express-validator");

exports.verifSignUp = [
  body("email", "Not a valid email").isEmail(),
  body("password", "Enter strong password").isStrongPassword(),
];
exports.verifSignIn = [
  body("email", "Not a valid email").isEmail(),
  body("password", "Enter strong password").isStrongPassword(),
];

//Midleware function

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors);
  }
  next();
};
