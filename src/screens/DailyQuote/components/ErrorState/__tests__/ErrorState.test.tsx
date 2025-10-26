import { fireEvent, render } from "@testing-library/react-native";
import { ErrorState } from "../ErrorState";

describe("ErrorState", () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render error message", () => {
    const { getByText } = render(<ErrorState onRetry={mockOnRetry} />);

    expect(getByText("Ops! Algo deu errado")).toBeTruthy();
  });

  it("should call onRetry when button is pressed", () => {
    const { getByText } = render(<ErrorState onRetry={mockOnRetry} />);

    fireEvent.press(getByText("Tentar Novamente"));
    expect(mockOnRetry).toHaveBeenCalled();
  });
});
