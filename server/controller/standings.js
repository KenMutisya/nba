const Standings = require('../model/Standings');

function areStandingsUpdated(req, res, next) {
    Standings.find().then(response => {
        if (response) {
            const [standings] = response;
            const Day = 1000 * 60 * 60 * 48;
            if (Day < Date.now() - standings.last_updated) {
                next();
            } else {
                res.json(standings);
            }
        }
    })
        .catch(error => next())
};

module.exports = { areStandingsUpdated };