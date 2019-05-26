const path = require('path');
const webpack = require('webpack');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/public/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "source-map",
  devServer: {
    contentBase: './',
    hot: true
  }
};