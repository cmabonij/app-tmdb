module.exports = {
  root: true,
  env: {
    browser: true,
    'react-native/react-native': true,
  },
  extends: ['airbnb-typescript', 'plugin:jest/recommended'],
  plugins: [
    'react',
    'react-native',
    'flowtype',
    'prettier',
    'jest',
    'prettier-plugin-organize-imports',
  ],
  rules: {
    'no-console': 'warn',
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: {
          minProperties: 5,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
  },
  indent: [
    'error',
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: {
        var: 2,
        let: 2,
        const: 3,
      },
    },
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: '**/*.d.ts',
};
