/* eslint-disable no-console */
/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');
const { teamValidation, playerValidation } = require('./validation');

const { areStandingsUpdated } = require('./controller/standings');
const { download } = require('./download_logos');
const { downloadPlayer } = require('./download_players');

const apiKey = '8xp4mrfb7hwd9ayv5dfbpans';
const access_level = 'trial';
const version = 'v5';
const language_code = 'en';
const season_year = '2018';
const nba_season = 'REG';
const format = 'json';

const Team = require('./model/Team');
const TeamID = require('./model/TeamID');
const Player = require('./model/Player');
const PlayerTest = require('./model/Player_test');
const Standings = require('./model/Standings');
const PlayerESPN = require('./model/PlayerESPN');

axios.defaults.withCredentials = true;

Router.get('/standings', areStandingsUpdated, (req, res) => {

  Standings.findOneAndRemove({}, {}, () => console.log('Updating standings...'));

  const west = [];
  const east = [];
  axios
    .get(`https://api.sportradar.us/nba/${access_level}/${version}/${language_code}/seasons/${season_year}/${nba_season}/standings.${format}?api_key=${apiKey}`)
    .then(response => {
      response.data.conferences.map((conf, i) => conf.divisions.map(div => div.teams.map(team => {
        if (i === 0) {
          west.push({
            name: team.name, market: team.market, wins: team.wins, losses: team.losses,
            win_pct: team.win_pct, point_diff: team.point_diff, streak: team.streak
          });
        } else {
          east.push({
            name: team.name, market: team.market, wins: team.wins, losses: team.losses,
            win_pct: team.win_pct, point_diff: team.point_diff, streak: team.streak
          });
        }
      })));

      east.sort((a, b) => b.win_pct - a.win_pct);
      west.sort((a, b) => b.win_pct - a.win_pct);

      const standings = new Standings({
        standings: { east, west },
        last_updated: Date.now()
      });
      standings.save();

      res.json({ east, west });
    })
});

Router.get('/league_hierarchy', (req, res) => {
  axios
    .get(`https://api.sportradar.us/nba/${access_level}/${version}/${language_code}/league/hierarchy.${format}?api_key=${apiKey}`)
    .then(response => {
      response.data.conferences.map(conf => conf.divisions.map(div => div.teams.map(team => {
        const newTeam = new Team({ name: team.name, market: team.market, alias: team.alias, id: team.id });
        return newTeam.save()
          .then(saved => console.log(saved.alias, " saved."))
          .catch((err) => console.log("DB ERROR", err));
      })));
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

Router.get('/all_teams', (req, res) => {
  Team.find().then(teams => res.json(teams));
});

Router.get('/team/:alias', (req, res) => {
  const { alias } = req.params;
  Team.findOne({ alias }).then(team => (
    axios
      .get(`https://api.sportradar.us/nba/${access_level}/${version}/${language_code}/teams/${team.id}/profile.${format}?api_key=${apiKey}`)
      .then(roster => res.send(roster.data))
      .catch(err => res.send(err))
  ));
});

Router.post('/add_player', playerValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.mapped()
    });
  }

  if (Array.isArray(req.body)) {
    req.body.map(player => {
      const newPlayer = new Player({
        player
      });
      return newPlayer.save();
    });
  } else {
    const newPlayer = new Player(req.body);
    return newPlayer.save();
  }

  return res.json(req.body);
});

Router.get('/player/:id', (req, res) => {
  // const player_id = req.params.id;
  // axios
  //   .get(
  //     `https://api.sportradar.us/nba/${access_level}/${version}/${language_code}/players/${player_id}/profile.${format}?api_key=${apiKey}`
  //   )
  //   .then(player => {
  //     res.json(player.data);
  //   });
  PlayerTest.findOne().then(player => {
    // Get Iman Shumpter for testing
    res.json(player);
  })
});

Router.get('/news', (req, res) => {
  axios
    .get(`https://newsapi.org/v2/everything?sources=espn&q=nba&sortBy=relevancy&apiKey=aec4dca7c7804613a0a452eaac926ec2`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    });
});

Router.post('/espn_player_id', (req, res) => {
  req.body.map(player => {
    const playerespn = new PlayerESPN(player);
    return playerespn.save();
  });
  res.json({ status: 'ok' });
});

Router.post('/nba_photo_info', (req, res) => {
  PlayerESPN.findOne(req.body).then(player => {
    res.json({ player_id: player.playerId, team_id: player.teamId });
  });
});

Router.post('/add_team_id', (req, res) => {
  req.body.map(team => {
    const newteam = new TeamID(team);
    return newteam.save();
  });
  res.json({ status: 'OK' });
});

Router.get('/team_ids', (req, res) => {
  TeamID.find().then(teams => {
    res.json(teams);
  });
});

Router.get('/team_logos', () => {
  // TeamID.find().then(team => team.abbreviation).then(x => download(x)).catch(e => console.log(e));
  TeamID.find().select('abbreviation -_id').lean().exec().then(x => x.map(team => download(team.abbreviation)));
  // console.log(x);

  // x.forEach(q => q && console.log(q[0]))
  // x.then(data => data).then(pp => pp.map(v => console.log(v.abbreviation)));

  // Promise.all([x]).then(data => data[0]).map(z => z.abbreviation).then(q => console.log(q));
  // Promise.all(x)


  // Promise.all(x.map(team => team.abbreviation)).then(q => console.log(q));

})

Router.get('/player_faces', () => {
  // TeamID.find().then(team => team.abbreviation).then(x => download(x)).catch(e => console.log(e));
  PlayerESPN.find().select('playerId -_id').lean().exec().then(x => x.map(player => downloadPlayer(player.playerId)));
  // console.log(x);

  // x.forEach(q => q && console.log(q[0]))
  // x.then(data => data).then(pp => pp.map(v => console.log(v.abbreviation)));

  // Promise.all([x]).then(data => data[0]).map(z => z.abbreviation).then(q => console.log(q));
  // Promise.all(x)


  // Promise.all(x.map(team => team.abbreviation)).then(q => console.log(q));

})

// Router.get('/save_logos', () => {
//   TeamID.find().select('abbreviation -_id').lean().exec().then(x => x.map(team => {

//     const pathLogos = path.join(__dirname, '../', 'assets/logos');
//     const path2 = path.resolve(pathLogos, `${team.abbreviation}.svg`)
//     return TeamID.findOneAndUpdate({ "abbreviation": team.abbreviation }, { "logo": { "data": fs.readFileSync(path2), "contentType": String } }, (err, doc) => {
//       if (err) throw err;
//       else console.log("updated");
//     })
//   }))
// })

module.exports = Router;
