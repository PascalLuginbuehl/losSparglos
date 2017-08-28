// Dependencies
// Plugins
const webpack         = require('webpack')
  , path            = require('path')
  , autoprefixer    = require('autoprefixer')
  , cssnano         = require('cssnano')
  , postcssfocus    = require('postcss-focus')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')

  // Production Switch
  , production = /production/g.test(process.env.NODE_ENV)


const plugins = ((production) => {

  // Plugins used both in production and development
  const defaultPlugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: production,
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new HtmlWebpackPlugin({
      assets: (production ? 'assets/' : ''),
      template: './src/index.ejs',
      filename: (production ? '../' : '') + 'index.html',
      inject: 'head',
      hash: true,
    }),
  ];

  // Plugins used only in production
  const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      dry: false,
    }),
  ];

  // Plugins used only in development
  const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
  ];

  return production ? defaultPlugins.concat(prodPlugins) : defaultPlugins.concat(devPlugins);
})(production);


// Webpack config
module.exports = {
  production,
  entry: {
    app: [
      path.resolve(__dirname, 'src/js/master.js'),
    ],

    vendor: [
      'angular',
      'angular-ui-mask',
      'angular-translate',
      'angular-breadcrumb',
      'angular-ui-router',
      'angular-cookies',
      'angular-resource',
      'angular-ui-bootstrap',
      'ui-select',
      'angular-messages',
      'angular-ui-notification',
      'angular-sanitize',
      'angular-smart-table',
      'angular-translate',
      'angular-ui-notification',
      'angular-translate-storage-cookie',
      'angular-translate-storage-local',
    ],
  },

  plugins,
  output: {
    path: path.resolve(__dirname, 'dist' + (production ? '/assets' : '')),
    filename: 'bundle.js',
    publicPath: (production ? 'assets' : ''),
  },

  module: {
    loaders: [{
        test: /config\.js$/,
        loader: 'file?name=[name].[ext]',
      },{
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel-loader?presets[]=es2015'],
        exclude: /node_modules/,
      }, {
        test: /\.s?css$/,
        loader: 'style!css?-url&zindex=false' + (production ? '' : '&sourceMap') + '!postcss!sass',
      }, {
        test: /\.html$/,
        exclude: /redirect\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src/js')) + '/&prefix=/js/!html'
      }, {
        test: /\.(jpg|png|gif)$/,
        loader: 'file?name=images/[name].[ext]',
      }, {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'file?name=fonts/[name].[ext]',
      }, {
        test: /\.csv$/,
        loader: 'csv-loader',
      }, {
        test: /redirect\.html$/,
        loader: 'file?name=../[name].[ext]',
      }
    ],
  },

  externals: {
    "apiUrl": "apiUrl",
    "TEST": "TEST",
  },

  csv: {
     dynamicTyping: true,
     header: true,
     skipEmptyLines: true
  },

  devtool: !production ? 'source-map' : undefined,
  postcss: () => ([autoprefixer, postcssfocus]),
};
