const pool = require("../db");

// CREATE SHOW
exports.createShow = async (req, res) => {
  const { movie_id, show_time, price } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO shows(movie_id, show_time, price) VALUES ($1,$2,$3) RETURNING *",
      [movie_id, show_time, price]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: "Failed to create show",
      error: err.message,
    });
  }
};

// GET SHOWS
exports.getShows = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, m.title, s.show_time, s.price
      FROM shows s
      JOIN movies m ON m.id = s.movie_id
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch shows",
      error: err.message,
    });
  }
};