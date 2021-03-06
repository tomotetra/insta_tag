const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const target = process.env.NODE_ENV || 'development';
const isDev = target === 'development';
const isProd = target === 'production';

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  mode: target,
  target: 'web',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: resolve('dist/public'),
    publicPath: isDev ? '/' : './public/',
    filename: '[name].[contenthash].js',
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
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom|styled-components|core-js)[\\/]/,
          name: 'core-vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(target),
    }),
    new HtmlWebpackPlugin({
      filename: isDev ? 'index.html' : '../index.html',
      template: './src/index.html',
      scriptLoading: 'defer',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: isProd,
      statsFilename: isProd && resolve('stats.json'),
    }),
  ],
};
