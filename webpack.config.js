var path = require('path')

module.exports = {
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
};
