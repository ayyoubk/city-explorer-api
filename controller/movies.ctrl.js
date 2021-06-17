const axios = require("axios");
const Movies = require('../models/movies.models');
require("dotenv").config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const Cache = require('../helper/cache');
const cacheObjMovies = new Cache();

const moviesCtrl = (req, res) => {
  const searchText = req.query.cityname;

  if (searchText) {

    if (cacheObjMovies[searchText] && ((Date.now() - cacheObjMovies[searchText].date) < 86400000)) {
        res.json(cacheObjMovies[searchText]);
    } else {

    const themoviedbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchText}&include_adult=false&sort_by=popularity.desc`;

    axios.get(themoviedbUrl).then((response) => {
        const responseMoviesData = response.data.results.map(
          (obj) => new Movies(obj)
        );
        cacheObjMovies[searchText] = responseMoviesData;

        cacheObjMovies[searchText].date=Date.now();
        res.json(responseMoviesData);
      }).catch((error) => {
        res.send(error.message);
      });
    }
  } else {
    res.send("please provide the proper Data");
  }
};

module.exports =moviesCtrl;
