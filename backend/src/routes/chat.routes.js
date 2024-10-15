const express = require("express");
const { validateBadRequest } = require("../middlewares/user.middleware.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const { createValidator } = require("../validators/chat.validator.js");
const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validateBadRequest(createValidator),
  (req, res, next) => {
    return req.container.resolve("chatController").createChat(req, res, next);
  }
);

module.exports = router;
