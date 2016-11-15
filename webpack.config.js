const path = require('path');
const configDir = path.join(__dirname, 'dev', 'webpack');

module.exports = [
  require(path.join(configDir, 'webpack.financial_selector.config'))
];
