import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import store from "../store";
import { globalStyles } from "../styles/global";
import Button from "../components/Button";
import { signOutAsync, getCachedAuthAsync } from "../auth";

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
            <Image style={styles.pfp} source={{ uri: profile[0].thumbnail }} />
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
