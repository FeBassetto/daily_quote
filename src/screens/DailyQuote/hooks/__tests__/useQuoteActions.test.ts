import type { SwiperRef } from "@models/swiper";
import Clipboard from "@react-native-clipboard/clipboard";
import { act, renderHook } from "@testing-library/react-native";
import Share from "react-native-share";
import { useQuoteActions } from "../useQuoteActions";

jest.mock("@react-native-clipboard/clipboard");
jest.mock("react-native-share");
jest.useFakeTimers();

describe("useQuoteActions", () => {
  const mockQuotes = [
    { id: "1", text: "Quote 1", loading: false },
    { id: "2", text: "Quote 2", loading: false },
    { id: "3", text: "Quote 3", loading: false },
  ];

  const mockSwiperRef = {
    current: {
      swipeLeft: jest.fn(),
      swipeRight: jest.fn(),
    },
  };

  const mockParams = {
    quotes: mockQuotes,
    currentIndex: 0,
    isSwiping: false,
    swiperRef: mockSwiperRef as React.RefObject<SwiperRef>,
    onSwipingChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default loading state", () => {
    const { result } = renderHook(() => useQuoteActions(mockParams));

    expect(result.current.isActionLoading.copy).toBe(false);
    expect(result.current.isActionLoading.share).toBe(false);
  });

  it("should copy quote to clipboard", async () => {
    const { result } = renderHook(() => useQuoteActions(mockParams));

    await act(async () => {
      await result.current.handleCopy();
    });

    expect(Clipboard.setString).toHaveBeenCalledWith("Quote 1");
  });

  it("should not copy when quote is loading", async () => {
    const loadingParams = {
      ...mockParams,
      quotes: [{ id: "1", text: "", loading: true }],
    };

    const { result } = renderHook(() => useQuoteActions(loadingParams));

    await act(async () => {
      await result.current.handleCopy();
    });

    expect(Clipboard.setString).not.toHaveBeenCalled();
  });

  it("should not copy when swiping", async () => {
    const swipingParams = {
      ...mockParams,
      isSwiping: true,
    };

    const { result } = renderHook(() => useQuoteActions(swipingParams));

    await act(async () => {
      await result.current.handleCopy();
    });

    expect(Clipboard.setString).not.toHaveBeenCalled();
  });

  it("should share quote", async () => {
    (Share.open as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useQuoteActions(mockParams));

    await act(async () => {
      await result.current.handleShare();
    });

    expect(Share.open).toHaveBeenCalledWith({ message: "Quote 1" });
  });

  it("should not share when quote is loading", async () => {
    const loadingParams = {
      ...mockParams,
      quotes: [{ id: "1", text: "", loading: true }],
    };

    const { result } = renderHook(() => useQuoteActions(loadingParams));

    await act(async () => {
      await result.current.handleShare();
    });

    expect(Share.open).not.toHaveBeenCalled();
  });

  it("should handle share cancellation", async () => {
    const cancelError = new Error("User did not share");
    (Share.open as jest.Mock).mockRejectedValue(cancelError);

    const { result } = renderHook(() => useQuoteActions(mockParams));

    await act(async () => {
      await result.current.handleShare();
    });

    expect(Share.open).toHaveBeenCalled();
  });

  it("should refresh quote by swiping", () => {
    const { result } = renderHook(() => useQuoteActions(mockParams));

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockParams.onSwipingChange).toHaveBeenCalled();
    expect(mockSwiperRef.current.swipeRight).toHaveBeenCalled();
  });

  it("should not refresh when quote is loading", () => {
    const loadingParams = {
      ...mockParams,
      quotes: [{ id: "1", text: "", loading: true }],
    };

    const { result } = renderHook(() => useQuoteActions(loadingParams));

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockParams.onSwipingChange).not.toHaveBeenCalled();
  });

  it("should use swipeLeft if swipeRight is not available", () => {
    const swiperRefWithLeftOnly = {
      current: {
        swipeLeft: jest.fn(),
        swipeRight: undefined,
      },
    };

    const params = {
      ...mockParams,
      swiperRef: swiperRefWithLeftOnly as unknown as React.RefObject<SwiperRef>,
    };

    const { result } = renderHook(() => useQuoteActions(params));

    act(() => {
      result.current.handleRefresh();
    });

    expect(swiperRefWithLeftOnly.current.swipeLeft).toHaveBeenCalled();
  });

  it("should set loading state when copying", async () => {
    const { result } = renderHook(() => useQuoteActions(mockParams));

    const copyPromise = act(async () => {
      await result.current.handleCopy();
    });

    await copyPromise;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isActionLoading.copy).toBe(false);
  });

  it("should set loading state when sharing", async () => {
    (Share.open as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useQuoteActions(mockParams));

    const sharePromise = act(async () => {
      await result.current.handleShare();
    });

    await sharePromise;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isActionLoading.share).toBe(false);
  });
});
