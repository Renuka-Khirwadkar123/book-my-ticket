const pool = require("../db");

// GET SEATS
exports.getSeats = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM seats");

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch seats",
      error: err.message,
    });
  }
};