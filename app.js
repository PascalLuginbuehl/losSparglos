const WebpackDevServer = require("webpack-dev-server")
  , webpack = require("webpack")
  , path = require('path');

let config = require("./webpack.config.js")
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: "dist",
  // Can also be an array, or: contentBase: "http://localhost/",

  // inline: true,
  hot: true,

  historyApiFallback: false,
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.



  setup: function(app) {
    // app.use(function(req, res) {
    //   res.sendFile(path.join(__dirname, 'public/index.html'));
    // });
  },

  // It's a required option.
  publicPath: "/",
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: true,
    assets: false,
    chunks: false,
    modules: false,
    reasons: true,
    children: false,
    source: false,
  }
});


server.listen(8080);
