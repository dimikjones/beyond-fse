const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// Plugin to normalize line endings to LF in JavaScript files
class LineEndingNormalizePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('LineEndingNormalizePlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'LineEndingNormalizePlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
        },
        (assets) => {
          Object.keys(assets).forEach((assetName) => {
            if (assetName.endsWith('.js')) {
              const asset = assets[assetName];
              let content = asset.source();
              // Replace CRLF with LF, and CR with LF
              content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
              assets[assetName] = {
                source: () => content,
                size: () => content.length
              };
            }
          });
        }
      );
    });
  }
}

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
      new LineEndingNormalizePlugin(),
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
            format: {
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
