const pool = require("../db");

exports.bookSeats = async (req, res) => {
  const { movie_id, show_id, seats } = req.body;

  const user_id = req.user.id;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO bookings(movie_id, show_id, seat_number, status, user_id)
      SELECT $1, $2, UNNEST($3::text[]), 'booked', $4
      ON CONFLICT (show_id, seat_number) DO NOTHING
       RETURNING *;
    `;

    const result = await client.query(insertQuery, [
      movie_id,
      show_id,
      seats,
      user_id
    ]);

    if (result.rows.length !== seats.length) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Some seats already booked",
        unavailable_seats: booked 
      });
    }

    await client.query("COMMIT");

    res.json({
      message: "Seats booked successfully",
      user_id,
      bookings: result.rows,
    });

  } catch (err) {
    await client.query("ROLLBACK");

    res.status(500).json({
      message: "Booking failed",
      error: err.message,
    });

  } finally {
    client.release();
  }
};