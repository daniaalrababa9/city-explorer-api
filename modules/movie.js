'use strict';
const superagent = require('superagent');
module.exports = getMovie;

function getMovie(query) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${query.search_query}`;
    return superagent.get(url)
        .then(data => {
            return data.body.results.map(movie => {
                return new Movie(movie);
            })
        })
        .catch(erorr => {
            erorrHandler(erorr, req, res)
        })
}

function Movie(data) {
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.vote_average;
    this.popularity = data.popularity;
    this.released_date = data.release_date;
    this.image_url = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
}

function erorrHandler(erorr, req, res) {
    res.status(500).send(erorr);
}