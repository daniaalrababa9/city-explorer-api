'use strict';
const superagent = require('superagent');
module.exports = getYelp;

function getYelp(query) {
    let url = `https://api.yelp.com/v3/businesses/search?location=${query.search_query}`;
    return superagent.get(url)
        .set('Authorization', `nawal ${process.env.YELP_API_KEY}`)
        .then(data => {
            return data.body.businesses.map((yelp) => {
                return new Yelp(yelp)
            })

        })
        .catch(erorr => {
            erorrHandler(erorr, req, res)
        })
}

function Yelp() {

}

function erorrHandler(erorr, req, res) {
    res.status(500).send(erorr)
}