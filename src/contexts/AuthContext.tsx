import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppState } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import * as Keychain from "react-native-keychain";

const TOKEN_SERVICE = "auth_token";

interface AuthContextData {
  token: string | null | undefined;
  username: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (token: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  token: undefined,
  username: null,
  isLoading: true,
  isAuthenticated: false,
  signIn: async () => {
    throw new Error("useAuth must be used within AuthProvider");
  },
  signOut: async () => {
    throw new Error("useAuth must be used within AuthProvider");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null | undefined>(undefined);
  const [username, setUsernameState] = useState<string | null>(null);

  const isLoading = token === undefined;

  const clearAuthState = () => {
    setTokenState(null);
    setUsernameState(null);
  };

  const setAuthState = (newToken: string, newUsername: string) => {
    setTokenState(newToken);
    setUsernameState(newUsername);
  };

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const credentials = await Keychain.getGenericPassword({
          service: TOKEN_SERVICE,
        });
        if (credentials) {
          setAuthState(credentials.password, credentials.username);
        } else {
          clearAuthState();
        }
      } catch {
        clearAuthState();
      }
    };

    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        RNBootSplash.hide({ fade: true });
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    const checkAuthState = async () => {
      if (isLoading) return;

      const credentials = await Keychain.getGenericPassword({
        service: TOKEN_SERVICE,
      });

      if (!credentials && token) {
        clearAuthState();
      }
    };

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkAuthState();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isLoading, token]);

  const signIn = useCallback(async (newToken: string, newUsername: string) => {
    await Keychain.setGenericPassword(newUsername, newToken, {
      service: TOKEN_SERVICE,
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    });
    setAuthState(newToken, newUsername);
  }, []);

  const signOut = useCallback(async () => {
    await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
    clearAuthState();
  }, []);

  const value: AuthContextData = useMemo(
    () => ({
      token,
      username,
      isLoading,
      isAuthenticated: !!token,
      signIn,
      signOut,
    }),
    [token, username, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
