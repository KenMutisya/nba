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
  minWidth: 30
});

axios.defaults.withCredentials = true;


function displayRoster(players, color) {

  const columns = [
    {
      accessor: 'jersey_number',
      Header: 'No.',
      headerStyle: {
        backgroundColor: color,
        fontWeight: 700,
        color: 'white'
      },
      minWidth: 40
    },
    {
      accessor: 'full_name',
      Header: 'Player',
      headerStyle: {
        backgroundColor: color,
        fontWeight: 700,
        color: 'white'
      },
      minWidth: 50,
      Cell: cell => <Link to={`/player/${cell.row._original.id}`}>{cell.value}</Link>
    },
    {
      accessor: 'primary_position',
      Header: 'Pos.',
      headerStyle: {
        backgroundColor: color,
        fontWeight: 700,
        color: 'white'
      },
      minWidth: 40
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

export default class RosterSmall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  componentWillMount() {
    const { alias } = this.props;
    axios.get(`http://localhost:8080/api/team/${alias}`).then(response => {
      const team = response.data;
      this.setState({
        players: team.players
      });
    });
  }

  render() {
    const { alias } = this.props;
    const { hex } = getMainColor(alias);
    const { players } = this.state;
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            {displayRoster(players, hex)}
          </Col>
        </Row>
      </Container>
    );
  }
}

RosterSmall.propTypes = {
  alias: PropTypes.string.isRequired
}