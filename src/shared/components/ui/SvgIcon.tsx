import React from "react";
import { SvgXml } from "react-native-svg";

type SvgIconProps = {
  xml: string;
  width?: number;
  height?: number;
  color?: string;
  style?: any;
};

/**
 * SvgIcon component for rendering SVG images easily.
 *
 * Usage:
 * - For SVG strings: <SvgIcon xml="<svg>...</svg>" />
 * - For SVG files: import StarIcon from '@/assets/svgs/star.svg'; then <StarIcon width={24} height={24} fill="red" />
 *
 * @param xml - The SVG XML string
 * @param width - Icon width (default: 24)
 * @param height - Icon height (default: 24)
 * @param color - Optional color to apply (replaces fill)
 * @param style - Additional styles
 */
export default function SvgIcon({
  xml,
  width = 24,
  height = 24,
  color,
  style,
}: SvgIconProps) {
  let processedXml = xml;

  if (color) {
    // Simple color replacement - replace fill="currentColor" or add fill if not present
    // This is a basic implementation; for more complex SVGs, you might need better parsing
    processedXml = xml.replace(/fill="[^"]*"/g, `fill="${color}"`);
    if (!processedXml.includes("fill=")) {
      processedXml = processedXml.replace("<svg", `<svg fill="${color}"`);
    }
  }

  return (
    <SvgXml xml={processedXml} width={width} height={height} style={style} />
  );
}
