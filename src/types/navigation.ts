import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  DailyQuote: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
