const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	mode: 'development',
	devtool: 'cheap-module-source-map',
};
