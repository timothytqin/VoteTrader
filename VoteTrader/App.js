import React, { useEffect, useState } from "react";
import { Platform, AsyncStorage, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import Router from "./routes/HomeTabNavBar";

import store from "./store";
import { getCachedAuthAsync, login, getGoogleProfile } from "./auth";
import { globalStyles } from "./styles/global";

export const isAndroid = () => Platform.OS === "android";
const Stack = createStackNavigator();

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
        } else {
          await login(cachedAuth);
        }
      }
      setDone(true);
    })();
  }, []);

  return done ? (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={Router} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  ) : (
    <View></View>
  );
}
