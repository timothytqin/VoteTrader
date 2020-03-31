import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "../components/Button";

export default function Trade({ data }) {
  return (
    <View style={styles.trade}>
      <View style={styles.text}>
        <Text style={styles.header}>{data.policy}</Text>
        <Text style={styles.cardContent}>{data.author}</Text>
      </View>
      <Button text="Trade" />
    </View>
  );
}

const styles = StyleSheet.create({
  trade: {
    flex: 1,
    flexDirection: "row"
  },
  text: {
    flex: 1
  },
  header: {
    fontWeight: "bold",
    fontSize: 20
  }
});
