import type { SwiperRef } from "@models/swiper";
import { render } from "@testing-library/react-native";
import { QuoteSwiper } from "../QuoteSwiper";

describe("QuoteSwiper", () => {
  const mockQuotes = [
    { id: "1", text: "Quote 1", loading: false },
    { id: "2", text: "Quote 2", loading: false },
  ];

  const mockSwiperRef = { current: null };
  const mockProps = {
    swiperRef: mockSwiperRef as React.RefObject<SwiperRef | null>,
    quotes: mockQuotes,
    onSwiped: jest.fn(),
    onSwiping: jest.fn(),
    onSwipedAborted: jest.fn(),
    canSwipe: true,
  };

  it("should render swiper with quotes", () => {
    const { getByTestId } = render(<QuoteSwiper {...mockProps} />);

    expect(getByTestId("swiper")).toBeTruthy();
  });

  it("should pass canSwipe prop to swiper", () => {
    const { getByTestId } = render(<QuoteSwiper {...mockProps} canSwipe={false} />);

    expect(getByTestId("swiper")).toBeTruthy();
  });

  it("should render with loading quotes", () => {
    const loadingQuotes = [
      { id: "1", text: "", loading: true },
      { id: "2", text: "", loading: true },
    ];

    const { getByTestId } = render(<QuoteSwiper {...mockProps} quotes={loadingQuotes} />);

    expect(getByTestId("swiper")).toBeTruthy();
  });

  it("should render with empty quotes array", () => {
    const { getByTestId } = render(<QuoteSwiper {...mockProps} quotes={[]} />);

    expect(getByTestId("swiper")).toBeTruthy();
  });
});
