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
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2500000,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./assets/index.html",
      favicon: "./assets/favicon-32x32.png",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./assets/manifest.json", to: "." },
        { from: "./assets/.htaccess", to: "." },
        { from: "./assets/404.html", to: "." },
        {
          from: path.resolve(__dirname, "assets/favicon-*.png"),
          to: "[name][ext]",
        },
      ],
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
      maxInitialRequests: 25,
      minSize: 30000,
      cacheGroups: {
        babylon: {
          test: /[\\/]node_modules[\\/]@babylonjs/,
          name: "npm.babylonjs-core",
          priority: 20,
          reuseExistingChunk: true,
        },

        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          name(module) {
            if (!module.context) return "vendor";
            const match = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            );
            const packageName = match ? match[1] : "vendor";
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};
