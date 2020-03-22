import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { globalStyles } from "../styles/global";

import Trade from "./Trade";
import AddTrade from "./modals/AddTrade";
import Card from "../components/Card";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen}>
        <AddTrade closeModal={() => setModalOpen(false)} />
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trades</Text>
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalOpen(true)}
          >
            <MaterialIcons name="add" size={32} color={"#666"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={trades}
          renderItem={({ item }) => (
            <Card>
              <Trade data={item} />
            </Card>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    flex: 8,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginLeft: 40
  },
  list: {
    flex: 11
  },
  add: {
    flex: 1
  },
  addButton: {
    borderColor: "#666",
    borderRadius: 10,
    borderWidth: 1
  }
});
