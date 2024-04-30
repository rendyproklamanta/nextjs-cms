module.exports = {
   root: true,
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
         jsx: true,
      },
      babelOptions: {
         presets: [require.resolve('next/babel')],
      },
   },
   env: {
      browser: true,
      es2021: true,
      node: true,
   },
   plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier'],
   extends: [
      'next',
      'eslint:recommended',
      'next/core-web-vitals',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
   ],
   rules: {
      // JavaScript rules
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'quote-props': ['warn', 'as-needed'],
      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
   },
   settings: {
      react: {
         version: 'detect',
      },
   },
   // "prettier/prettier": [
   //    "error",
   //    {
   //       "endOfLine": "off"
   //    }
   // ]
};