import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { useDispatch, Provider, useSelector } from "react-redux";
import { store } from "./store";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import Tabs from "./src/components/Tabs/Tabs";
import moment from "moment-timezone";
import useAppFonts from "./src/hooks/useAppFonts";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { statsSlice } from "./src/store/statsSlice";
import { getLogStatistic } from "./src/services/stats";
import {
  getOnSaleProducts,
  getProducts,
  getRecommendProducts,
} from "./src/services/products";

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
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { areFontsLoaded } = useAppFonts();
  const { selectedTheme } = useSelector((state) => state.theme);
  const { logStatistics, deviceId } = useSelector((state) => state.stats);
  // const { id } = useSelector((state) => state.auth);
  const language = useSelector((state) => state.lang);
  const { isAdmin } = useSelector((state) => state.auth);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLangNotSelected, setIsLangNotSelected] = useState(false);
  const { t, i18n } = useTranslation();
  const [areAllProductsFetched, setAreAllProductsFetched] = useState(false);
  const [areRecommendProductsFetched, setAreRecommendProductsFetched] =
    useState(false);
  const [areActionProductsFetched, setAreActionProductsFetched] =
    useState(false);
  const [areRandomAdditivesFetched, setAreRandomAdditivesFetched] =
    useState(false);
  const [areAdditiveCategoriesFetched, setAreAdditiveCategoriesFetched] =
    useState(false);
  const [areStoriesFetched, setAreStoriesFetched] = useState(false);

  const getUUID = async () => {
    let uuid = uuidv4();
    let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");

    if (fetchUUID) {
      uuid = fetchUUID;
    } else {
      await SecureStore.setItemAsync("secure_deviceid", JSON.stringify(uuid));
    }
    dispatch(statsSlice.actions.setDeviceId(uuid));
    return uuid;
  };

  (async () => {
    SplashScreen.preventAutoHideAsync();
    getLogStatistic()
      .then((res) => dispatch(statsSlice.actions.setLogStatistics(res)))
      .catch(() => dispatch(statsSlice.actions.setLogStatistics(false)));
    getUUID();
    useQuery({
      queryKey: "allProducts",
      queryFn: () => getProducts(),
      cacheTime: 1000 * 60 * 300,
      onSuccess: () => {
        setAreAllProductsFetched(true);
      },
      onError: (error) => {
        // throw error;
      },
    });
    useQuery({
      queryKey: "recommendProducts",
      queryFn: () => getRecommendProducts(),
      cacheTime: 1000 * 60 * 300,
      onSuccess: () => {
        setAreRecommendProductsFetched(true);
      },
      onError: (error) => {
        // throw error;
      },
    });
    useQuery({
      queryKey: "actionProducts",
      queryFn: () => getOnSaleProducts(),
      cacheTime: 1000 * 60 * 300,
      onSuccess: () => {
        setAreActionProductsFetched(true);
      },
      onError: (error) => {
        // throw error;
      },
    });

    setTimeout(async () => {
      if (
        areFontsLoaded &&
        areAllProductsFetched &&
        areRecommendProductsFetched &&
        areActionProductsFetched
      ) {
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
