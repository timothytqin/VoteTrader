import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { globalStyles } from "../styles/global";

import Trade from "./Trade";
import Card from "../components/Card";

export default function ActiveTrades() {
  const [trades, setTrades] = useState([
    {
      key: 1,
      author: "Bernie Sanders",
      policy: "Free education",
      tags: ["education", "liberal"]
    },
    {
      key: 2,
      author: "Joe Biden",
      policy: "Obamacare",
      tags: ["healthcare", "liberal"]
    },
    {
      key: 3,
      author: "Donald Trump",
      policy: "US first",
      tags: ["economy", "conservative"]
    }
  ]);

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerText}>Trades</Text>
      <FlatList
        data={trades}
        renderItem={({ item }) => (
          <Card>
            <Trade data={item} />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 20
  }
});
