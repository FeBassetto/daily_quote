export const colors = {
  primary: "#F28C22",
  primaryDark: "#D97A1A",
  primaryLight: "#F5A34F",

  secondary: "#FF9A56",
  secondaryDark: "#E88843",
  secondaryLight: "#FFB380",

  background: "#FFF7E9",
  surface: "#FFFFFF",

  text: {
    primary: "#2C2416",
    secondary: "#6B5D4F",
    tertiary: "#9C8F7F",
    inverse: "#FFFFFF",
  },

  border: {
    light: "#F5E6D3",
    medium: "#E8D4B8",
    dark: "#D4BFA0",
  },

  status: {
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },

  overlay: "rgba(0, 0, 0, 0.5)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
