'use strict';
const superagent = require('superagent');
module.exports = getEvent;

function getEvent(query) {
    let url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&location=${query.formatted_query}`;
    return superagent.get(url)
        .then(data => {
            const eventful = json.parse(data.text);
            return eventful.events.event.map((dayEvent) => {
                return new Event(dayEvent)
            })

        })
        .catch(erorr => {
            erorrHandler(erorr, req, res)
        })
}

function Event(day) {
    this.link = day.url;
    this.name = day.title;
    this.event_date = day.start_time;
    this.summary = day.description;
}

function erorrHandler(erorr, req, res) {
    res.status(500).send(erorr)
}