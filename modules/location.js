'use strict';
const superagent = require('superagent');
module.exports = getLocation;

function getLocation(city) {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
    return superagent.get(url)
        .then(data => {
            return new Location(city, data.body[0])
        })
        .catch(erorr => {
            erorrHandler(erorr, req, res)
        })
}

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data.display_name;
    this.latitude = data.lat;
    this.longitude = data.lon;
}

function erorrHandler(erorr, req, res) {
    res.status(500).send(erorr);
}