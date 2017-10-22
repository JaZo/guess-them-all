import messages from '../i18n/messages';

const getPreferredLanguage = function () {
    let languages = navigator.languages || [navigator.language || navigator.userLanguage];

    return languages.find(language => messages.hasOwnProperty(language)) || Object.keys(messages)[0];
};

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
        player: {}
    },
    score: {},
    time: 0,
    winner: null,
    gameState: null,
    settings: {
        locale: getPreferredLanguage(),
        numberOfEntitiesPerRound: 5,
        pointsNeededToWin: 30,
        timeLimit: 30
    }
}
