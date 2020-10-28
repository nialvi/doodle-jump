const path = require('path');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	mode: 'development',
	devtool: 'cheap-module-source-map',
};
