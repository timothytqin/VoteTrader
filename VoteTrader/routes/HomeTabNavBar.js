import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Trades from "./TradeNavBar";
import Header from "../components/Header";
import store from "../store";

const Tab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function HomeTabNavBar() {
  return (
    <Tab.Navigator initialRouteName>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Trades"
        component={Trades}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="swap-horiz" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="perm-identity" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
