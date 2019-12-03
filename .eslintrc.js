// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
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
    jest: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'jest'
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
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
}
