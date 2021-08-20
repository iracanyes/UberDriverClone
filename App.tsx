/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import type { Node } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from "react-native";
import Navigation from "./src/navigation";
import Colors from "./src/constants/Colors";
import { Amplify, Hub } from "aws-amplify";
import config from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as RootNavigation from "./src/navigation/RootNavigation";
Amplify.configure(config);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? Colors.default.black.primary
      : Colors.default.white.light,
  };

  const getAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permission d'accès à votre localisation précise",
          message:
            "Nous désirons accéder à votre localisation précise afin de vous proposer les Uber cars les plus proches.",
          buttonNegative: "Demander ultérieurement",
          buttonNeutral: "Annuler",
          buttonPositive: "Ok",
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Do smthg
        console.log("Fine Geolocation enabled!");
      } else {
        // Close App
        console.warn("Fine Geolocation denied!");
      }
    } catch (e) {
      console.warn(
        "\n\nPermissionsAndroid.request ACCESS_FINE_LOCATION\n",
        e,
      );
    }
  };

  useEffect(() => {
    getAndroidPermission();
  }, []);

  useEffect(() => {
    const fetchAuthUser = async () => {
      Hub.listen("auth", (data) => {
        console.log("Hub.listen data", data);
        switch (data.payload.event) {
          case "signIn":
            console.log("user signed in");
            RootNavigation.navigate("Root", { screen: "Home" });
            break;
          case "signUp":
            console.log("user signed up");
            RootNavigation.navigate("Login");
            break;
          case "signOut":
            console.log("user signed out");
            RootNavigation.navigate("Login");
            break;
          case "signIn_failure":
            console.log("user sign in failed", data);
            break;
          case "configured":
            console.log("the Auth module is configured");
        }
      });
    };
    fetchAuthUser();
  }, []);

  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      {/*
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          transparent={true}
          backgroundColor={"transparent"}
        />
      */}
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
