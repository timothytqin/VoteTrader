import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Trades from "./TradeNavBar";

const Tab = createBottomTabNavigator();

export default function HomeTabNavBar() {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <NavigationContainer initialRouteName="Home">
      <Tab.Navigator>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
