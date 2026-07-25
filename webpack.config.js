import webpack from "webpack";
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import fs from "fs";
import generateFavicons from "./plugins/generate-favicons.js";
import injectServiceWorker from "./plugins/inject-service-worker.js";
import siteConfig from "./assets/site-config.json" with { type: "json" };
import minifyCSS from "./plugins/minify-css.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getMinifyOptions = (isProd) =>
  isProd && {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    minifyCSS,
    minifyJS: true,
  };

export default (env, argv) => {
  const webpackMode = argv.mode || "production";
  const isProd = webpackMode === "production";

  return {
    mode: webpackMode,
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
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./assets/index.html",
        filename: "index.html",
        title: siteConfig.appName,
        metaDescription: siteConfig.metaDescription,
        publicSiteAddress: siteConfig.publicSiteAddress,
        isProduction: isProd,
        minify: getMinifyOptions(isProd),
      }),
      new HtmlWebpackPlugin({
        template: "./assets/warning.html",
        filename: "404.html",
        title: `${siteConfig.appName} | 404 - Page Not Found`,
        warningHeader: "404 - Page Not Found",
        warningMessage: "Sorry, the page you are looking for does not exist.",
        warningCss: siteConfig.warningCss,
        publicSiteAddress: siteConfig.publicSiteAddress,
        isProduction: isProd,
        minify: getMinifyOptions(isProd),
        inject: false,
      }),
      ...(isProd
        ? [
            new CopyPlugin({
              patterns: [{ from: "./assets/.htaccess", to: "." }],
            }),
            injectServiceWorker(__dirname),
            generateFavicons(__dirname, siteConfig),
          ]
        : []),
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
};
