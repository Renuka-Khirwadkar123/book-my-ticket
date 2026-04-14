const pool = require("../db");

exports.bookSeats = async (req, res) => {
  let client;

  try {
    const { id, name } = req.params;

    
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    client = await pool.connect();

    await client.query("BEGIN");

    const selectQuery = `
      SELECT * FROM seats 
      WHERE id = $1 AND isbooked = false
      FOR UPDATE
    `;

    const result = await client.query(selectQuery, [id]);

  

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        error: "Seat already booked"
      });
    }

    const seat = result.rows[0];

    const updateQuery = `
      UPDATE seats 
      SET isbooked = true, name = $2 
      WHERE id = $1
      RETURNING *
    `;

    const updateResult = await client.query(updateQuery, [id, name]);

    await client.query(
      `INSERT INTO bookings (show_id, seat_number, user_id, status)
       VALUES ($1, $2, $3, 'booked')
       ON CONFLICT (show_id, seat_number) DO NOTHING`,
      [seat.show_id, seat.seat_number, req.user.id]
    );

    await client.query("COMMIT");

    res.json({
      message: "Seat booked successfully",
      booking: updateResult.rows[0],
      user_id: req.user.id
    });

  } catch (err) {
    if (client) await client.query("ROLLBACK");

    res.status(500).json({
      message: "Booking failed",
      error: err.message
    });

  } finally {
    if (client) client.release();
  }
};