const express = require("express");
const router = express.Router();

const { bookSeats } = require("../controllers/bookings");
const authMiddleware = require("../middlewares/authMiddleware");

// router.post("/", authMiddleware, bookSeats);
router.put("/:id/:name", authMiddleware, bookSeats);

module.exports = router;