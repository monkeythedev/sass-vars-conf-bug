const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const cssOptions = {
  sourceMap: dev
}

const sassOptions = {
  includePaths: [path.resolve("./src/styles/smui"), path.resolve("./node_modules")],
  sourceMap: dev
};

module.exports = {
  entry: {
    main: "./index.js"
  },
  output: {
    path: path.resolve("./dist")
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: /module\.s?css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: cssOptions
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions
            }
          }
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[id].css"
    })
  ],
  devtool: "inline-source-map"
}
