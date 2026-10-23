/**
 * Utility class that colors text with a theme color, including "on-" colors.
 *
 * @param {String} color
 *
 * @returns {String}
 */
export const textClass = (color) => color.startsWith('on-') ? color : `text-${color}`;

/**
 * CSS color for a theme color, for components whose `color` prop only accepts
 * utility classes for non-"on-" colors.
 *
 * @param {String} color
 *
 * @returns {String}
 */
export const cssColor = (color) => `rgb(var(--v-theme-${color}))`;
