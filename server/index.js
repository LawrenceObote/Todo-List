const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const todoRouter = require("./route");
const path = require('path');
const { createTodo } = require("./controller");
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const port = process.env.PORT || 3000;
console.log(process.env)
app.listen(port,() =>{
    console.log('Node.js listening... ' + port + path.join(__dirname, '..', 'client', 'index.html'));
})
app.use("/todo_list", todoRouter);
app.use('/static', express.static(path.join(__dirname, '..', 'client')))
app.get("/", (req, res) => {

  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})

//https://expressjs.com/en/guide/routing.html
//https://stackoverflow.com/questions/30845416/how-to-go-back-1-folder-level-with-dirname path source
//https://expressjs.com/en/starter/static-files.html static path for css