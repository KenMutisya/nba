/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';
import '../App.css';
import { ReactTableDefaults } from 'react-table';
import RosterSmall from './roster_small';
import { SeasonAverages, SeasonTotals } from './utils';

Object.assign(ReactTableDefaults.column, {
  minWidth: 45
});

axios.defaults.withCredentials = true;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      alias: '',
      seasons: [],
      img: 'https://d28sdlh8venwby.cloudfront.net/assets/missing-profile-326c4759d9ad53fa5bc720276bfe604c25a0c53c37b314eeef1bfa2cc1c5c514.png'
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    console.log("Getting.player1");

    axios.get(`http://localhost:8080/api/player/${id}`).then(response => {
      console.log(response.data.seasons);
      axios
        .post(`http://localhost:8080/api/nba_photo_info`, {
          firstName: response.data.first_name,
          lastName: response.data.last_name
        })
        .then(info => {
          this.setState({
            img: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${
              info.data.player_id
              }.png`
          });
        });
      this.setState({
        player: response.data,
        alias: response.data.team.alias,
        seasons: response.data.seasons
      });
    });
  }

  render() {
    const { img, player, seasons, alias } = this.state;

    return (
      <Container>
        <Row>
          <Col sm={5} md={4} lg={4}>
            <img src={img} alt="Not Found" />
          </Col>
          <Col sm={8} md={8} lg={8}>
            <div>
              <span className="playerName center">{player.full_name}</span>
            </div>
            <div className="playerSmall center">
              <span>
                #{player.jersey_number}, {player.position},{' '}
                {player.team ? (
                  <Link to={`/team/${player.team.alias}`}>{player.team.alias}</Link>
                ) : (
                    ''
                  )}
              </span>
            </div>

            <div className="playerBigStat">
              <div className="playerBigStatHeader">Pts</div>
              <div className="playerBigStatData">
                {player.seasons ? player.seasons[0].teams[0].average.points : ''}
              </div>
            </div>
            <div className="playerBigStat">
              <div className="playerBigStatHeader">Ast</div>
              <div className="playerBigStatData">
                {player.seasons ? player.seasons[0].teams[0].average.assists : ''}
              </div>
            </div>
            <div className="playerBigStat">
              <div className="playerBigStatHeader">Reb</div>
              <div className="playerBigStatData">
                {player.seasons ? player.seasons[0].teams[0].average.rebounds : ''}
              </div>
            </div>
            <br />
            <div className="playerStatsOneLine">
              <div className="playerStatSmall">
                <span className="playerStatSmallHeader">Height:</span>{' '}
                {Math.round(player.height / 12)}&quot;{player.height % 12}&apos;
              </div>
            </div>
            <div className="playerStatsOneLine">
              <div className="playerStatSmall">
                <span className="playerStatSmallHeader">Weight:</span> {player.weight}
              </div>
            </div>
            <br />
            <div className="playerStatsOneLine">
              <div className="playerStatSmall">
                <span className="playerStatSmallHeader">Born:</span> {player.birthdate}
              </div>
            </div>
            <div className="playerStatsOneLine">
              <div className="playerStatSmall">
                <span className="playerStatSmallHeader">College:</span> {player.college}
              </div>
            </div>
            <br />

            <div className="playerStatsOneLine">
              <div className="playerStatSmall">
                <span className="playerStatSmallHeader">Birth Place:</span> {player.birth_place}
              </div>
            </div>
            <br />
            <div className="playerStatsOneLine">
              <div className="playerStatSmall">
                <span className="playerStatSmallHeader">Draft:</span>{' '}
                {player.draft ? player.draft.year : ''}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>{seasons[0] ? <SeasonTotals seasons={seasons} /> : null}</Col>
        </Row>
        <div style={{ height: 10 }} />
        <Row>
          <Col>{seasons[0] ? <SeasonAverages seasons={seasons} /> : null}</Col>
        </Row>

        {<Row>
          <Col md={{ size: 5, offset: 7 }} lg={{ size: 5, offset: 7 }}>
            {alias ? <RosterSmall alias={alias} /> : <div />}
          </Col>
        </Row>}
      </Container>
    );
  }
}
