const Weather = require('../models/weather.model')
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require("axios");


const wetherCtrl= (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
  
    if (lat && lon) {
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  
      axios.get(weatherBitUrl).then((response) => {
          const responseData = response.data.data.map((obj) => new Weather(obj));
          res.json(responseData);
        }).catch((error) => {
          res.send(error.message);
        });
    } else {
      res.send("please provide the proper lat and lon");
    }
}
module.exports = wetherCtrl;
