const express = require("express");
const passport = require('passport');
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.getIndex);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user",passport.authenticate('jwt', { session: false}), userController.getUser);

module.exports = router;
