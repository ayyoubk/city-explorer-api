const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
require('dotenv').config();
const data=require('./data/weather.json')
const cors = require('cors');
const myport = process.env.PORT;

app.use(cors()) // after you initialize your express app instance

// a server endpoint
app.get(
  "/", // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send("Hello World"); // our endpoint function response
  }
);

app.get(
    "/weather",
    function (req, res) {
      // callback function of what we should do with our request
      res.json(data); 
      
    }
  );
app.listen(myport); 
