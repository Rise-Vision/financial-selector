exports.eslint = {
  test: /\.js$/,
  loader: "eslint-loader",
  include: /src/,
  failOnError: false,
  failOnWarning: false,
};

exports.png = {
  test: /\.png$/,
  loader: "url-loader?mimetype=image/png",
};

exports.risecss = {
  test: require.resolve( __dirname + "/../../node_modules/rv-common-style/dist/css/rise.css" ),
  loader: "style-loader!raw-loader",
};

exports.istanbulInstrumenter = {
  test: /^(.(?!\.test))*\.js$/,
  loader: "istanbul-instrumenter-loader",
};

exports.babel = {
  test: /\.js$/,
  loader: "babel-loader",
  exclude: /(node_modules|bower_components)/,
  plugins: [ "transform-object-assign" ],
  query: {
    presets: [ "es2015" ],
  },
};

exports.ngAnnotate = {
  test: /src.*\.js$/,
  exclude: [ /node_modules/ ],
  loader: "ng-annotate!babel",
};

exports.html = {
  test: /\.html$/,
  loader: "raw",
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,
  loader: "style-loader!css-loader!resolve-url",
  exclude: require.resolve( __dirname + "/../../node_modules/rv-common-style/dist/css/rise.css" ),
};

exports.svg = { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  loader: "url?limit=10000&minetype=image/svg+xml" };
exports.eot = { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" };
exports.woff = { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
  loader: "url?limit=10000&minetype=application/font-woff" };
exports.woff2 = { test: /\.woff2$/,
  loader: "url?limit=10000&minetype=application/font-woff" };
exports.ttf = { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file" };
