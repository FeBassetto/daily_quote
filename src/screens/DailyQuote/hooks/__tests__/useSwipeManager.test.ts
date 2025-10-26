import { act, renderHook } from "@testing-library/react-native";
import { useSwipeManager } from "../useSwipeManager";

jest.mock("react-native-haptic-feedback", () => ({
  trigger: jest.fn(),
}));

jest.useFakeTimers();

describe("useSwipeManager", () => {
  const mockParams = {
    onIndexChange: jest.fn(),
    shouldPreload: jest.fn().mockReturnValue(false),
    onPreload: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useSwipeManager(mockParams));

    expect(result.current.isSwiping).toBe(false);
    expect(result.current.canSwipe).toBe(true);
  });

  it("should handle swipe", () => {
    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiped(0);
    });

    expect(result.current.isSwiping).toBe(true);
    expect(result.current.canSwipe).toBe(false);
  });

  it("should call onIndexChange when swiped", () => {
    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiped(0);
      jest.runAllTimers();
    });

    expect(mockParams.onIndexChange).toHaveBeenCalledWith(1);
  });

  it("should handle swiping state", () => {
    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiping();
    });

    expect(result.current.isSwiping).toBe(true);
  });

  it("should handle swipe abort", () => {
    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiped(0);
    });

    expect(result.current.isSwiping).toBe(true);

    act(() => {
      result.current.handleSwipeAborted();
    });

    expect(result.current.isSwiping).toBe(false);
    expect(result.current.canSwipe).toBe(true);
  });

  it("should disable swipe when not ready", () => {
    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiped(0);
    });

    expect(result.current.canSwipe).toBe(false);
  });

  it("should call onPreload when shouldPreload returns true", () => {
    mockParams.shouldPreload.mockReturnValue(true);

    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiped(0);
      jest.runAllTimers();
    });

    expect(mockParams.onPreload).toHaveBeenCalled();
  });

  it("should not call onPreload when shouldPreload returns false", () => {
    mockParams.shouldPreload.mockReturnValue(false);

    const { result } = renderHook(() => useSwipeManager(mockParams));

    act(() => {
      result.current.handleSwiped(0);
      jest.runAllTimers();
    });

    expect(mockParams.onPreload).not.toHaveBeenCalled();
  });
});
