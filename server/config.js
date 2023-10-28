//config.js

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
console.log(port, '-');
const client = new Client({
   user: 'postgres',
   host: 'localhost',
   database: 'todo_list',
   password: 'admin',
   port: 5433,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

client.on("connect", () => {
  console.log("connected to the db");
});

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

module.exports = {
  client,
  pool
};

//Resouces
//https://help.scalegrid.io/docs/postgresql-connecting-to-nodejs-driver
