import React, { useEffect, useState } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import * as AppAuth from "expo-app-auth";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { globalStyles } from "./styles/global";
import { httpPostOptions } from "./shared/http";
import { constants } from "./shared/constants";

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

  const signup = async () => {
    const authState = await signInAsync();
    setAuthState(_authState);
  };

  return (
    <View style={globalStyles.container}>
      <Signup signup={signup} />
    </View>
  );
}

export async function signInAsync() {
  let authState = await AppAuth.authAsync(constants.oauthConfigIOS);
  await cacheAuthAsync(authState);
  console.log("signInAsync", authState);
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
  console.log("getCachedAuthAsync", authState);
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
    constants.oauthConfigIOS,
    refreshToken
  );
  console.log("refreshAuth", authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(constants.oauthConfigIOS, {
      token: accessToken,
      isClientIdProvided: true
    });
    await AsyncStorage.removeItem(constants.storageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}
