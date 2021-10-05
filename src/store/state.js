import messages from '../i18n/messages';

const locale = (function () {
    const languages = navigator.languages || [navigator.language || navigator.userLanguage];

    // eslint-disable-next-line no-prototype-builtins
    return languages.map(language => language.substr(0, 2)).find(language => messages.hasOwnProperty(language)) || Object.keys(messages)[0];
})();
const defaultEntities = {
    en: [
        'en.standard',
    ],
    nl: [
        'nl.google',
        'nl.standard',
        'nl.susanne',
    ],
};

export default {
    teams: {
        1: {
            name: 'Team 1',
            players: ['1'],
        },
        2: {
            name: 'Team 2',
            players: ['2'],
        },
    },
    teamList: ['1', '2'],
    players: {
        1: {
            name: 'Player 1',
        },
        2: {
            name: 'Player 2',
        },
    },
    entities: [],
    usedEntities: [],
    // Index-based
    turn: {
        team: 0,
        player: {},
    },
    score: {},
    time: 0,
    winner: null,
    gameState: null,
    settings: {
        locale,
        numberOfEntitiesPerRound: 5,
        pointsNeededToWin: 30,
        timeLimit: 30,
        sounds: true,
        entities: defaultEntities[locale] || defaultEntities.nl,
    },
};
