import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { QueryClientProvider, QueryClient } from "react-query";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Tabs from "./src/components/Tabs/Tabs";
import useAppFonts from "./src/hooks/useAppFonts";
import "react-native-get-random-values";

const queryClient = new QueryClient();

const primaryTheme = {
  dark: false,
  colors: {
    primary: "#2d6255",
    background: "#e7def2",
    background2: "#ffffff",
    background3: "#b0b1ab",
    infoBackground: "#eaeaf5",
    card: "#a8a7a7",
    text: "#3e3e3e",
    border: "#a0a0a0",
    darkBorder: "#808080",
    notification: "rgb(255, 69, 58)",
    link: "#f0f1b9",
    placeholder: "#a8a7a7",
    safe: "#06911d",
    medium: "#ff9100",
    dangerous: "#f90d0d",
  },
};

const NavigationComponent = () => {
  const { areFontsLoaded } = useAppFonts();
  const { selectedTheme } = useSelector((state) => state.theme);
  const [appIsReady, setAppIsReady] = useState(false);

  (async () => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(async () => {
      if (areFontsLoaded) {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }, 1000);
  })();

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: primaryTheme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={primaryTheme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={selectedTheme}>
      <Tabs />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationComponent />
          </SafeAreaView>
        </QueryClientProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
