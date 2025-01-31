const globals = require('globals');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
    {
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.es6,
                ...globals.node,
            }
        }
    },
];
