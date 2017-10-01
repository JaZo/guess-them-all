export default {
    teams: {
        '1': {
            name: 'Team 1',
            players: ['1']
        },
        '2': {
            name: 'Team 2',
            players: ['2']
        }
    },
    teamList: ['1', '2'],
    players: {
        '1': {
            name: 'Player 1'
        },
        '2': {
            name: 'Player 2'
        }
    },
    entities: [],
    usedEntities: [],
    // Index-based
    turn: {
        team: 0,
        player: {
            0: 0,
            1: 0
        }
    },
    // Index-based
    score: {
        0: 0,
        1: 0
    },
    time: 0,
    // Index-based
    winner: null
}
