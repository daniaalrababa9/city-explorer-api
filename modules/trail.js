'use strict';
const superagent = require('superagent');
module.exports = getTrail;

function getTrail(query) {
    let url = `https://www.hikingproject.com/data/get-trails?lat=${query.latitude}&lon=${query.longitude}&maxDistance=200&key=${process.env.TRAIL_PRIVATE_KEY}`;
    return superagent.get(url)
        .then(data => {
            return data.body.trails.map(trail => {
                return new Trail(trail)

            })
        })
        .catch(erorr => {
            erorrHandler(erorr, req, res);
        })
}

function Trail(data) {
    this.name = data.name
    this.location = data.location;
    this.length = data.length;
    this.stars = data.stars;
    this.star_votes = data.starVotes
    this.summary = data.summary;
    this.trail_url = data.url;
    this.conditions = data.conditionDetails;
}

function erorrHandler(erorr, req, res) {
    res.status(500).send(erorr)
}