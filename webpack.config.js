module.exports = {
  context: __dirname + "/src",
  entry: "./index",

  output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
  },
  
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  },


  devtool: "source-map",
  target: "web",
  resolve: {
    modules: [
      "node_modules",
    ],

    extensions: [".js", ".json", ".css", ".scss"],
  }
}
