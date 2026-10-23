// Theme color roles per team, rotating by position in the team list
const PALETTE = [
    {
        container: 'primary-container',
        onContainer: 'on-primary-container',
        accent: 'primary',
        onAccent: 'on-primary',
        text: 'primary',
    },
    {
        container: 'secondary-container',
        onContainer: 'on-secondary-container',
        accent: 'secondary-container',
        onAccent: 'on-secondary-container',
        text: 'secondary',
    },
    {
        container: 'tertiary-container',
        onContainer: 'on-tertiary-container',
        accent: 'tertiary-container',
        onAccent: 'on-tertiary-container',
        text: 'tertiary',
    },
];

/**
 * @param {Number} index
 *
 * @returns {Object}
 */
export const teamColors = (index) => PALETTE[index % PALETTE.length];

/**
 * @param {String} name
 *
 * @returns {String}
 */
export const teamInitials = (name) => {
    let words = String(name || '').trim().split(/\s+/);

    // "Team Night Owls" becomes "NO", not "TN"
    if (words.length > 1 && words[0].toLowerCase() === 'team') {
        words = words.slice(1);
    }

    return words
        .slice(0, 2)
        .map((word) => [...word][0])
        .join('')
        .toUpperCase();
};
