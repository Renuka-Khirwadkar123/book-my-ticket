const express = require("express");
const router = express.Router();

const { createShow, getShows } = require("../controllers/shows");

router.post("/", createShow);
router.get("/", getShows);

module.exports = router;