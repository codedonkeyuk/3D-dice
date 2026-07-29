import { useEffect, useState } from "react";
import stringToBlob from "../renderer/image/stringToBlob";
import { diceStyle } from "../renderer/svg/diceMethods";
import generateSvg from "../renderer/svg/generateSvg";
import injectSideIntoSvg from "../renderer/svg/injectSideIntoSvg";
import type { SideGraphics } from "../types";

interface DiceSideArgs {
  side: SideGraphics;
  alt: string;
  backgroundColor: string;
  foregroundColor: string;
  width: number;
  height: number;
  className?: string;
}

const DiceSideThumbnail: React.FC<DiceSideArgs> = ({
  side,
  alt,
  backgroundColor,
  foregroundColor,
  width,
  height,
  className,
}) => {
  const [thumbnail, setThumbnail] = useState<string>();

  useEffect(() => {
    let isActive = true;
    let localThumbnailUrl: string | null = null;
    if (backgroundColor && foregroundColor && width && height && side) {
      (async () => {
        const svgContent = `
          ${diceStyle(foregroundColor, backgroundColor)}
          <rect width="500" height="500" fill="${backgroundColor}" />
          ${await injectSideIntoSvg("square", side, 500, 500)}
        `;

        const side1Blob = stringToBlob(generateSvg(svgContent, 500, 500));
        const generatedUrl = URL.createObjectURL(side1Blob);

        if (isActive) {
          localThumbnailUrl = generatedUrl;
          setThumbnail(generatedUrl);
        } else {
          URL.revokeObjectURL(generatedUrl);
        }
      })();
    }
    return () => {
      isActive = false;
      if (localThumbnailUrl) {
        URL.revokeObjectURL(localThumbnailUrl);
      }
    };
  }, [side, backgroundColor, foregroundColor, width, height, side]);

  if (!thumbnail) {
    return null;
  }

  return (
    <img
      src={thumbnail}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      className={className}
      draggable="false"
    />
  );
};

export default DiceSideThumbnail;
