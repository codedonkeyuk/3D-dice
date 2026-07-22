import webpack from "webpack";
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import fs from "fs";
import injectServiceWorkerPlugin from "./plugins/inject-sw.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/Index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                  development: false,
                },
              ],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./assets/index.html",
      favicon: "./assets/favicon.gif",
    }),
    new CopyPlugin({
      patterns: [{ from: "./assets/manifest.json", to: "." }],
    }),
    injectServiceWorkerPlugin(__dirname),
  ],
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};
