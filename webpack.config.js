const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

const common = {
  mode: isDev ? "development" : "production",
  output: {
    publicPath: "./",
    filename: "[name].js",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: "asset/resource",
      },
    ]
  },
  watch: isDev,
  devtool: isDev ? "source-map" : undefined,
};

const main = {
  ...common,
  target: "electron-main",
  entry: {
    main: "./src/main.js",
  },
};

const preload = {
  ...common,
  target: "electron-preload",
  entry: {
    preload: "./src/preload.js",
  },
};

const renderer = {
  ...common,
  target: "electron-renderer",
  entry: { index: "./src/web/index.js" },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/web/index.html",
    }),
  ],
};

module.exports = [main, preload, renderer];
