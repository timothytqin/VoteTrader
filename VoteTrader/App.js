import React, { useEffect, useState } from "react";
import { Platform, AsyncStorage, StyleSheet, Text, View } from "react-native";
import * as AppAuth from "expo-app-auth";
import { Provider } from "react-redux";

import Router from "./routes/HomeTabNavBar";

import store from "./store";
import { authenticate, loadProfile } from "./actions";
import { getCachedAuthAsync, login, getGoogleProfile } from "./auth";
import { globalStyles } from "./styles/global";

export const isAndroid = () => Platform.OS === "android";

export default function App() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      console.log("Cache: " + JSON.stringify(cachedAuth));
      if (cachedAuth && !store.getState().reducer.authenticated) {
        if (cachedAuth.accessToken) {
          const googleProfile = await getGoogleProfile(cachedAuth.accessToken);
          await login({
            email: googleProfile.email,
            password: googleProfile.password
          });
          // console.log("google sign on");
          // await store.dispatch(authenticate(cachedAuth));
        } else {
          await login(cachedAuth);
          // console.log("email/password sign on");
          // await store.dispatch(authenticate(cachedAuth));
        }
      }
      setDone(true);
    })();
  }, []);

  return done ? (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <Router />
      </View>
    </Provider>
  ) : (
    <View></View>
  );
}
