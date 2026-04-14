const pool = require("../db");

exports.bookSeats = async (req, res) => {
  const {show_id, seats } = req.body;

  const user_id = req.user.id;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO bookings(show_id, seat_number, status, user_id)
      SELECT $1, UNNEST($2::text[]), 'booked', $3
      ON CONFLICT (show_id, seat_number) DO NOTHING
       RETURNING *;
    `;

    const result = await client.query(insertQuery, [
      show_id,
      seats,
      user_id
    ]);

    if (result.rows.length !== seats.length) {
      await client.query("ROLLBACK");

      const unavailable_seats = seats.filter( 
        s => !result.rows.some(r => r.seat_number === s)
      );

      return res.status(400).json({
        message: "Some seats already booked",
         unavailable_seats   
  
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
      detail: err.detail,                           // 👈 postgres gives extra detail here
      hint: err.hint  
    });

  } finally {
    client.release();
  }
};