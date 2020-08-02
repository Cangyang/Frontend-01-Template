const path = require('path');

module.exports = {
	entry: './main.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins:[
							[
								'@babel/plugin-transform-react-jsx',
								{
									pragma: 'createEle'
								}
							]
						]
					}
				}
			},
			{
				test: /\.view$/,
				use: {
					loader: path.resolve("./myloader")
				}
			}
		]
	},
	mode: 'development',
	optimization: {
		minimize: false
	}
}