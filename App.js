import React, {useCallback} from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import { extendTheme, NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import store  from "./src/store/store";
import { Provider , connect} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

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


const _store = store.configureStore();
const _persistor = store.persistStore(_store);


export default function App() {

  const [fontsLoaded] = useFonts({
    'Manrope-Regular': require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
    'arabic1': require('./assets/fonts/arabic2.ttf'),
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
         <Provider store={_store}> 
          <PersistGate persistor={_persistor}> 
            <AppNavigator />
          </PersistGate>
        </Provider> 
      </ThemeProvider>
    </NativeBaseProvider>


  );
}
