import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { HomeMap } from "../component";
import { Title } from "react-native-paper";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
