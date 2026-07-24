import fs from "fs";
import path from "path";

const injectServiceWorker = (__dirname) => {
  return {
    apply(compiler) {
      compiler.hooks.afterEmit.tapAsync(
        "InjectServiceWorkerManifest",
        (compilation, callback) => {
          const generatedFiles = Object.keys(compilation.assets);

          const filteredFiles = generatedFiles.filter(
            (file) => file !== "sw.js" && !file.endsWith(".txt"),
          );

          const absoluteFiles = filteredFiles.map((file) =>
            file.startsWith("/") ? file : `/${file}`,
          );

          const finalManifest = ["/", ...absoluteFiles];

          const swPath = path.resolve(__dirname, "assets/sw.js");
          let swContent = fs.readFileSync(swPath, "utf8");

          swContent = swContent.replace(
            "__MANIFEST_PLACEHOLDER__",
            JSON.stringify(finalManifest),
          );

          const buildHash = compilation.fullHash || Date.now().toString();
          swContent = swContent.replace(
            "__BUILD_HASH_PLACEHOLDER__",
            buildHash,
          );

          const outputPath = path.resolve(
            compiler.options.output.path,
            "sw.js",
          );
          fs.writeFileSync(outputPath, swContent, "utf8");

          callback();
        },
      );
    },
  };
};

export default injectServiceWorker;
