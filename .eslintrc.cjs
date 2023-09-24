const { getESLintConfig } = require('@applint/spec');

module.exports = getESLintConfig('react-ts', {
  plugins: ['prettier'],
  extends: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
});
