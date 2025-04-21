const express = require("express");
const router = express.Router();
const groqController = require("../controllers/groqController");
router.post("/message", groqController.getGroqResponse);
module.exports = router