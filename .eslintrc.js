// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: 'eslint-plugin-typescript',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'eslint:recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-useless-call': 'off',
    'no-return-assign': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-v-html': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-model': 'off',
    'standard/no-callback-literal': 'off',
    'scss(css-propertyvalueexpected)': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
