const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
require("dotenv").config();
const axios = require("axios");

const data = require("./data/weather.json");
const cors = require("cors");
const myport = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.use(cors()); // after you initialize your express app instance

class Weather {
  constructor(cityWether) {
    this.date = cityWether.valid_date;
    this.minTemp = cityWether.low_temp;
    this.maxTemp = cityWether.max_temp;
    this.description = cityWether.weather.description;
  }
}
class Movies {
  constructor(MovieName) {
    this.title = MovieName.title;
    this.posterPath = `https://image.tmdb.org/t/p/original${MovieName.poster_path}`;
    this.date = MovieName.release_date;
    this.overview = MovieName.overview;

  }
}

// a server endpoint
app.get(
  "/", // our endpoint name
  function (req, res) {
    res.send("Hello World");
  }
);

// movies

app.get(
  "/movies", // our endpoint name
  function (req, res) {
    const searchText = req.query.cityname;

    if (searchText) {
      const themoviedbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchText}&include_adult=false`;

      axios.get(themoviedbUrl).then((response) => {
          const responseMoviesData = response.data.results.map(
            (obj) => new Movies(obj)
          );
          res.json(responseMoviesData);
        })
        .catch((error) => {
          res.send(error.message);
        });
    } else {
      res.send("please provide the proper lat and lon");
    }
  }
);


app.get("/weather", function (req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

    axios
      .get(weatherBitUrl)
      .then((response) => {
        const responseData = response.data.data.map((obj) => new Weather(obj));
        res.json(responseData);
      })
      .catch((error) => {
        res.send(error.message);
      });
  } else {
    res.send("please provide the proper lat and lon");
  }
});
app.listen(myport);
