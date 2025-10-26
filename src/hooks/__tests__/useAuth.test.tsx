import { AuthContext } from "@contexts/AuthContext";
import { renderHook } from "@testing-library/react-native";
import type React from "react";
import { useAuth } from "../useAuth";

describe("useAuth", () => {
  it("should return auth context value when used inside provider", () => {
    const mockValue = {
      token: "test-token",
      username: "testuser",
      isLoading: false,
      isAuthenticated: true,
      signIn: jest.fn(),
      signOut: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockValue}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(mockValue);
    expect(result.current.token).toBe("test-token");
    expect(result.current.username).toBe("testuser");
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("should throw error when context is null", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={null as unknown as never}>{children}</AuthContext.Provider>
    );

    expect(() => {
      renderHook(() => useAuth(), { wrapper });
    }).toThrow("useAuth must be used within an AuthProvider");
  });

  it("should throw error when context is undefined", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={undefined as unknown as never}>{children}</AuthContext.Provider>
    );

    expect(() => {
      renderHook(() => useAuth(), { wrapper });
    }).toThrow("useAuth must be used within an AuthProvider");
  });
});
