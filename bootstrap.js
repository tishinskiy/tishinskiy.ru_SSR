require('ignore-styles');
require('url-loader');
require('file-loader');
require('@babel/register')({
	ignore: [ /(node_modules)/ ],
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'dynamic-import-node',
		'react-loadable/babel'
	]
});
require('./index');
