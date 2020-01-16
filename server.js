'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const superagent = require('superagent')
app.use(cors());
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', eventHandler);
app.get('/movies', moviesHandler);
app.get('/yelp', yelpHandelr);
app.get('/trails', trailsHandler);
app.get('/', (req, res) => {
    res.status(200).send('great job')
});
let getLocation = require('./modules/location');
let getWeather = require('./modules/weather');
let getEvent = require('./modules/event');
let getMovie = require('./modules/movie');
let getYelp = require('./modules/yelp');
let getTrail = require('./modules/trail');

function locationHandler(req, res) {
    getLocation(req.query.city)
        .then(locationData => {
            res.status(200).json(locationData)
        })
}

function weatherHandler(req, res) {
    getWeather(req.query)
        .then(weatherData => res.status(200).json(weatherData))
}


function eventHandler(req, res) {
    getEvent(req.query)
        .then(eventData => res.status(200).json(eventData));
}

function moviesHandler(req, res) {
    getMovie(req.query)
        .then(movieData => res.status(200).json(movieData));
}

function yelpHandelr(req, res) {
    getYelp(req.query)
        .then(yelpData => res.status(200).json(yelpData));
}

function trailsHandler(req, res) {
    getTrail(req.query)
        .then(trailData => res.status(200).json(trailData));
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