import RNBootSplash from "react-native-bootsplash";
import * as Keychain from "react-native-keychain";
import { createContext, type ReactNode, useCallback, useEffect, useState } from "react";

const TOKEN_SERVICE = "auth_token";

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isTransitioning: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  isLoading: true,
  isAuthenticated: false,
  isTransitioning: false,
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
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const credentials = await Keychain.getGenericPassword({ service: TOKEN_SERVICE });
        if (credentials) {
          setTokenState(credentials.password);
        } else {
          setTokenState(null);
        }
      } catch {
        setTokenState(null);
      } finally {
        setIsLoading(false);
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

  const signIn = useCallback(async (newToken: string) => {
    try {
      setIsTransitioning(true);
      await Keychain.setGenericPassword(TOKEN_SERVICE, newToken, {
        service: TOKEN_SERVICE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });
      setTokenState(newToken);
      setIsTransitioning(false);
    } catch (error) {
      setIsTransitioning(false);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsTransitioning(true);
      await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
      setTokenState(null);
      setIsTransitioning(false);
    } catch (error) {
      setIsTransitioning(false);
      throw error;
    }
  }, []);

  const value: AuthContextData = {
    token,
    isLoading,
    isAuthenticated: !!token,
    isTransitioning,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
