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

  componentDidMount() {
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
