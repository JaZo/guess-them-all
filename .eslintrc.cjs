module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
    rules: {
        'indent': ['error', 4, { SwitchCase: 1 }],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
};
