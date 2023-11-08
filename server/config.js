//config.js

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
console.log(process.env.DATABASE_NAME, "-");
const client = new Client({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  host: process.env.HOST,
  password: process.env.DATABASE_PASSWORD,
  dialect: "postgres",
  dialectOptions: {
    ssl: "Amazon RDS",
  },
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

client.on("connect", () => {
  console.log("connected to the db");
});

// client.query(`CREATE TABLE todo (
// 	id serial PRIMARY KEY,
// 	title VARCHAR(50) NOT NULL,
// 	completed BOOL DEFAULT FALSE,
// 	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`);

// try {
//   const res = await client.query(`CREATE TABLE todo (
//     id serial PRIMARY KEY,
//     title VARCHAR(50) NOT NULL,
//     completed BOOL DEFAULT FALSE,
//     created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`);
//   console.log(res.rows[0].message); // Hello world!
// } catch (err) {
//   console.error(err);
// } finally {
//   await client.end();
// }

// client.connect((err) => {
// });

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

module.exports = {
  client,
  pool,
};

//Resouces
//https://help.scalegrid.io/docs/postgresql-connecting-to-nodejs-driver
