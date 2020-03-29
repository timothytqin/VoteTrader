import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ActiveTrades from "../screens/ActiveTrades";
import MyTrades from "../screens/MyTrades";

const Tab = createMaterialTopTabNavigator();

export default function TradeNavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Your Trades"
      tabBarOptions={{
        activeTintColor: "#666",
        labelStyle: { fontSize: 12 }
      }}
    >
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
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: 'Profile' }}
      /> */}
    </Tab.Navigator>
  );
}
