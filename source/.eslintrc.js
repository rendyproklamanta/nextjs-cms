/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
   env: {
      es6: true
   },
   extends: ['next','eslint:recommended'],
   rules: {
      semi: [1, "always"]
   },
   ignorePatterns: ['node_modules', 'out', '.next'],
   parserOptions: {
      babelOptions: {
         presets: [require.resolve('next/babel')],
      },
   },
};