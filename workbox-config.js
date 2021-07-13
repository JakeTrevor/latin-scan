module.exports = {
  swDest: "build/sw.js",
  globDirectory: "build/",
  globPatterns: ["**/*.{js,json,css,png,jpg,html,svg,txt,ico}"],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
