import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { globalStyles } from "./styles/global";
import { httpPostOptions } from "./shared/http";
import { constants } from "./shared/constants";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const login = credentials => {
    if (
      credentials.username === "timothytqin" &&
      credentials.password === "tq05112001"
    )
      setAuthenticated(true);
  };

  const signup = credentials => {
    console.log(httpPostOptions(credentials));
    fetch(constants.urls.login, httpPostOptions(credentials))
      .then(res => res.json())
      .then(res => {
        console.log("complete");
      })
      .catch(err => {
        console.log(err);
      });
    setAuthenticated(true);
  };

  return (
    <View style={globalStyles.container}>
      <Signup signup={signup} />
    </View>
  );
}
