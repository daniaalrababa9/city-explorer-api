'use strict';
const superagent = require('superagent');
module.exports = getWeather;

function getWeather(query) {
    let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
    return superagent.get(url)
        .then(data => {
            let weather = data.body;
            return weather.daily.data.map((day) => {
                return new Weather(day);
            })
        })
        .catch(erorr => {
            erorrHandler(erorr, req, res)
        })
}

function Weather(day) {
    this.name = 'weather';
    this.forecast = day.summary;
    this.time = new Date(day.time * 1022.1).toDateString();
}

function erorrHandler(erorr, req, res) {
    res.status(500).send(erorr)
}