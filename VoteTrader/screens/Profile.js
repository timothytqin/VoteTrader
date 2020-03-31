import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../store";
import { globalStyles } from "../styles/global";
import { signOutAsync, getCachedAuthAsync } from "../auth";

import Button from "../components/Button";
import Header from "../components/Header";

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState(store.getState().reducer.profile);

  store.subscribe(() => {
    setProfile(store.getState().reducer.profile);
  });

  return (
    <View style={{ ...globalStyles.container }}>
      <View style={styles.profile}>
        {profile ? (
          <View style={styles.pfp}>
            <Image style={styles.pfp} source={{ uri: profile.thumbnail }} />
          </View>
        ) : (
          <View />
        )}
        <Text>Name</Text>
      </View>
      <Button
        text="Logout"
        onPress={async () => {
          const cachedAuth = await getCachedAuthAsync();
          signOutAsync(cachedAuth);
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  pfp: {
    width: 100,
    height: 100
  }
});
