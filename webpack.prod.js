const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  bail: true,
  devtool: false,
  entry: [
    path.resolve(process.cwd(), 'app/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, './build/app'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: { babelrc: false, presets: [require.resolve('./app/config/babel.app')], compact: true },
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
              MiniCssExtractPlugin.loader,
              { loader: require.resolve('css-loader'), options: { modules: true, importLoaders: 1 } }, // eslint-disable-line max-len
              { loader: require.resolve('postcss-loader'), options: { config: { path: __dirname } } },
            ],
          },
          { // Do not transform vendor's CSS with PostCSS
            test: /\.css$/,
            include: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: { name: '[name].[hash:8].[ext]' },
          },

        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/), // do not load ALL moment.js locales
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: false,
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
};
