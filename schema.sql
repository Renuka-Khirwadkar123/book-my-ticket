-- ============================================================
-- MOVIES
-- ============================================================
CREATE TABLE movies (
  id       SERIAL PRIMARY KEY,
  title    VARCHAR(200) NOT NULL,
  language VARCHAR(50),
  duration INT,                              -- in minutes
  is_active BOOLEAN DEFAULT true             -- soft delete instead of CASCADE wipe
);


-- ============================================================
-- SHOWS
-- ============================================================
CREATE TABLE shows (
  id        SERIAL PRIMARY KEY,
  movie_id  INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  show_time TIMESTAMP NOT NULL,
  price     NUMERIC(10,2) NOT NULL
);


-- ============================================================
-- SEATS  (one row per available seat per show)
-- Seeded automatically when a show is created — see trigger below.
-- ============================================================
CREATE TABLE seats (
  id          SERIAL PRIMARY KEY,
  show_id     INT NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  is_booked   BOOLEAN DEFAULT false,         -- makes availability queries simple
  UNIQUE (show_id, seat_number)
);

CREATE INDEX idx_show_id ON seats(show_id);


-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100),
  email      VARCHAR(100) UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- BOOKINGS
-- user_id defined once, no ALTER TABLE needed.
-- movie_id intentionally omitted — reach it via show → movie.
-- ============================================================
CREATE TABLE bookings (
  id          SERIAL PRIMARY KEY,
  user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  show_id     INT NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  status      VARCHAR(20) DEFAULT 'booked',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (show_id, seat_number)              -- DB-level double-booking prevention
);

CREATE INDEX idx_show_seat ON bookings(show_id, seat_number);


-- ============================================================
-- TRIGGER: auto-seed seats A1–F10 when a new show is inserted
-- ============================================================
CREATE OR REPLACE FUNCTION seed_seats_for_show()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO seats (show_id, seat_number)
  SELECT NEW.id, row_label || col_num
  FROM   unnest(ARRAY['A','B','C','D','E','F']) AS row_label,
         generate_series(1, 10)                 AS col_num;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_seed_seats
AFTER INSERT ON shows
FOR EACH ROW EXECUTE FUNCTION seed_seats_for_show();


-- ============================================================
-- HELPER VIEW: seat availability per show
-- Usage: SELECT * FROM seat_availability WHERE show_id = 1;
-- ============================================================
CREATE VIEW seat_availability AS
SELECT
  s.show_id,
  s.seat_number,
  CASE WHEN b.seat_number IS NULL THEN 'available' ELSE 'booked' END AS status
FROM seats s
LEFT JOIN bookings b
  ON s.show_id = b.show_id
 AND s.seat_number = b.seat_number;