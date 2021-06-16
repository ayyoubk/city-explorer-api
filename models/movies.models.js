class Movies {
  constructor(MovieName) {
    this.title = MovieName.title;
    this.posterPath = `https://image.tmdb.org/t/p/original${MovieName.poster_path}`;
    this.date = MovieName.release_date;
    this.overview = MovieName.overview;
  }
}

module.exports = Movies;