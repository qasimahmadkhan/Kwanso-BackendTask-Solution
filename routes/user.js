const express = require("express");
const passport = require("passport");
const { check } = require("express-validator/check");
const router = express.Router();

const userController = require("../controllers/user");

router.post(
  "/register",
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password", "Password has to be valid.").isLength({ min: 5 }),
  userController.register
);
router.post(
  "/login",
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password", "Password has to be valid.").isLength({ min: 5 }),
  userController.login
);
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

module.exports = router;
