import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { getMainColor } from 'nba-color';
import PropTypes from 'prop-types';



Object.assign(ReactTableDefaults.column, {
  minWidth: 50
});

axios.defaults.withCredentials = true;

export default class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      players: []
    };
  }

  componentDidMount() {
    const { alias } = this.props.match.params;
    axios.get(`http://localhost:8080/api/team/${alias}`).then(response => {
      const team = response.data;
      this.setState({
        name: team.market.concat(' ', team.name),
        players: team.players
      });
    });
  }

  displayRoster(players) {
    const { alias } = this.props.match.params;
    const { hex } = getMainColor(alias);

    const columns = [
      {
        accessor: 'primary_position',
        Header: 'Pos.',
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        },
        minWidth: 40
      },
      {
        accessor: 'jersey_number',
        Header: 'No.',
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        },
        minWidth: 40
      },
      {
        accessor: 'full_name',
        Header: 'Name',
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        },
        minWidth: 150,
        Cell: props => <Link to={`/player/${props.row._original.id}`}>{props.value}</Link>
      },
      {
        accessor: 'height',
        Header: 'Height',
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        },
        minWidth: 40
      },
      {
        accessor: 'weight',
        Header: 'Weight',
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        },
        minWidth: 40
      },
      {
        accessor: 'birthdate',
        Header: 'DOB',
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        },
        minWidth: 80
      },
      {
        accessor: 'college',
        Header: 'From',
        minWidth: 80,
        headerStyle: {
          backgroundColor: hex,
          fontWeight: 700,
          color: 'white'
        }
      }
    ];
    return (
      <ReactTable
        data={players}
        columns={columns}
        showPaginationBottom={false}
        minRows={12}
        style={{
          fontSize: 13
        }}
      />
    );
  }

  render() {
    const { alias } = this.props.match.params;
    const { hex } = getMainColor(alias);
    const { players, name } = this.state;

    return (
      <Container>
        <Row>
          <Col md={9} lg={9}>
            <div
              style={{
                color: hex,
                border: `2px solid ${hex}`,
                textAlign: 'center'
              }}
            >
              <h2 style={{ margin: '0 auto', width: '100%' }}>{name}</h2>
            </div>
          </Col>
        </Row>
        <Row>

          <Col md={9} lg={9}>
            {this.displayRoster(players, hex)}
          </Col>

        </Row>
      </Container>
    );
  }
}


Roster.propTypes = {
  alias: PropTypes.string.isRequired
}