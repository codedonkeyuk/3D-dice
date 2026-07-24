import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const TARGET_ICONS = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

const generateFavicons = (__dirname, config) => {
  return {
    apply(compiler) {
      compiler.hooks.afterEmit.tapAsync(
        "GenerateFaviconsPlugin",
        (compilation, callback) => {
          const rootDir = compiler.context || __dirname;
          const inputSvg = path.resolve(rootDir, "./assets/logo-square.svg");
          const outputDir = path.resolve(rootDir, "./dist");

          (async () => {
            try {
              await fs.mkdir(outputDir, { recursive: true });

              // 1. Generate normal square sizes
              for (const icon of TARGET_ICONS) {
                await sharp(inputSvg)
                  .resize(icon.size, icon.size)
                  .png()
                  .toFile(path.join(outputDir, icon.name));
              }

              await sharp(inputSvg)
                .resize(1200, 630, {
                  fit: "contain",
                  background: config.backgroundColor,
                })
                .png()
                .toFile(path.join(outputDir, "og-image.png"));

              const manifest = {
                name: config.appName,
                short_name: config.shortName,
                icons: [
                  {
                    src: "/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                  },
                  {
                    src: "/android-chrome-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                  },
                ],
                theme_color: config.themeColor,
                background_color: config.backgroundColor,
                display: "standalone",
                start_url: "/",
              };

              await fs.writeFile(
                path.join(outputDir, "site.webmanifest"),
                JSON.stringify(manifest, null, 2),
              );

              console.log("Graphic Assets generated successfully.");
            } catch (error) {
              console.error("Graphic Assets Generation Failed:", error);
            } finally {
              callback();
            }
          })();
        },
      );
    },
  };
};

export default generateFavicons;
