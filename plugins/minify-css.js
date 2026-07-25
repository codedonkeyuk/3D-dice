import { transform } from "lightningcss";

const minifyCSS = (text) => {
  try {
    const { code } = transform({
      filename: "inline.css",
      code: Buffer.from(text),
      minify: true,
      targets: { chrome: 120 },
    });
    return code.toString();
  } catch (error) {
    console.error("CSS Minification Error:", error);
    return text;
  }
};

export default minifyCSS;
