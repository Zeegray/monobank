module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'parser': 'babel-eslint',
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
    },
    'sourceType': 'module'
  },
  "globals": {
    "describe": false,
    "it": false,
    "expect": false,
    "toEqual": false
  },
  'rules': {
    // 'indent': [
    //   'error',
    //   2
    // ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'no-console': 'off',
  }
};