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
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
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
