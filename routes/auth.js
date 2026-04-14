const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, (req, res) => {
  res.json({ valid: true });
});


module.exports = router;