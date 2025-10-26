import * as useAuthModule from "@hooks/useAuth";
import { quoteAPI } from "@services/quote";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useQuoteManager } from "../useQuoteManager";

jest.mock("@services/quote");
jest.mock("@hooks/useAuth");

const mockQuoteAPI = quoteAPI as jest.Mocked<typeof quoteAPI>;
const mockUseAuth = useAuthModule.useAuth as jest.Mock;

describe("useQuoteManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      token: "test-token",
      username: "testuser",
      isLoading: false,
      isAuthenticated: true,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });
  });

  it("should initialize with loading state", () => {
    const { result } = renderHook(() => useQuoteManager());

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.initialLoading).toBe(true);
  });

  it("should load initial quotes when token is available", async () => {
    mockQuoteAPI.getDailyQuote.mockResolvedValue("Test quote");

    const { result } = renderHook(() => useQuoteManager());

    await waitFor(() => {
      expect(result.current.quotes.length).toBeGreaterThan(0);
    });

    expect(mockQuoteAPI.getDailyQuote).toHaveBeenCalled();
  });

  it("should add new quotes", async () => {
    mockQuoteAPI.getDailyQuote.mockResolvedValue("New quote");

    const { result } = renderHook(() => useQuoteManager());

    await waitFor(() => {
      expect(result.current.initialLoading).toBe(false);
    });

    const initialLength = result.current.quotes.length;

    act(() => {
      result.current.addNewQuotes(3);
    });

    await waitFor(() => {
      expect(result.current.quotes.length).toBeGreaterThan(initialLength);
    });
  });

  it("should determine when to preload more quotes", () => {
    const { result } = renderHook(() => useQuoteManager());

    const shouldPreload = result.current.shouldPreloadMore(0);
    expect(typeof shouldPreload).toBe("boolean");
  });

  it("should simulate error by clearing quotes", () => {
    const { result } = renderHook(() => useQuoteManager());

    act(() => {
      result.current.simulateError();
    });

    expect(result.current.quotes).toEqual([]);
    expect(result.current.currentIndex).toBe(0);
  });

  it("should update current index", async () => {
    mockQuoteAPI.getDailyQuote.mockResolvedValue("Test quote");

    const { result } = renderHook(() => useQuoteManager());

    await waitFor(() => {
      expect(result.current.initialLoading).toBe(false);
    });

    act(() => {
      result.current.setCurrentIndex(2);
    });

    expect(result.current.currentIndex).toBe(2);
  });

  it("should handle quote loading errors", async () => {
    mockQuoteAPI.getDailyQuote.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useQuoteManager());

    await waitFor(() => {
      expect(result.current.initialLoading).toBe(false);
    });
  });

  it("should retry failed quote loading", async () => {
    mockQuoteAPI.getDailyQuote
      .mockRejectedValueOnce(new Error("Error 1"))
      .mockResolvedValueOnce("Success");

    renderHook(() => useQuoteManager());

    await waitFor(() => {
      expect(mockQuoteAPI.getDailyQuote.mock.calls.length).toBeGreaterThanOrEqual(5);
    });
  });
});
