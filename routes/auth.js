const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { loginUser, newUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password has to be 6 or more characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password has to be 6 or more characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  newUser
);

router.get("/renew", [validateJWT], renewToken);

module.exports = router;
