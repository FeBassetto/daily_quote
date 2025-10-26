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
  open: jest.fn().mockResolvedValue(true),
}));

jest.mock("react-native-toast-message", () => ({
  default: {
    show: jest.fn(),
    hide: jest.fn(),
  },
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock("react-native-haptic-feedback", () => ({
  trigger: jest.fn(),
}));

// Mock react-native-deck-swiper with virtual flag
jest.mock(
  "react-native-deck-swiper",
  () => {
    const React = require("react");
    const { View } = require("react-native");

    const MockSwiper = React.forwardRef((props, ref) => {
      React.useImperativeHandle(ref, () => ({
        swipeLeft: jest.fn(),
        swipeRight: jest.fn(),
        swipeTop: jest.fn(),
        swipeBottom: jest.fn(),
      }));

      return React.createElement(View, { testID: "swiper", ...props });
    });

    return {
      __esModule: true,
      default: MockSwiper,
    };
  },
  { virtual: true },
);

// Mock lucide-react-native icons
jest.mock("lucide-react-native", () => {
  const React = require("react");
  const { View } = require("react-native");

  const MockIcon = (props) =>
    React.createElement(View, { testID: props.testID || "icon", ...props });

  return {
    Copy: MockIcon,
    Share2: MockIcon,
    RefreshCw: MockIcon,
    User: MockIcon,
    Lock: MockIcon,
    Eye: MockIcon,
    EyeOff: MockIcon,
    Mail: MockIcon,
    Quote: MockIcon,
    LogOut: MockIcon,
    AlertCircle: MockIcon,
  };
});

// Mock @react-navigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock("react-native-safe-area-context", () => {
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
global.requestIdleCallback = global.requestIdleCallback || ((cb) => setTimeout(cb, 1));

jest.mock("react-native/Libraries/Interaction/InteractionManager", () => ({
  runAfterInteractions: jest.fn((callback) => {
    callback();
    return { cancel: jest.fn() };
  }),
  createInteractionHandle: jest.fn(),
  clearInteractionHandle: jest.fn(),
}));
