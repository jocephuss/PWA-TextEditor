const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Add the following plugin to generate an HTML file for your app.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.Editor",
      }),
      // Add the following plugin to generate a service worker script.
      new InjectManifest({
        swSrc: "./src-sw.js", // Path to service worker script
        swDest: "src-sw.js", // Output service worker script
      }),

      // Add the following plugin to generate a manifest file for PWA.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description:
          "A simple text editor for creating and editing documents offline!.",
        start_url: "./",
        publicPath: "/",
        icons: [
          {
            src: path.resolve(__dirname, "src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("img", "[name].[ext]"),
          },
        ],
      }),
    ],

    module: {
      //The following section is for CSS loaders and Babel configuration.
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
      ],
    },
  };
};
