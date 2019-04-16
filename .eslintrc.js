module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "extends": "walmart/configurations/es6",
  "rules": {
    "curly": "multi",
    "quotes": ["error", "double", { "avoidEscape": true }],
    "no-magic-numbers": 0,
    "max-statements": "off",
    "max-len": 0,
    "max-params": 0,
    "complexity": 0,
    "eol-last": "off",
    "new-cap": ["error", { "capIsNewExceptions": ["Bookshelf"] }]
  }
};