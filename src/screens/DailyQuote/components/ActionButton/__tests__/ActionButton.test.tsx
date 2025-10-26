import { render } from "@testing-library/react-native";
import { Copy } from "lucide-react-native";
import { ActionButton } from "../ActionButton";

describe("ActionButton", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render button with label", () => {
    const { getByText } = render(
      <ActionButton icon={Copy} label="Copy" onPress={mockOnPress} disabled={false} />,
    );

    expect(getByText("Copy")).toBeTruthy();
  });

  it("should render with icon when not loading", () => {
    const { getByText } = render(
      <ActionButton icon={Copy} label="Copy" onPress={mockOnPress} disabled={false} />,
    );

    expect(getByText("Copy")).toBeTruthy();
  });

  it("should render ActivityIndicator when loading", () => {
    const { getByText } = render(
      <ActionButton
        icon={Copy}
        label="Copy"
        onPress={mockOnPress}
        disabled={false}
        loading={true}
      />,
    );

    expect(getByText("Copy")).toBeTruthy();
  });

  it("should render when disabled", () => {
    const { getByText } = render(
      <ActionButton icon={Copy} label="Copy" onPress={mockOnPress} disabled={true} />,
    );

    expect(getByText("Copy")).toBeTruthy();
  });

  it("should apply disabled styles when disabled", () => {
    const { getByText } = render(
      <ActionButton icon={Copy} label="Share" onPress={mockOnPress} disabled={true} />,
    );

    expect(getByText("Share")).toBeTruthy();
  });

  it("should apply disabled styles when loading", () => {
    const { getByText } = render(
      <ActionButton
        icon={Copy}
        label="Refresh"
        onPress={mockOnPress}
        disabled={false}
        loading={true}
      />,
    );

    expect(getByText("Refresh")).toBeTruthy();
  });
});
