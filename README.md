                             🎬 BOOK-MY-TICKET

📌 Project Description

Book-My-Ticket is a full-stack movie ticket booking platform that allows users to register, login, and book seats for movies. The system ensures secure authentication and prevents duplicate seat bookings.

🚀 Features
👤 User Registration & Login system
🔐 JWT-based Authentication
🎟️ Movie seat booking system
🚫 Duplicate seat booking prevention
💺 Seat availability check
🎬 Movie listing (mock data)
🌐 REST API backend
☁️ Neon PostgreSQL database integration
🚀 Deployed on Vercel

🧱 Folder Structure

📂 controllers 
Contains business logic of the application.

auth.js
Handles user registration
Handles login
Verifies user tokens
bookings.js
Handles seat booking logic
Checks seat availability
Prevents duplicate bookings
Protected with authentication
movies.js
Returns movie data (mock dataset)
seats.js
Fetches seat details and status


📂 middlewares
authMiddleware.js
Verifies JWT token
Allows only authenticated users to access protected routes


📂 routes
Defines API endpoints.

auth.js
/register
/login
/verify
bookings.js
Handles all booking-related endpoints
movies.js
Provides movie-related APIs
seats.js
Provides seat-related APIs

📂 db.js
Contains Neon DB (PostgreSQL) connection setup

📂 docker-compose.yml
Used for local PostgreSQL development environment

📂 index.js
Entry point of the application
Initializes Express server
Loads routes and middleware

📂 vercel.json
Configuration file for Vercel deployment

📂 public
Frontend files:

index.html → Main booking page
login.html → Login page
register.html → Registration page

📂 css
Styling for login & register pages

📂 js
app.js
Handles DOM logic
Manages frontend API calls

📂 schema.sql
Database schema
Defines tables for users, bookings, and seats

📂 package.json
Contains project dependencies:
express
bcrypt
jsonwebtoken
pg

🗄️ Database
Neon DB (PostgreSQL cloud database)

🛠️ Tech Stack
Backend:
Node.js
Express.js
Authentication:
JSON Web Token (JWT)
bcrypt
Database:
PostgreSQL (Neon DB)

Frontend:
HTML
CSS
JavaScript

Deployment:
Vercel

🔄 Application Flow
Register → Login → JWT Token Generated → Choose Seat → Book Seat → Confirmation

🔐 Security Features

1. Password hashing using bcrypt
2. JWT-based route protection
3. Middleware-based authentication
4. Prevention of duplicate seat booking

Endpoint curls for testing-

Register-
curl --location 'https://book-my-ticket-p5cs-corx61mve-renuka-khirwadkars-projects.vercel.app/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: _vercel_sso_nonce=1dbb82ad204639140d09bb95969b973a2a42efca29fd5c4a' \
--data-raw '{
  "name": "Renuka3",
  "email": "renuka3.khirwadkarr@gmail.com",
  "password": "Welcome1a"
}'

Login-
curl --location 'https://book-my-ticket-p5cs-corx61mve-renuka-khirwadkars-projects.vercel.app/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: _vercel_sso_nonce=1dbb82ad204639140d09bb95969b973a2a42efca29fd5c4a' \
--data-raw '{
  "email": "renuka3.khirwadkarr@gmail.com",
  "password": "Welcome1a"
}'

getMovies-
curl --location 'https://book-my-ticket-p5cs-corx61mve-renuka-khirwadkars-projects.vercel.app/movies' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsImVtYWlsIjoicmVudWthMS5raGlyd2Fka2FyckBnbWFpbC5jb20iLCJpYXQiOjE3NzYxMzgwNTQsImV4cCI6MTc3NjE0MTY1NH0.PzeeXW4xpaH4zIXu87i3Al734NCHa4i6Ouf-xFOCM8Q' \
--header 'Cookie: _vercel_sso_nonce=1dbb82ad204639140d09bb95969b973a2a42efca29fd5c4a'

getSeats-
curl --location 'https://book-my-ticket-p5cs-corx61mve-renuka-khirwadkars-projects.vercel.app/seats' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZW51a2EzLmtoaXJ3YWRrYXJyQGdtYWlsLmNvbSIsImlhdCI6MTc3NjE4MDc0MCwiZXhwIjoxNzc2MTg0MzQwfQ.RqBjekTTfal9vETjo2GxMcutznbvKBTlskfL1Mlfujo' \
--header 'Cookie: _vercel_sso_nonce=1dbb82ad204639140d09bb95969b973a2a42efca29fd5c4a'

bookseat-

curl --location --request PUT 'https://book-my-ticket-p5cs-corx61mve-renuka-khirwadkars-projects.vercel.app/bookings/30/test5' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoicmVudWthMy5raGlyd2Fka2FyckBnbWFpbC5jb20iLCJpYXQiOjE3NzYxOTM0ODgsImV4cCI6MTc3NjE5NzA4OH0.rrwUhuDZBgiiU8Nu3k258qZx7DwILt7zEvzZo_GG3Qc' \
--header 'Content-Type: application/json'



📌 Summary

Book-My-Ticket is a secure and scalable movie ticket booking system built using Node.js, Express, and Neon PostgreSQL, featuring authentication, seat management, and a simple frontend interface.