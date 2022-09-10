import React, {useCallback} from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import { extendTheme, NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: '#FE9F2F',
    secondary: '#573353',
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#49ab87',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

export default function App() {

  const [fontsLoaded] = useFonts({
    'Manrope-Regular': require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
    'Arabic1': require('./assets/fonts/arabic1.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </NativeBaseProvider>


  );
}
