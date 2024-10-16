const express = require("express");
const { validateRequestBody } = require("../middlewares/user.middleware.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const { createValidator } = require("../validators/chat.validator.js");
const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validateRequestBody(createValidator),
  (req, res, next) => {
    return req.container.resolve("chatController").createChat(req, res, next);
  }
);

module.exports = router;
