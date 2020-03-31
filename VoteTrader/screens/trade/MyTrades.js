import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../../store";

import Trade from "../Trade";
import Card from "../../components/Card";
import Popup from "../../components/Popup";
import AddTrade from "../modals/AddTrade";

export default function MyTrades() {
  const [trades, setTrades] = useState(
    store.getState().reducer.trades.myTrades
  );

  store.subscribe(() => {
    setTrades(store.getState().reducer.trades.myTrades);
  });
  // const [trades, setTrades] = useState([
  //   {
  //     key: 1,
  //     author: "Bernie Sanders",
  //     policy: "Free education",
  //     tags: ["education", "liberal"]
  //   },
  //   {
  //     key: 2,
  //     author: "Joe Biden",
  //     policy: "Obamacare",
  //     tags: ["healthcare", "liberal"]
  //   },
  //   {
  //     key: 3,
  //     author: "Donald Trump",
  //     policy: "US first",
  //     tags: ["economy", "conservative"]
  //   },
  //   {
  //     key: 4,
  //     author: "Bernie Sanders",
  //     policy: "Free education",
  //     tags: ["education", "liberal"]
  //   },
  //   {
  //     key: 5,
  //     author: "Joe Biden",
  //     policy: "Obamacare",
  //     tags: ["healthcare", "liberal"]
  //   },
  //   {
  //     key: 6,
  //     author: "Donald Trump",
  //     policy: "US first",
  //     tags: ["economy", "conservative"]
  //   },
  //   {
  //     key: 7,
  //     author: "Bernie Sanders",
  //     policy: "Free education",
  //     tags: ["education", "liberal"]
  //   },
  //   {
  //     key: 8,
  //     author: "Joe Biden",
  //     policy: "Obamacare",
  //     tags: ["healthcare", "liberal"]
  //   },
  //   {
  //     key: 9,
  //     author: "Donald Trump",
  //     policy: "US first",
  //     tags: ["economy", "conservative"]
  //   },
  //   {
  //     key: 10,
  //     author: "Bernie Sanders",
  //     policy: "Free education",
  //     tags: ["education", "liberal"]
  //   },
  //   {
  //     key: 11,
  //     author: "Joe Biden",
  //     policy: "Obamacare",
  //     tags: ["healthcare", "liberal"]
  //   },
  //   {
  //     key: 12,
  //     author: "Donald Trump",
  //     policy: "US first",
  //     tags: ["economy", "conservative"]
  //   }
  // ]);
  const [addTradeOpen, setTradeModalOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Popup visible={addTradeOpen} modalOpen={setTradeModalOpen}>
        <AddTrade modalOpen={setTradeModalOpen} />
      </Popup>
      <View style={styles.list}>
        {trades.length !== 0 ? (
          <FlatList
            data={trades}
            renderItem={({ item }) => (
              <Card>
                <Trade data={item} />
              </Card>
            )}
          />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>You have no active trades.</Text>
          </View>
        )}
      </View>
      <View style={styles.add}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setTradeModalOpen(true)}
        >
          <Text style={styles.addText}>Add</Text>
          <MaterialIcons name="add" size={32} color={"#666"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    fontWeight: "bold",
    fontSize: 24
  },
  list: {
    flex: 13,
    borderWidth: 2,
    borderColor: "#666",
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  add: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  addButton: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 10
  },
  addText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#666",
    paddingLeft: 6
  }
});
