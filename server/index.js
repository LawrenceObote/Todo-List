const express = require("express");
const app = express();
const serverless = require("serverless-http");
app.use(express.static(__dirname + "/client"));
const bodyParser = require("body-parser");
const todoRouter = require("./route");
const path = require("path");
const { editTodo, createTable } = require("./controller");
const dotenv = require("dotenv");
dotenv.config();

const db = require("../auth/models");
const Role = db.role;

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
//force:true is used because there may be a need to drop existing tagles and re-sync the database(DONT USE FOR PRODUCTION)
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// //USE THESE LINES FOR PRODUCTION INSTEAD AND INSERT ROWS MANUALLY
// const db = require("../auth/models");
// db.sequalize.sync();

require("../auth/routes/auth.routes")(app);
require("../auth/routes/user.routes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    "Node.js listening... " +
      port +
      path.join(__dirname, "..", "client", "index.html")
  );
});
app.use("/todo_list/", todoRouter);
app.use(
  "/todo_list/static",
  express.static(path.join(__dirname, "..", "client"))
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
app.post("/", (req, res) => {
  console.log("Post request called");
  res.sendText(req.title);
});
app.delete("/", (req, res) => {
  console.log("Delete request called", req);
});
app.put("/", editTodo);

export const handler = serverless(api);

//https://expressjs.com/en/guide/routing.html
//https://stackoverflow.com/questions/30845416/how-to-go-back-1-folder-level-with-dirname path source
//https://expressjs.com/en/starter/static-files.html static path for css
