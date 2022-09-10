import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import { extendTheme, NativeBaseProvider } from "native-base";

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
  return (
    <NativeBaseProvider theme={theme}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </NativeBaseProvider>


  );
}
