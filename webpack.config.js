const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      admin: [
        './src/js/admin/beyond-fse-admin.js',
        './src/scss/admin/beyond-fse-admin.scss'
      ],
      front: [
        './src/js/front/beyond-fse.js',
        './src/scss/front/beyond-fse.scss'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: isProduction ? '[name].min.js' : '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].min.css' : '[name].css'
      })
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    devtool: isProduction ? false : 'source-map',
  };
};
