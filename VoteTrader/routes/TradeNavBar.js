import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ActiveTrades from "../screens/trade/ActiveTrades";
import MyTrades from "../screens/trade/MyTrades";

const Tab = createMaterialTopTabNavigator();

export default function TradeNavBar() {
  return (
    <Tab.Navigator
      initialRouteName="My Trades"
      tabBarOptions={{
        activeTintColor: "#666",
        labelStyle: { fontSize: 12 }
      }}
    >
      <Tab.Screen
        name="Trade History"
        component={ActiveTrades}
        options={{ tabBarLabel: "Trade History" }}
      />
      <Tab.Screen
        name="My Trades"
        component={MyTrades}
        options={{ tabBarLabel: "My Trades" }}
      />
      <Tab.Screen
        name="Active Trades"
        component={ActiveTrades}
        options={{ tabBarLabel: "Active Trades" }}
      />
    </Tab.Navigator>
  );
}
