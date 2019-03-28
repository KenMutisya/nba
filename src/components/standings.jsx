import React, { Component } from 'react';
import axios from 'axios';
import StandingsTable from './standings_table';

axios.defaults.withCredentials = true;

class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      west: [],
      east: [],
      teams: []
    };
  }

  componentWillMount() {
    axios.get('http://localhost:8080/api/standings').then(response => {
      axios.get('http://localhost:8080/api/team_ids').then(teams => {

        this.setState({ teams: teams.data });
      });
      this.setState({
        west: response.data.standings.west,
        east: response.data.standings.east
      });
    });
  }

  // http://www.nba.com/assets/logos/teams/secondary/web/BOS.svg
  // confStandings(conference, teams) {
  //     return (
  //         <Table bordered size="sm">
  //             <thead>
  //                 <tr>
  //                     <th>Team</th>
  //                     <th>Wins</th>
  //                     <th>Losses</th>
  //                     <th>Win %</th>
  //                 </tr>
  //             </thead>
  //             <tbody>
  //                 {conference.map((team, index) => {
  //                     teams.filter(x => x.location === team.market)
  //                     return (
  //                         <tr className={index <= 7 ? 'playoffRow' : 'lotteryRow'} key={index}>
  //                         <td> <img src="https://s.yimg.com/cv/apiv2/default/nba/20181226/70x70/timberwolves_wbg.png" height="25"></img><strong style={{marginLeft:5}}>{team.market.concat(' ', team.name)}</strong></td>
  //                         <td>{team.wins}</td>
  //                         <td>{team.losses}</td>
  //                         <td>{team.win_pct}</td>

  //                     </tr>
  //                     )
  //                 })}
  //             </tbody>
  //         </Table>
  //     )
  // }

  render() {
    const { west, east, teams } = this.state;

    return (
      <React.Fragment>
        <p>Standings</p>

        <StandingsTable conference={west} teams={teams} />

        <StandingsTable conference={east} teams={teams} />

      </React.Fragment>
    );
  }
}

export default Standings;

/*
TODO:

1. Call Standings API from the backend
2. Display each conference as a table
3. Three buttons (total, home, away)
4. CSS
4a. What determines component size etc? Component itself or
the place where it's called?
*/
