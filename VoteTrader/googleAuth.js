import * as AppAuth from "expo-app-auth";
import { Platform, AsyncStorage } from "react-native";

import store from "./store";
import { authenticate } from "./actions";
import { constants } from "./shared/constants";

const isAndroid = () => Platform.OS === "android";

export const googleAuth = async () => {
  const authState = await signInAsync();
  store.dispatch(authenticate(authState));

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
