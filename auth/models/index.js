//https://www.bezkoder.com/node-js-jwt-authentication-postgresql/#Project_Structure

const config = require("../../server/config");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// const sequelize = new Sequelize(
//     'todo_list',
//     'postgres',
//     'admin',
//     {
//         host: 'localhost',
//         dialect: 'postgres',
//         pool: {
//             max: config.pool.max,
//             config: config.pool.min,
//             acquire: config.pool.acquire,
//             idle: config.pool.idle
//         }
//     }
// );
console.log(process.env.DATABASE_URL);
const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: "lawrence-portfolio.cefidgdpbtcu.eu-north-1.rds.amazonaws.com",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//look into require parameters
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
