const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const target = process.env.NODE_ENV || 'development';
const isDev = target === 'development';

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  mode: target,
  target: 'web',
  entry: ['./src/index.tsx'],
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': resolve('src'),
    },
  },
  devtool: isDev && 'inline-source-map',
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(target),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};