import { useAuth } from "@hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DailyQuoteScreen } from "@screens/DailyQuote/DailyQuote";
import { LoginScreen } from "@screens/Login/Login";

type RootStackParamList = {
  Login: undefined;
  DailyQuote: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["dailyquote://"],
  config: {
    screens: {
      DailyQuote: "quoteoftheDay",
      Login: "login",
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
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
