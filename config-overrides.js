const Dotenv = require('dotenv-webpack');

module.exports = function override(config, env) {
  config.plugins.push(new Dotenv());

  return config;
};
