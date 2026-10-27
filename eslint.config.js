import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist/']),
    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'indent': ['error', 4, { SwitchCase: 1 }],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // Route pages are deliberately named after their route
            'vue/multi-word-component-names': 'off',
        },
    },
]);
