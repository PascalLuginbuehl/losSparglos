const HtmlWebpackPlugin = require('html-webpack-plugin')
  , webpack = require('webpack')

module.exports = {
  context: __dirname + "/src",
  entry: {
    app: [
        "./index",
      ]
    },

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
        },
      }
    }, {
      test: /\.tsx?$/, loader: 'ts-loader'
    }]
  },


  devtool: "source-map",
  target: "web",
  resolve: {
    modules: [
      "node_modules",
    ],

    extensions: [".js", ".json", ".css", ".scss", ".ts"],
  },


  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
