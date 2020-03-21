import React, { useEffect, useState } from "react";
import { Platform, AsyncStorage, StyleSheet, Text, View } from "react-native";
import * as AppAuth from "expo-app-auth";
import { Provider } from "react-redux";

import Router from "./routes/HomeTabNavBar";

import store from "./store";
import { authenticate } from "./actions";
import { getCachedAuthAsync } from "./googleAuth";
import { globalStyles } from "./styles/global";

export const isAndroid = () => Platform.OS === "android";

export default function App() {
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !store.getState().reducer.authenticated) {
        store.dispatch(authenticate(cachedAuth));
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <Router />
      </View>
    </Provider>
  );
}
