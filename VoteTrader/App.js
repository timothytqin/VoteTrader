import React, { useEffect, useState } from "react";
import { Platform, AsyncStorage, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import Router from "./routes/HomeTabNavBar";
import Header from "./components/Header";

import store from "./store";
import { getCachedAuthAsync, login, getGoogleProfile } from "./auth";
import { globalStyles } from "./styles/global";

export const isAndroid = () => Platform.OS === "android";
const INITIAL_ROUTE_NAME = "Home";
const Stack = createStackNavigator();

export default function App() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      console.log("Cache: " + JSON.stringify(cachedAuth));
      console.log(
        "Initial Store Values: " + JSON.stringify(store.getState().reducer)
      );
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

  const getHeaderTitle = route => {
    const routeName =
      route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
      case "Home":
        return "Home";
      case "Trades":
        return "Trades";
      case "Profile":
        return store.getState().reducer.profile.username;
    }
  };

  return done ? (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={({ route }) => {
                return {
                  headerTitle: () => {
                    return <Header text={getHeaderTitle(route)} />;
                  }
                };
              }}
              name="Root"
              component={Router}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  ) : (
    <View></View>
  );
}
