module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: { jsx: true, legacyDecorators: true },
    },
    env: { node: true, browser: true },
    extends: [require.resolve('eslint-config-airbnb'), 'plugin:react/recommended'],
    plugins: ['import', 'jsx-a11y', 'react'],
    rules: {
        'arrow-parens': ['error', 'always'],
        'arrow-body-style': ['error', 'as-needed'],
        'comma-dangle': ['error', 'always-multiline'],
        'import/imports-first': 'off',
        'import/newline-after-import': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'error',
        'import/prefer-default-export': 'off',
        'import/order': ['error', {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
        }],
        indent: ['error', 2, { SwitchCase: 1 }],
        'max-len': ['error', { code: 115, ignoreComments: true, ignoreUrls: true }],
        'no-console': 'error',
        'prefer-template': 'error',
        'class-methods-use-this': 'off',
        'object-curly-newline': ['error', {
            ObjectExpression: { multiline: true, consistent: true },
            ObjectPattern: { multiline: true, consistent: true },
        }],
        'function-paren-newline': ['error', 'consistent'],
        'react/prop-types': 'off',
        'react/forbid-prop-types': ['error', { forbid: ['any'] }],
        'react/jsx-max-props-per-line': ['error', { maximum: 3, when: 'multiline' }],
        'react/jsx-filename-extension': ['off'],
        'react/jsx-one-expression-per-line': ['off'],
        'jsx-a11y/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
        'jsx-a11y/anchor-is-valid': ['off'],
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-prototype-builtins': 'off',
        'react/sort-comp': ['error', {
            order: [
                'static-methods',
                'lifecycle',
                'everything-else',
                'rendering',
            ],
            groups: {
                rendering: [
                    'render',
                    '/^render.+$/',
                ],
            },
        }],
        'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
};
