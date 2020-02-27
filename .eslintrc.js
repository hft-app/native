module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    "plugin:vue-i18n/recommended",
    "plugin:jest/recommended"
  ],
  rules: {
    "quotes": [2, "single", {"avoidEscape": true}],
    "max-len": ["error", {"code": 115}],
    "vue/html-indent": ["error", 2],
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/require-v-for-key": "off",
    "vue-i18n/no-raw-text": "off"
  },
  "globals": {
    "chrome": false,
    "cordova": false,
  },
  settings: {
    'vue-i18n': {
      localeDir: './src/lang/*.json'
    }
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module"
  }
};
