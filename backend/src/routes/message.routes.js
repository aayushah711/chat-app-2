const express = require("express");
const { validateRequestQuery } = require("../middlewares/user.middleware");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  getMessagesByChatIdValidator,
} = require("../validators/message.validator");
const router = express.Router();

router.get(
  "/",
  authenticateToken,
  validateRequestQuery(getMessagesByChatIdValidator),
  (req, res, next) => {
    return req.container
      .resolve("messageController")
      .getMessagesByChatId(req, res, next);
  }
);

module.exports = router;
