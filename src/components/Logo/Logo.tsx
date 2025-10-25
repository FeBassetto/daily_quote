import LogoSvg from "@assets/images/logo.svg";
import type { ViewStyle } from "react-native";

interface LogoProps {
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
}

const sizeMap = {
  small: { width: 80, height: 18 },
  medium: { width: 120, height: 28 },
  large: { width: 160, height: 37 },
} as const;

export const Logo = ({ size = "medium", style }: LogoProps) => {
  const { width, height } = sizeMap[size];

  return <LogoSvg width={width} height={height} style={style} />;
};
