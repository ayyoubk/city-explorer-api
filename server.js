const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
require('dotenv').config();
const axios = require('axios');

const data=require('./data/weather.json')
const cors = require('cors');
const myport = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.use(cors()) // after you initialize your express app instance

class Weather {
  constructor(cityWether) {
    this.date = cityWether.valid_date;
    this.minTemp=cityWether.low_temp;
    this.maxTemp=cityWether.max_temp;
    this.description = cityWether.weather.description;
  }
}

// a server endpoint
app.get(
  "/", // our endpoint name
  function (req, res) {
    res.send("Hello World"); 
});

// const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
app.get(
    "/weather",
    function (req, res) {
      const lat =req.query.lat;
      const lon =req.query.lon;
    
      if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

        axios.get(weatherBitUrl).then(response => {
            const responseData = response.data.data.map(obj => new Weather(obj));
            res.json(responseData)
        }).catch(error => {
            res.send(error.message)
        });
    } else {
        res.send('please provide the proper lat and lon')
    }
    }
  );
app.listen(myport); 
