const presetEnvPlugin = require('postcss-preset-env');
const nestedPlugin = require('postcss-nested');

module.exports = {
  plugins: [
    presetEnvPlugin,
    nestedPlugin,
  ],
};
