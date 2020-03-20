import React, { useEffect, useState } from "react";
import { Platform, AsyncStorage, StyleSheet, Text, View } from "react-native";
import * as AppAuth from "expo-app-auth";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

import { globalStyles } from "./styles/global";
import { httpPostOptions } from "./shared/http";
import { constants } from "./shared/constants";

export const isAndroid = () => Platform.OS === "android";

export default function App() {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  const googleAuth = async () => {
    const authState = await signInAsync();
    setAuthState(authState);

    const model = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
        authState.accessToken
    )
      .then(res => res.json())
      .then(res => {
        return {
          email: res.email,
          password: res.sub,
          thumbnail: res.picture
        };
      });

    return model;
  };

  const signup = model => {
    fetch(constants.urls.signup, httpPostOptions(model));
  };

  const login = model => {
    fetch(constants.urls.login, httpPostOptions(model))
      .then(res => res.json())
      .then(res => console.log(res));
  };

  return (
    <View style={globalStyles.container}>
      <Home />
      {/* <Login login={login} googleAuth={googleAuth} /> */}
      {/* <Signup signup={signup} googleAuth={googleAuth} /> */}
    </View>
  );
}

export async function signInAsync() {
  let authState = await AppAuth.authAsync(
    isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS
  );
  await cacheAuthAsync(authState);
  // console.log("signInAsync", authState);
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(
    constants.storageKey,
    JSON.stringify(authState)
  );
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(constants.storageKey);
  let authState = JSON.parse(value);
  // console.log("getCachedAuthAsync", authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(
    isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS,
    refreshToken
  );
  console.log("refreshAuth", authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(
      isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS,
      {
        token: accessToken,
        isClientIdProvided: true
      }
    );
    await AsyncStorage.removeItem(constants.storageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}
