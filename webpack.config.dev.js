const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	devtool: 'eval',
	entry: [
		'./src/main.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
        test: /\.js$/,
				exclude: /node_modules/,
				use: [
          'babel-loader',
        ]
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
		static: './dist',
		hot: true
	},
	plugins: [
		new ESLintPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
	]
};
