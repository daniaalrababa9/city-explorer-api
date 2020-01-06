'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.static('./'));
app.get('/location', locationHandler);
app.get('/weather', weatherHandler)

function locationHandler(req, res) {
    let location = getLocation(req.query.data);
    res.status(200).json(location)
}

function getLocation(city) {
    let locations = require('./data/geo.json')
    return new Location(city, locations)
}

function Location(city, data) {
    this.search_qurey = city,
        this.formatted_address = data.results[0].formatted_address,
        this.lat = data.results[0].geometry.location.lat,
        this.lng = data.results[0].geometry.location.lng
}

function weatherHandler(req, res) {
    let weather = getWeather(req.query.data);
    res.status(200).json(weather)
}

function getWeather(city) {
    let weathers = require('./data/darksky.json')
    return weathers.daily.data.map(day => {
        return new Weather(day)
    })
}

function Weather(day) {
    this.forcast = day.summary;
    this.time = new Date(day.time * 1000).toDateString()
}

app.get('/boo', (req, res) => {
    throw new error('poo')
})
app.get('*', (req, res) => {
    res.status(404).send('not found')
});
app.get((error, req, res) => {
    res.status(500).send(error)
});
app.listen(PORT, () => console.log(`listen on ${PORT}`))