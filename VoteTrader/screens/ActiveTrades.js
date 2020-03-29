import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../store";
import { globalStyles } from "../styles/global";

import Trade from "./Trade";
import AddTrade from "./modals/AddTrade";
import Card from "../components/Card";
import Popup from "../components/Popup";

export default function ActiveTrades() {
  const [trades, setTrades] = useState(store.getState().reducer.trades);
  const [addTradeOpen, setTradeModalOpen] = useState(false);

  store.subscribe(() => {
    setTrades(store.getState().reducer.trades);
  });

  return (
    <View style={globalStyles.container}>
      <Popup visible={addTradeOpen} modalOpen={setTradeModalOpen}>
        <AddTrade />
      </Popup>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trades</Text>
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setTradeModalOpen(true)}
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
