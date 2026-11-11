const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const { API_BASE_URL = '/api', USE_MOCKS = 'true', API_PROXY_TARGET } = process.env;

module.exports = (_env, argv) => {
  const isDev = argv.mode !== 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@core': path.resolve(__dirname, 'src/core'),
        '@modules': path.resolve(__dirname, 'src/modules'),
        '@mocks': path.resolve(__dirname, 'src/mocks'),
      },
    },
    module: {
      rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(API_BASE_URL),
        'process.env.USE_MOCKS': JSON.stringify(USE_MOCKS),
      }),
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
      proxy: API_PROXY_TARGET
        ? [{ context: [API_BASE_URL], target: API_PROXY_TARGET, changeOrigin: true, secure: false }]
        : undefined,
    },
  };
};
