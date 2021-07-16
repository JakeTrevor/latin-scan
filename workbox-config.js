module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{js,json,css,png,jpg,html,svg,txt,ico}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/sw.js'
};