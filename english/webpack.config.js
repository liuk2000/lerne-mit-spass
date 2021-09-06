const path = require('path')

module.exports = {
	entry: './html/assets/scripts/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'html'),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties', 
						'@babel/plugin-transform-runtime']
					}
				}
			}
		]
	},
	node: {
		'browserify-fs': "empty",
		'fs': "empty",
		'net': "empty",
		'express': "empty",
		'directory-tree': "empty"
	}
};

