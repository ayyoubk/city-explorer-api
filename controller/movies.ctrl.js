const axios = require("axios");
const Movies = require('../models/movies.models');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;



const moviesCtrl = (req, res) => {
  const searchText = req.query.cityname;

  if (searchText) {
    const themoviedbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchText}&include_adult=false&sort_by=popularity.desc`;

    axios.get(themoviedbUrl).then((response) => {
        const responseMoviesData = response.data.results.map(
          (obj) => new Movies(obj)
        );
        res.json(responseMoviesData);
      }).catch((error) => {
        res.send(error.message);
      });
  } else {
    res.send("please provide the proper Data");
  }
};

module.exports =moviesCtrl;
