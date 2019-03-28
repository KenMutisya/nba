import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

export default function StandingsTable(props) {
    const { conference, teams } = props;

    return (
        <Table bordered size="sm">
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Win %</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {conference.map((team, index) => {
                        const [team2] = teams.filter(x => x.simpleName === team.name);

                        return (
                            <tr className={index <= 7 ? 'playoffRow' : 'lotteryRow'}>
                                <td> <img src={team2 && `http://www.nba.com/assets/logos/teams/secondary/web/${team2.abbreviation}.svg`} height="25" alt='' /><strong style={{ marginLeft: 5 }}>{team.market.concat(' ', team.name)}</strong></td>
                                <td>{team.wins}</td>
                                <td>{team.losses}</td>
                                <td>{team.win_pct}</td>

                            </tr>
                        )
                    })}
                </>
            </tbody>
        </Table>
    )
}

// StandingsTable.propTypes = {
//     conference: PropTypes.node.isRequired,
//     teams: PropTypes.node.isRequired
// }
