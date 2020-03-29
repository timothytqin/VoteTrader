import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import Trade from "./Trade";
import Card from "../components/Card";

export default function MyTrades() {
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
    },
    {
      key: 4,
      author: "Bernie Sanders",
      policy: "Free education",
      tags: ["education", "liberal"]
    },
    {
      key: 5,
      author: "Joe Biden",
      policy: "Obamacare",
      tags: ["healthcare", "liberal"]
    },
    {
      key: 6,
      author: "Donald Trump",
      policy: "US first",
      tags: ["economy", "conservative"]
    },
    {
      key: 7,
      author: "Bernie Sanders",
      policy: "Free education",
      tags: ["education", "liberal"]
    },
    {
      key: 8,
      author: "Joe Biden",
      policy: "Obamacare",
      tags: ["healthcare", "liberal"]
    },
    {
      key: 9,
      author: "Donald Trump",
      policy: "US first",
      tags: ["economy", "conservative"]
    },
    {
      key: 10,
      author: "Bernie Sanders",
      policy: "Free education",
      tags: ["education", "liberal"]
    },
    {
      key: 11,
      author: "Joe Biden",
      policy: "Obamacare",
      tags: ["healthcare", "liberal"]
    },
    {
      key: 12,
      author: "Donald Trump",
      policy: "US first",
      tags: ["economy", "conservative"]
    }
  ]);
  return (
    <FlatList
      data={trades}
      renderItem={({ item }) => (
        <Card>
          <Trade data={item} />
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({});
