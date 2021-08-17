import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { HomeMap, NewOrderPopUp } from "../component";
import { Title } from "react-native-paper";

const HomeScreen = () => {
  const [newOrder, setNewOrder] = useState();

  useEffect(() => {
  
  }, []);

  return (
    <View style={styles.container}>
      <HomeMap />
      <NewOrderPopUp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
