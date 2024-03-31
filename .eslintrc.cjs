module.exports = {
    root: true,

    env: {
      browser: true,
      node: true,
      es2022: true,
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
        'vue/multi-word-component-names': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
};
