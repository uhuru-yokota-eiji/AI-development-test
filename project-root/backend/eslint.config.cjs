const globals = require('globals');
const typescriptParser = require('@typescript-eslint/parser');
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({
    baseDirectory: __dirname
});


module.exports = [
    ...compat.extends('prettier'),
    {
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.es6,
                ...globals.node,
            },
        },
    },
];
