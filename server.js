const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
require("dotenv").config();
const wetherCtrl = require("./controller/weather.controller");
const indexCtrl = require("./controller/index.Ctrl");
const moviesCtrl = require("./controller/movies.ctrl");

const cors = require("cors");
const myport = process.env.PORT;
app.use(cors());

app.get("/", indexCtrl);

app.get("/movies",moviesCtrl);

app.get("/weather", wetherCtrl);

app.listen(myport);
