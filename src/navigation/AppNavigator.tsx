import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";
import { DailyQuoteScreen } from "../screens/DailyQuote/DailyQuote";
import { LoginScreen } from "../screens/Login/Login";

type AuthStackParamList = {
  Login: undefined;
};

type AppStackParamList = {
  DailyQuote: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

const AppNavigatorStack = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="DailyQuote" component={DailyQuoteScreen} />
  </AppStack.Navigator>
);

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigatorStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
