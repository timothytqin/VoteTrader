import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import store from "../store";
import { globalStyles } from "../styles/global";
import Button from "../components/Button";
import { signOutAsync, getCachedAuthAsync } from "../googleAuth";

export default function Profile({ navigation }) {
  return (
    <View style={{ ...globalStyles.container, ...styles.profile }}>
      <Image
        style={styles.pfp}
        source={{ uri: store.getState().reducer.profile[0].thumbnail }}
      />
      <Text>Name</Text>
      <Button
        text="Logout"
        onPress={async () => {
          // console.log(navigation);
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
    alignItems: "center",
    marginTop: 50
  },
  pfp: {
    width: 100,
    height: 100
  }
});
