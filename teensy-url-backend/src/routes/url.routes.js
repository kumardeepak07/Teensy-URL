const express = require("express");
const rateLimiter = require("../middleware/rateLimiter");
const controller = require("../controllers/url.controller");

const router = express.Router();

router.post("/shorten", controller.createShortUrl);
router.get("/analytics/:shortCode", controller.analytics);
router.get("/:shortCode", controller.redirect);

module.exports = router;
