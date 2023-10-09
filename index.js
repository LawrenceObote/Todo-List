const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const todoRouter = require("./route");
const { createTodo } = require("./controller");

dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const port =  process.env.PORT || 3000
// app.post('/', (req, res) => {
//   res.send(req);
// });
app.listen(port,() =>{
    console.log('Node.js listening... ' + port);
})
app.use("/todo_list", todoRouter);

//https://expressjs.com/en/guide/routing.html