import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../constants/Colors";
import styles from "./styles";
import { IPickingUpClient } from "../../../types/interfaces";

const PickingUpClient = ({ order }: IPickingUpClient) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inlineContent}>
          <Text style={styles.headerText}>
            {`${Math.round(order.durationPickUp)} min`}
          </Text>
        </View>
        <FontAwesome
          name={"user-circle"}
          size={32}
          color={Colors.default.white.light}
          style={styles.iconUser}
        />
        <View style={styles.inlineContent}>
          <MaterialCommunityIcons
            name={"map-marker-distance"}
            size={18}
            color={Colors.default.grey.dark}
            style={styles.iconStar}
          />
          <Text style={styles.headerText}>
            {`${order.distancePickUp} km`}
          </Text>
        </View>
      </View>
      {!order.isFinished && (
        <Text style={styles.content}>
          {order.pickedUp
            ? `Dropping off ${order.user.username}`
            : `Picking up ${order.user.username}`}
        </Text>
      )}
    </View>
  );
};

export default PickingUpClient;
