import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  useEffect(() => {
    void RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7E9" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
