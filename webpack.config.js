/* eslint-disable global-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const configureFontLoader = () => ({
  test: /\.(ttf|eot|woff2?)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
      },
    },
  ],
});

const configureBabelLoader = () => ({
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
    },
  },
});

const configureImageLoader = () => ({
  test: /\.(png|jpe?g|gif|svg|webp)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]',
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          arithmetic: false,
        },
        optipng: {
          optimizationLevel: 5,
        },
        pngquant: {
          enabled: false,
        },
        gifsicle: {
          enabled: false,
        },
      },
    },
  ],
});

const configureSassLoader = () => ({
  test: /\.(scss|css)$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    'sass-loader',
  ],
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8080,
    open: false,
    historyApiFallback: true,
  },
  module: {
    rules: [
      configureFontLoader(),
      configureBabelLoader(),
      configureImageLoader(),
      configureSassLoader(),
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        exclude: /node_modules/,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      { from: '_redirects' },
    ]),
  ],
};
