const path = require('path');

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {

   main: "./HotPie.js", 
  },
  output: {
    filename: 'bundle.js',
    // Output path using nodeJs path module
    path: path.resolve(__dirname, 'dist'),
  }, 
  module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    }
  ]
}
}