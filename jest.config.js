module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|react-native-deck-swiper|react-native-vector-icons|react-native-toast-message|react-native-haptic-feedback|react-native-share|@react-native-clipboard/clipboard|react-native-keychain|react-native-bootsplash|lucide-react-native|react-native-safe-area-context|react-native-screens|react-native-svg)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@screens/(.*)$": "<rootDir>/src/screens/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@models/(.*)$": "<rootDir>/src/types/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@navigation/(.*)$": "<rootDir>/src/navigation/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/types/**/*"],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 60,
      lines: 65,
      statements: 65,
    },
  },
  testEnvironment: "node",
};
