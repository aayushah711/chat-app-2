const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Use multer for file uploads

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  (req, res, next) => {
    return req.container.resolve("uploadController").uploadFile(req, res, next);
  }
);

module.exports = router;
