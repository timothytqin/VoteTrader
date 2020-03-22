import * as AppAuth from "expo-app-auth";
import { Platform, AsyncStorage, Alert } from "react-native";

import store from "./store";
import { authenticate, loadProfile } from "./actions";
import { constants } from "./shared/constants";
import { httpPostOptions } from "./shared/http";

const isAndroid = () => Platform.OS === "android";

export const login = model => {
  fetch(constants.server.ngrok + constants.urls.login, httpPostOptions(model))
    .then(res => res.json())
    .then(res => {
      if (res) {
        console.log(
          "Authenticated: " +
            JSON.stringify(store.getState().reducer.authenticated)
        );
        store.dispatch(authenticate(model));
        store.dispatch(loadProfile(res));
        cacheAuthAsync(constants.asyncStorageKey.auth, model);
      }
    });
};

export const googleAuth = async () => {
  const authState = await googleSignInAsync();
  store.dispatch(authenticate(authState));
};

export const getGoogleProfile = async token => {
  const model = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token
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

// export async function signInAsync() {
//   let authState = await AppAuth.authAsync(
//     isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS
//   );
//   await cacheAuthAsync(authState);
//   return authState;
// }

export async function googleSignInAsync() {
  let authState = await AppAuth.authAsync(
    isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS
  );
  await cacheAuthAsync(constants.asyncStorageKey.auth, authState);
  return authState;
}

export async function cacheAuthAsync(key, authState) {
  return await AsyncStorage.setItem(key, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(constants.asyncStorageKey.auth);
  let authState = JSON.parse(value);
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
  if (accessToken) {
    await AppAuth.revokeAsync(
      isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS,
      {
        token: accessToken,
        isClientIdProvided: true
      }
    );
  }
  await AsyncStorage.removeItem(constants.asyncStorageKey.auth);
  await store.dispatch(loadProfile(null));
  await store.dispatch(authenticate(null));
  console.log(
    "Logged out, the storage: " +
      JSON.stringify(AsyncStorage.getItem(constants.asyncStorageKey.auth))
  );
}
