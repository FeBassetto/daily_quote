import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Input } from "../Input/Input";

describe("Input Component", () => {
  it("should render with label", () => {
    const { getByText } = render(<Input label="Username" />);
    expect(getByText("Username")).toBeTruthy();
  });

  it("should render without label when not provided", () => {
    const { queryByText } = render(<Input placeholder="Enter text" />);
    expect(queryByText("Username")).toBeNull();
  });

  it("should display error message when error prop is provided", () => {
    const errorMessage = "This field is required";
    const { getByText } = render(<Input error={errorMessage} />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("should not display error when error prop is not provided", () => {
    const { queryByText } = render(<Input />);
    expect(queryByText("This field is required")).toBeNull();
  });

  it("should render left icon when provided", () => {
    const LeftIcon = () => <Text testID="left-icon">Icon</Text>;
    const { getByTestId } = render(<Input leftIcon={<LeftIcon />} />);
    expect(getByTestId("left-icon")).toBeTruthy();
  });

  it("should render right icon when provided", () => {
    const RightIcon = () => <Text testID="right-icon">Icon</Text>;
    const { getByTestId } = render(<Input rightIcon={<RightIcon />} />);
    expect(getByTestId("right-icon")).toBeTruthy();
  });

  it("should call onFocus when input is focused", () => {
    const onFocusMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Test input" onFocus={onFocusMock} />,
    );

    fireEvent(getByPlaceholderText("Test input"), "focus");
    expect(onFocusMock).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input loses focus", () => {
    const onBlurMock = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Test input" onBlur={onBlurMock} />);

    fireEvent(getByPlaceholderText("Test input"), "blur");
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it("should handle focus and blur states", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test input" />);
    const input = getByPlaceholderText("Test input");

    fireEvent(input, "focus");
    fireEvent(input, "blur");

    expect(input).toBeTruthy();
  });

  it("should pass value to TextInput", () => {
    const { getByDisplayValue } = render(<Input value="test value" />);
    expect(getByDisplayValue("test value")).toBeTruthy();
  });

  it("should call onChangeText when text changes", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Test input" onChangeText={onChangeTextMock} />,
    );

    fireEvent.changeText(getByPlaceholderText("Test input"), "new text");
    expect(onChangeTextMock).toHaveBeenCalledWith("new text");
  });

  it("should handle disabled state", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test input" editable={false} />);
    const input = getByPlaceholderText("Test input");
    expect(input.props.editable).toBe(false);
  });

  it("should be editable by default", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test input" />);
    const input = getByPlaceholderText("Test input");
    expect(input.props.editable).toBe(true);
  });

  it("should render with placeholder", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter username" />);
    expect(getByPlaceholderText("Enter username")).toBeTruthy();
  });

  it("should handle secureTextEntry prop", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Password" secureTextEntry />);
    const input = getByPlaceholderText("Password");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("should apply custom containerStyle", () => {
    const customStyle = { marginTop: 20 };
    const { getByPlaceholderText } = render(
      <Input placeholder="Test" containerStyle={customStyle} />,
    );
    expect(getByPlaceholderText("Test")).toBeTruthy();
  });

  it("should apply custom style to TextInput", () => {
    const customStyle = { fontSize: 18 };
    const { getByPlaceholderText } = render(<Input placeholder="Test" style={customStyle} />);
    expect(getByPlaceholderText("Test")).toBeTruthy();
  });

  it("should handle all props together", () => {
    const LeftIcon = () => <Text testID="left">L</Text>;
    const RightIcon = () => <Text testID="right">R</Text>;
    const onChangeMock = jest.fn();

    const { getByText, getByTestId, getByDisplayValue } = render(
      <Input
        label="Email"
        error="Invalid email"
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
        value="test@example.com"
        onChangeText={onChangeMock}
      />,
    );

    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Invalid email")).toBeTruthy();
    expect(getByTestId("left")).toBeTruthy();
    expect(getByTestId("right")).toBeTruthy();
    expect(getByDisplayValue("test@example.com")).toBeTruthy();
  });
});
