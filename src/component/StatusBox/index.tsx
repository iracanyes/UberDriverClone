import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../../constants/Colors";
import PickingUpClient from "./PickingUpClient";
import DropOffClient from "./DropOffClient";

const StatusBox = ({ isOnline, order }) => {
  let status = null;
  if (isOnline) {
    if (order !== null) {
      status = <PickingUpClient order={order} />;
    } else {
      status = <Text style={styles.bottomText}>You're online</Text>;
    }
  } else {
    status = <Text style={styles.bottomText}>You're offline!</Text>;
  }

  return status;
};

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.default.grey.dark,
  },
});

export default StatusBox;
