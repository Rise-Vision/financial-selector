exports.eslint = {
  test: /\.js$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
};

exports.png = {
  test: /\.png$/,
  loader: 'url-loader?mimetype=image/png',
};

exports.istanbulInstrumenter = {
  test: /^(.(?!\.test))*\.js$/,
  loader: 'istanbul-instrumenter-loader',
};

exports.babel = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /(node_modules|bower_components)/,
  query: {
    presets: ['es2015'],
  },
};

exports.ngAnnotate = {
  test: /src.*\.js$/,
  exclude: [/node_modules/],
  loader: 'ng-annotate!babel',
};

exports.html = {
  test: /\.html$/,
  loader: 'raw',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,
  loader: 'style-loader!css-loader',
};

exports.svg = { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=image/svg+xml' };
exports.eot = { test: /\.eot$/, loader: 'file' };
exports.woff = { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff' };
exports.woff2 = { test: /\.woff2$/,
        loader: 'url?limit=10000&minetype=application/font-woff' };
exports.ttf = { test: /\.ttf$/, loader: 'file' };
