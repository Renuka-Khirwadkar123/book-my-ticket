const pool = require("../db");

// ADD MOVIE
exports.addMovie = async (req, res) => {
  const { title, language, duration } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO movies(title, language, duration) VALUES ($1,$2,$3) RETURNING *",
      [title, language, duration]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: "Failed to add movie",
      error: err.message
    });
  }
};

// GET MOVIES
exports.getMovies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch movies",
      error: err.message
    });
  }
};