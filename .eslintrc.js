module.exports = {
    root: true,

    env: {
      browser: true,
      node: true,
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    extends: [
        'plugin:vue/recommended',
        '@vue/standard',
        'plugin:vue/essential',
    ],

    rules: {
        'indent': ['error', 4, { SwitchCase: 1 }],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
};
