const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: dev ? "development" : "production",
  devtool: "source-map",
  entry: {
    app: "./src/server/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js",
  },
  optimization: {
    noEmitOnErrors: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                [
                  "@babel/env",
                  {
                    targets: { node: "current" },
                  },
                ],
                ["@babel/typescript", {}],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                    development: false,
                  },
                ],
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: false,
                    regenerator: true,
                    useESModules: false,
                  },
                ],
              ],
              sourceMaps: true,
              comments: false,
            },
          },
          {
            loader: "@linaria/webpack-loader",
            options: {
              sourceMap: dev, //  evaluate expressions inside css string
              evaluate: true,
              // .[hash] -> .[name]_[hash]
              displayName: true,

              rules: [
                {
                  action: require("@linaria/shaker").default,
                },
                {
                  test: /node_modules/,
                  action: "ignore",
                },
              ],

              babelOptions: {
                babelrc: false,
                presets: [
                  ["@babel/typescript", {}],
                  [
                    "@babel/preset-react",
                    {
                      runtime: "automatic",
                      development: false,
                    },
                  ],
                ],
                plugins: [],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: dev },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  devServer: {
    contentBase: [path.join(__dirname, "public")],
    historyApiFallback: true,
  },
};
