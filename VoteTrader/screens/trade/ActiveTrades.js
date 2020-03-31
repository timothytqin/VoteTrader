import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import store from "../../store";

import Trade from "../Trade";
import Filter from "../modals/Filter";
import Card from "../../components/Card";
import Popup from "../../components/Popup";

export default function ActiveTrades({ navigation }) {
  const [trades, setTrades] = useState(
    store.getState().reducer.trades.activeTrades
  );
  const [filterOpen, setFilterModalOpen] = useState(false);

  store.subscribe(() => {
    setTrades(store.getState().reducer.trades.activeTrades);
  });

  return (
    <View style={styles.container}>
      <Popup visible={filterOpen} modalOpen={setFilterModalOpen}>
        <Filter modalOpen={setFilterModalOpen} />
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
            <Text style={styles.emptyText}>There are no active trades.</Text>
          </View>
        )}
      </View>
      <View style={styles.filter}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalOpen(true)}
        >
          <Text style={styles.filterText}>Filter</Text>
          <MaterialCommunityIcons
            name="filter-outline"
            size={32}
            color={"#666"}
          />
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
  filter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  filterButton: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 10
  },
  filterText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#666",
    paddingLeft: 6
  }
});
