import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import LinkingConfiguration from "./LinkingConfiguration";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";
import MainTabNavigator from "./MainTabNavigator";
import {
  NotFoundScreen,
  LoginScreen,
  SignUpScreen,
  ConfirmSignUpScreen,
} from "../screens";
import { INavigationProps } from "../types/interfaces";
import DrawerMenu from "./DrawerMenu";

const Navigation = (props: INavigationProps) => {
  const { colorScheme } = props;

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Root"}
    >
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"SignUp"} component={SignUpScreen} />
      <Stack.Screen
        name={"ConfirmSignUp"}
        component={ConfirmSignUpScreen}
      />
      <Stack.Screen name={"Root"} component={DrawerMenu} />
      <Stack.Screen name={"*"} component={NotFoundScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
