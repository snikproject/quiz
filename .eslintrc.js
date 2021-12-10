module.exports = {
  root: true,

  plugins: ['react'],

  env: {
    'browser': true
  },

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
	 'plugin:react/jsx-runtime'
  ],

  settings: {
    react: {
	  'version': 'detect'
	}
  }

};
