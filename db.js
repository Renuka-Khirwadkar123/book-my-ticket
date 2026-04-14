const { Pool } = require("pg");
const isProd = process.env.NODE_ENV === "development";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "secret",
  database: "mydb",

  // connectionString: process.env.DEV_DATABASE_URL,
  // ssl: isProd ? { rejectUnauthorized: false } : false,
});



module.exports = pool;