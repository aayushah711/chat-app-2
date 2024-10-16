const express = require("express");
const { validateRequestBody } = require("../middlewares/user.middleware");
const authenticateToken = require("../middlewares/auth.middleware.js");
const {
  registerValidator,
  loginValidator,
} = require("../validators/user.validator");
const router = express.Router();

router.post(
  "/register",
  validateRequestBody(registerValidator),
  (req, res, next) => {
    return req.container.resolve("userController").createUser(req, res, next);
  }
);

router.post("/login", validateRequestBody(loginValidator), (req, res, next) => {
  return req.container.resolve("userController").loginUser(req, res, next);
});

router.post("/logout", authenticateToken, (req, res, next) => {
  return req.container.resolve("userController").logoutUser(req, res, next);
});

module.exports = router;
