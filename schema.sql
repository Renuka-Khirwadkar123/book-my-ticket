CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  show_id INT DEFAULT 1,
  seat_number VARCHAR(10) UNIQUE,
  isbooked BOOLEAN DEFAULT FALSE,
  name VARCHAR(100)
);


CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  show_id INT DEFAULT 1,
  seat_number VARCHAR(10),
  status VARCHAR(20) DEFAULT 'booked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (show_id, seat_number)
);