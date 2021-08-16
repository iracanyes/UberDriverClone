import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen, SearchScreen } from "../screens";

const MainTab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName={"Home"}
    >
      <MainTab.Screen name={"Home"} component={HomeScreen} />
      <MainTab.Screen name={"Search"} component={SearchScreen} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
