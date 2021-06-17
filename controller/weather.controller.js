const Weather = require('../models/weather.model')
require("dotenv").config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require("axios");

const Cache = require('../helper/cache');
const cacheObj = new Cache();

const wetherCtrl= (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
  
    const checkKey = `location-${lat}-${lon}`;

    if (lat && lon) {

      if (cacheObj[checkKey] && ((Date.now() - cacheObj[checkKey].date) < 86400000)) {
        // if data is avilable at cache
        console.log("cach");
        res.json(cacheObj[checkKey]);
      } else {
        

        
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    
        axios.get(weatherBitUrl).then((response) => {
            const responseData = response.data.data.map((obj) => new Weather(obj));
            
            cacheObj[checkKey] = responseData;
            cacheObj[checkKey].date=Date.now();
            console.log(cacheObj);
            res.json(responseData);
        }).catch((error) => {
            res.send(error.message);
        });
      }
  } else {
      res.send("please provide the proper lat and lon");
    }
}
module.exports = wetherCtrl;
