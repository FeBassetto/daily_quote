import { act, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import * as Keychain from "react-native-keychain";
import { AuthContext, AuthProvider } from "../AuthContext";

const TestComponent = () => {
  const auth = React.useContext(AuthContext);
  return (
    <>
      <Text testID="token">{auth.token || "null"}</Text>
      <Text testID="username">{auth.username || "null"}</Text>
      <Text testID="isLoading">{auth.isLoading.toString()}</Text>
      <Text testID="isAuthenticated">{auth.isAuthenticated.toString()}</Text>
    </>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Initial state", () => {
    it("should start with loading state when no credentials stored", async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(getByTestId("isLoading").props.children).toBe("true");

      await waitFor(() => {
        expect(getByTestId("isLoading").props.children).toBe("false");
      });
    });

    it("should load stored credentials on mount", async () => {
      const mockCredentials = {
        username: "testuser",
        password: "test-token-123",
        service: "auth_token",
      };

      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(mockCredentials);

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(getByTestId("token").props.children).toBe("test-token-123");
        expect(getByTestId("username").props.children).toBe("testuser");
        expect(getByTestId("isAuthenticated").props.children).toBe("true");
      });
    });

    it("should handle errors when loading credentials", async () => {
      (Keychain.getGenericPassword as jest.Mock).mockRejectedValue(new Error("Keychain error"));

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(getByTestId("token").props.children).toBe("null");
        expect(getByTestId("isAuthenticated").props.children).toBe("false");
      });
    });
  });

  describe("signIn", () => {
    it("should save credentials and update state", async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);
      (Keychain.setGenericPassword as jest.Mock).mockResolvedValue(true);

      let signInFn: ((token: string, username: string) => Promise<void>) | null = null;

      const TestComponentWithSignIn = () => {
        const auth = React.useContext(AuthContext);
        signInFn = auth.signIn;
        return <TestComponent />;
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponentWithSignIn />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(getByTestId("isLoading").props.children).toBe("false");
      });

      await act(async () => {
        await signInFn?.("new-token", "newuser");
      });

      expect(Keychain.setGenericPassword).toHaveBeenCalledWith("newuser", "new-token", {
        service: "auth_token",
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });

      await waitFor(() => {
        expect(getByTestId("token").props.children).toBe("new-token");
        expect(getByTestId("username").props.children).toBe("newuser");
        expect(getByTestId("isAuthenticated").props.children).toBe("true");
      });
    });
  });

  describe("signOut", () => {
    it("should clear credentials and update state", async () => {
      const mockCredentials = {
        username: "testuser",
        password: "test-token",
        service: "auth_token",
      };

      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(mockCredentials);
      (Keychain.resetGenericPassword as jest.Mock).mockResolvedValue(true);

      let signOutFn: (() => Promise<void>) | null = null;

      const TestComponentWithSignOut = () => {
        const auth = React.useContext(AuthContext);
        signOutFn = auth.signOut;
        return <TestComponent />;
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponentWithSignOut />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(getByTestId("isAuthenticated").props.children).toBe("true");
      });

      await act(async () => {
        await signOutFn?.();
      });

      expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
        service: "auth_token",
      });

      await waitFor(() => {
        expect(getByTestId("token").props.children).toBe("null");
        expect(getByTestId("username").props.children).toBe("null");
        expect(getByTestId("isAuthenticated").props.children).toBe("false");
      });
    });
  });

  describe("Boot splash", () => {
    it("should hide boot splash after loading completes", async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(RNBootSplash.hide).not.toHaveBeenCalled();
      });

      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(RNBootSplash.hide).toHaveBeenCalledWith({ fade: true });
      });
    });
  });

  describe("Auth state monitoring", () => {
    it("should clear state when credentials are removed externally", async () => {
      const mockCredentials = {
        username: "testuser",
        password: "test-token",
        service: "auth_token",
      };

      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(mockCredentials);

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(getByTestId("isAuthenticated").props.children).toBe("true");
      });

      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);

      await act(async () => {
        jest.advanceTimersByTime(1000);
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(getByTestId("token").props.children).toBe("null");
        expect(getByTestId("isAuthenticated").props.children).toBe("false");
      });
    });
  });
});
