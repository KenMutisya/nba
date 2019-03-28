import React from 'react';
import ReactTable from "react-table";
import { getMainColor } from 'nba-color';


const SeasonTotals = (props) => {

  const { seasons } = props;

  const columns = [
    {
      Header: '',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'year',
          Header: 'Season',
          minWidth: 50
        },
        {
          accessor: 'teams[0].alias',
          Header: 'Team',
          minWidth: 50
        }
      ]
    },
    {
      Header: 'Games',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].total.games_played',
          Header: 'GP'
        },
        {
          accessor: 'teams[0].total.minutes',
          Header: 'Min'
        }
      ]
    },
    {
      Header: 'Field Goals',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].total.field_goals_made',
          Header: 'FGM'
        },
        {
          accessor: 'teams[0].total.field_goals_att',
          Header: 'FGA'
        },
        {
          accessor: 'teams[0].total.field_goals_pct',
          Header: 'FG%'
        }
      ]
    },
    {
      Header: 'Three Points',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].total.three_points_made',
          Header: '3PM'
        },
        {
          accessor: 'teams[0].total.three_points_att',
          Header: '3PA'
        },
        {
          accessor: 'teams[0].total.three_points_pct',
          Header: '3P%'
        }
      ]
    },
    {
      Header: 'Free throws',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].total.free_throws_made',
          Header: 'FTM'
        },
        {
          accessor: 'teams[0].total.free_throws_att',
          Header: 'FTA'
        },
        {
          accessor: 'teams[0].total.free_throws_pct',
          Header: 'FT%'
        }
      ]
    },
    {
      Header: 'Rebounds',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].total.offensive_rebounds',
          Header: 'OR'
        },
        {
          accessor: 'teams[0].total.defensive_rebounds',
          Header: 'DR'
        },
        {
          accessor: 'teams[0].total.rebounds',
          Header: 'Reb'
        }
      ]
    }
  ];

  return (
    <ReactTable
      data={seasons}
      columns={columns}
      showPaginationBottom={false}
      minRows={1}
      style={{
        fontSize: 13
      }}
    />
  );
}

const SeasonAverages = (props) => {

  const seasons = props.seasons;
  // console.log('-----FUNCTION-----');
  // console.log(seasons);
  // console.log("AAA");
  // console.log(props);
  const columns = [
    {
      Header: '',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'year',
          Header: 'Season'
        },
        {
          accessor: 'teams[0].alias',
          Header: 'Team',
          id: 'teast'
        }
      ]
    },
    {
      Header: 'Games',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].total.games_played',
          Header: 'GP'
        },
        {
          accessor: 'teams[0].average.minutes',
          Header: 'Min'
        }
      ]
    },
    {
      Header: 'Field Goals',
      headerClassName: 'fieldGoals',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].average.field_goals_made',
          Header: 'FGM'
        },
        {
          accessor: 'teams[0].average.field_goals_att',
          Header: 'FGA'
        },
        {
          accessor: 'teams[0].total.field_goals_pct',
          Header: 'FG%'
        }
      ]
    },
    {
      Header: 'Three Points',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].average.three_points_made',
          Header: '3PM'
        },
        {
          accessor: 'teams[0].average.three_points_att',
          Header: '3PA'
        },
        {
          accessor: 'teams[0].total.three_points_pct',
          Header: '3P%'
        }
      ]
    },
    {
      Header: 'Free Throws',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].average.free_throws_made',
          Header: 'FTM'
        },
        {
          accessor: 'teams[0].average.free_throws_att',
          Header: 'FTA'
        },
        {
          accessor: 'teams[0].total.free_throws_pct',
          Header: 'FT%'
        }
      ]
    },
    {
      Header: 'Rebounds',
      headerStyle: {
        backgroundColor: getMainColor(seasons[0].teams[0].alias).hex,
        fontWeight: 700,
        color: 'white'
      },
      columns: [
        {
          accessor: 'teams[0].average.off_rebounds',
          Header: 'OR'
        },
        {
          accessor: 'teams[0].average.def_rebounds',
          Header: 'DR'
        },
        {
          accessor: 'teams[0].average.rebounds',
          Header: 'Reb'
        }
      ]
    }
  ];

  return (
    <ReactTable
      data={seasons}
      columns={columns}
      showPaginationBottom={false}
      minRows={1}
      style={{
        fontSize: 13
      }}
    />
  );
}

export { SeasonAverages, SeasonTotals };
