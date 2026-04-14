CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  language VARCHAR(50),
  duration INT -- in minutes
);


CREATE TABLE shows (
  id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  show_time TIMESTAMP NOT NULL,
  price NUMERIC(10,2) NOT NULL
);


CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  show_id INT REFERENCES shows(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  UNIQUE (show_id, seat_number) -- no duplicate seats in same show
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  show_id INT REFERENCES shows(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  status VARCHAR(20) DEFAULT 'booked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (show_id, seat_number)
);


CREATE INDEX idx_show_seat ON bookings(show_id, seat_number);
CREATE INDEX idx_show_id ON seats(show_id);

ALTER TABLE bookings
ADD COLUMN user_id INT;

ALTER TABLE bookings
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(id);