import { render } from "@testing-library/react-native";
import { Logo } from "../Logo";

describe("Logo", () => {
  it("should render with small size", () => {
    const { getByTestId } = render(<Logo size="small" />);
    expect(getByTestId("svg-mock")).toBeTruthy();
  });

  it("should render with medium size", () => {
    const { getByTestId } = render(<Logo size="medium" />);
    expect(getByTestId("svg-mock")).toBeTruthy();
  });

  it("should render with large size", () => {
    const { getByTestId } = render(<Logo size="large" />);
    expect(getByTestId("svg-mock")).toBeTruthy();
  });

  it("should render with default size", () => {
    const { getByTestId } = render(<Logo />);
    expect(getByTestId("svg-mock")).toBeTruthy();
  });

  it("should apply custom style", () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(<Logo style={customStyle} />);
    expect(getByTestId("svg-mock")).toBeTruthy();
  });
});
