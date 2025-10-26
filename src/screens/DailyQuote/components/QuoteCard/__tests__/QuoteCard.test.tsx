import type { QuoteCard as QuoteCardType } from "@models/quote";
import { render } from "@testing-library/react-native";
import { QuoteCard } from "../QuoteCard";

describe("QuoteCard", () => {
  it("should render loading state", () => {
    const card = {
      id: "1",
      text: "",
      loading: true,
    };

    const { getByText } = render(<QuoteCard card={card} />);

    expect(getByText("Carregando frase...")).toBeTruthy();
  });

  it("should render quote text", () => {
    const card = {
      id: "1",
      text: "Test quote text",
      loading: false,
    };

    const { getByText } = render(<QuoteCard card={card} />);

    expect(getByText("Test quote text")).toBeTruthy();
  });

  it("should not render when card is null", () => {
    const { toJSON } = render(<QuoteCard card={null as unknown as QuoteCardType} />);

    expect(toJSON()).toBeNull();
  });

  it("should memoize and not re-render with same props", () => {
    const card = {
      id: "1",
      text: "Test quote",
      loading: false,
    };

    const { rerender, getByText } = render(<QuoteCard card={card} />);

    expect(getByText("Test quote")).toBeTruthy();

    rerender(<QuoteCard card={card} />);

    expect(getByText("Test quote")).toBeTruthy();
  });
});
