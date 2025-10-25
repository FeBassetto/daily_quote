module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "@babel/plugin-transform-export-namespace-from",
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
          "@models": "./src/types",
          "@contexts": "./src/contexts",
          "@navigation": "./src/navigation",
          "@constants": "./src/constants",
          "@services": "./src/services",
          "@hooks": "./src/hooks",
          "@assets": "./src/assets",
        },
      },
    ],
  ],
};
