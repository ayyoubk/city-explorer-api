

class Weather {
  constructor(cityWether) {
    this.date = cityWether.valid_date;
    this.minTemp = cityWether.low_temp;
    this.maxTemp = cityWether.max_temp;
    this.description = cityWether.weather.description;
  }
}
module.exports = Weather;