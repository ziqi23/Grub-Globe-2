const express = require("express");
const router = express.Router();

const { isProduction } = require("../../config/keys");
if (!isProduction) {
  router.get("/restore", function (req, res, next) {
    res.status(200).json({
      "CSRF-Token": req.csrfToken(),
    });
  });
}

module.exports = router;
