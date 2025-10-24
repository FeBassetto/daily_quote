import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";
import { HomeScreen } from "../screens/Home/Home";
import { LoginScreen } from "../screens/Login/Login";

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
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
    <AppStack.Screen name="Home" component={HomeScreen} />
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
