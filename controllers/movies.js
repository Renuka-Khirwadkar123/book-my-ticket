const movies = require("../data/movies");

exports.getMovies = (req, res) => {
  res.json(movies);
};