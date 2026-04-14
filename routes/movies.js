const express = require("express");
const router = express.Router();

const { addMovie, getMovies } = require("../controllers/movies");
const authMiddleware = require("../middlewares/authMiddleware");

// router.post("/",authMiddleware, addMovie);
router.get("/",authMiddleware, getMovies);

module.exports = router;