jest.mock("react-native-bootsplash", () => ({
  hide: jest.fn().mockResolvedValue(true),
  show: jest.fn().mockResolvedValue(true),
  getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
}));

jest.mock("react-native-keychain", () => ({
  setGenericPassword: jest.fn().mockResolvedValue(true),
  getGenericPassword: jest.fn().mockResolvedValue(false),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
  ACCESSIBLE: {
    WHEN_UNLOCKED: "WHEN_UNLOCKED",
    AFTER_FIRST_UNLOCK: "AFTER_FIRST_UNLOCK",
    ALWAYS: "ALWAYS",
    WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: "WHEN_PASSCODE_SET_THIS_DEVICE_ONLY",
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: "WHEN_UNLOCKED_THIS_DEVICE_ONLY",
  },
  SECURITY_LEVEL: {
    ANY: "ANY",
    SECURE_SOFTWARE: "SECURE_SOFTWARE",
    SECURE_HARDWARE: "SECURE_HARDWARE",
  },
}));

jest.mock("@react-native-clipboard/clipboard", () => ({
  setString: jest.fn(),
  getString: jest.fn().mockResolvedValue(""),
}));

jest.mock("react-native-share", () => ({
  default: {
    open: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock("react-native-haptic-feedback", () => ({
  trigger: jest.fn(),
}));

jest.mock("react-native-deck-swiper", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: React.forwardRef((props, _ref) => {
      const MockSwiper = require("react-native").View;
      return React.createElement(MockSwiper, { testID: "swiper", ...props });
    }),
  };
});

jest.mock("@assets/images/logo.svg", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () => React.createElement(require("react-native").View, { testID: "logo-svg" }),
  };
});

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
