// backend/routes/noteRoutes.js
const express = require("express");
const { getNotes, createNote, generateAINote } = require("../controllers/noteController");
const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.post("/ai", generateAINote);

module.exports = router;