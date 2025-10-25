import { fireEvent, render } from "@testing-library/react-native";
import { Button } from "../Button/Button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("should render with title", () => {
      const { getByText } = render(<Button title="Click me" />);
      expect(getByText("Click me")).toBeTruthy();
    });

    it("should render with primary variant by default", () => {
      const { getByText } = render(<Button title="Primary" />);
      expect(getByText("Primary")).toBeTruthy();
    });

    it("should render with secondary variant", () => {
      const { getByText } = render(<Button title="Secondary" variant="secondary" />);
      expect(getByText("Secondary")).toBeTruthy();
    });

    it("should render with outline variant", () => {
      const { getByText } = render(<Button title="Outline" variant="outline" />);
      expect(getByText("Outline")).toBeTruthy();
    });

    it("should render with ghost variant", () => {
      const { getByText } = render(<Button title="Ghost" variant="ghost" />);
      expect(getByText("Ghost")).toBeTruthy();
    });
  });

  describe("Sizes", () => {
    it("should render with medium size by default", () => {
      const { getByText } = render(<Button title="Medium" />);
      expect(getByText("Medium")).toBeTruthy();
    });

    it("should render with small size", () => {
      const { getByText } = render(<Button title="Small" size="small" />);
      expect(getByText("Small")).toBeTruthy();
    });

    it("should render with large size", () => {
      const { getByText } = render(<Button title="Large" size="large" />);
      expect(getByText("Large")).toBeTruthy();
    });
  });

  describe("Loading state", () => {
    it("should show ActivityIndicator when loading", () => {
      const { queryByText, UNSAFE_getByType } = render(<Button title="Submit" loading />);
      const { ActivityIndicator } = require("react-native");

      expect(queryByText("Submit")).toBeNull();
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it("should not show title when loading", () => {
      const { queryByText } = render(<Button title="Submit" loading />);
      expect(queryByText("Submit")).toBeNull();
    });

    it("should set disabled prop when loading", () => {
      const { UNSAFE_getByType } = render(<Button title="Submit" loading />);

      const { TouchableOpacity } = require("react-native");
      const button = UNSAFE_getByType(TouchableOpacity);

      expect(button.props.disabled).toBe(true);
    });
  });

  describe("Disabled state", () => {
    it("should set disabled prop when disabled", () => {
      const { UNSAFE_getByType } = render(<Button title="Disabled" disabled />);

      const { TouchableOpacity } = require("react-native");
      const button = UNSAFE_getByType(TouchableOpacity);
      expect(button.props.disabled).toBe(true);
    });

    it("should render with disabled state", () => {
      const { getByText } = render(<Button title="Disabled" disabled />);
      expect(getByText("Disabled")).toBeTruthy();
    });
  });

  describe("User interactions", () => {
    it("should call onPress when pressed", () => {
      const onPressMock = jest.fn();
      const { UNSAFE_getByType } = render(<Button title="Press me" onPress={onPressMock} />);

      const { TouchableOpacity } = require("react-native");
      fireEvent.press(UNSAFE_getByType(TouchableOpacity));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it("should have disabled prop set when disabled", () => {
      const { UNSAFE_getByType } = render(<Button title="Press me" disabled />);

      const { TouchableOpacity } = require("react-native");
      const button = UNSAFE_getByType(TouchableOpacity);
      expect(button.props.disabled).toBe(true);
    });

    it("should have disabled prop set when loading", () => {
      const { UNSAFE_getByType } = render(<Button title="Press me" loading />);

      const { TouchableOpacity } = require("react-native");
      const button = UNSAFE_getByType(TouchableOpacity);
      expect(button.props.disabled).toBe(true);
    });
  });

  describe("Full width", () => {
    it("should render with full width when fullWidth is true", () => {
      const { getByText } = render(<Button title="Full Width" fullWidth />);
      expect(getByText("Full Width")).toBeTruthy();
    });

    it("should not be full width by default", () => {
      const { getByText } = render(<Button title="Normal" />);
      expect(getByText("Normal")).toBeTruthy();
    });
  });

  describe("Custom styles", () => {
    it("should apply custom style", () => {
      const customStyle = { marginTop: 10 };
      const { getByText } = render(<Button title="Styled" style={customStyle} />);
      expect(getByText("Styled")).toBeTruthy();
    });

    it("should apply custom text style", () => {
      const customTextStyle = { fontSize: 20 };
      const { getByText } = render(<Button title="Styled Text" textStyle={customTextStyle} />);
      expect(getByText("Styled Text")).toBeTruthy();
    });
  });

  describe("Combined props", () => {
    it("should handle multiple props together", () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <Button
          title="Complex Button"
          variant="outline"
          size="large"
          fullWidth
          onPress={onPressMock}
        />,
      );

      expect(getByText("Complex Button")).toBeTruthy();
      fireEvent.press(getByText("Complex Button"));
      expect(onPressMock).toHaveBeenCalled();
    });

    it("should handle disabled and loading together", () => {
      const { queryByText, UNSAFE_getByType } = render(<Button title="Submit" disabled loading />);

      expect(queryByText("Submit")).toBeNull();
      const { TouchableOpacity } = require("react-native");
      const button = UNSAFE_getByType(TouchableOpacity);
      expect(button.props.disabled).toBe(true);
    });
  });
});
