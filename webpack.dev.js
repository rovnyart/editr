const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(process.cwd(), 'app/index.js'),
  ],
  output: {
    filename: '[name].js',
    pathinfo: false,
    publicPath: '/',
  },
  optimization: {
    noEmitOnErrors: true,
    sideEffects: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  resolve: {
    alias: {
      app: path.resolve(process.cwd(), 'app/app'),
      components: path.resolve(__dirname, 'app/app/components'),
    },
  },
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: { babelrc: false, presets: [require.resolve('./app/config/babel.app')], cacheDirectory: true },
        },
        {
          test: /\.(jpe?g|png|gif|bmp)$/i,
          loaders: [
            { loader: require.resolve('url-loader'), options: { limit: 10000, name: '[name].[ext]' } },
            {
              loader: require.resolve('image-webpack-loader'),
              query: {
                mozjpeg: { progressive: true },
                gifsicle: { interlaced: false },
                optipng: { optimizationLevel: 7 },
                pngquant: { quality: '75-90', speed: 3 },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: { modules: true, importLoaders: 1, sourceMap: true },
            },
            { loader: require.resolve('postcss-loader'), options: { config: { path: __dirname } } },
          ],
        },
        { // Do not transform vendor's CSS with PostCSS
          test: /\.css$/,
          include: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap'],
        },
        {
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: { name: '[name].[ext]' },
        },
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: path.join(__dirname, 'app/index.html') }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'vendor.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/), // do not load ALL moment.js locales
  ],
};
