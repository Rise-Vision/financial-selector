const path = require( "path" );
const loaders = require( "./loaders" );
const plugins = require( "./plugins" );
const postcssInit = require( "./postcss" );

module.exports = {
  entry: {
    financial_selector: path.join(
      __dirname, "..", "..", "src", "index.js" ),
  },
  output: {
    path: path.join( __dirname, "..", "..", "dist" ),
    filename: "[name].[hash].js",
    publicPath: "/",
    sourceMapFilename: "[name].[hash].js.map",
    chunkFilename: "[id].chunk.js",
  },

  devtool: process.env.NODE_ENV === "production" ?
    "source-map" :
    "inline-source-map",

  plugins: plugins,
  postcss: postcssInit,

  module: {
    preLoaders: [
      // loaders.eslint,
    ],
    loaders: [
      loaders.ngAnnotate,
      loaders.babel,
      loaders.html,
      loaders.risecss,
      loaders.css,
      loaders.png,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
    ].concat( process.env.NODE_ENV === "development" ? [

    ] : [] ),
  },
  eslint: {
    failOnWarning: false,
    failOnError: false,
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "spin": "spin.js"
    }
  },
};
