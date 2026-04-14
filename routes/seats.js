const express = require("express");
const router = express.Router();

const { getSeats } = require("../controllers/seats");

router.get("/", getSeats);

module.exports = router;