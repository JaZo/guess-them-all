module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
        'standard',
        // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
        'plugin:vue/recommended'
    ],
    // add your custom rules here
    rules: {
        'indent': [2, 4, {'SwitchCase': 1}],
        'vue/html-indent': [2, 4],
        'no-extra-semi': 0,
        'semi': 0,
        'vue/max-attributes-per-line': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // allow console during development
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        // require or disallow a space before function parenthesis
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'never'
        }]
    }
};
