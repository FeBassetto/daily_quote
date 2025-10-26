import { useAuth } from "@hooks/useAuth";
import type { RootStackParamList } from "@models/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DailyQuoteScreen } from "@screens/DailyQuote/DailyQuote";
import { ForgotPasswordScreen } from "@screens/ForgotPassword/ForgotPassword";
import { LoginScreen } from "@screens/Login/Login";
import { RegisterScreen } from "@screens/Register/Register";

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["dailyquote://"],
  config: {
    screens: {
      DailyQuote: "quoteoftheDay",
      Login: "login",
      Register: "register",
      ForgotPassword: "forgot-password",
    },
  },
};

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="DailyQuote" component={DailyQuoteScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
