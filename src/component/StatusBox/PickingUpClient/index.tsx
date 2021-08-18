import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../../constants/Colors";
import styles from "./styles";
import { IPickingUpClient } from "../../../types/interfaces";

const PickingUpClient = ({ order }: IPickingUpClient) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {`${order.duration} min`}
        </Text>
        <Entypo
          name={"user"}
          size={24}
          color={Colors.default.green.primary}
          style={styles.iconUser}
        />
        <AntDesign
          name={"staro"}
          size={22}
          color={Colors.default.grey.dark}
          style={styles.iconStar}
        />
        <Text style={styles.headerText}>
          {`${order.user.rating}`}
        </Text>
      </View>
      <Text style={styles.content}>
        {`Picking up ${order.user.username}`}
      </Text>
    </View>
  );
};

export default PickingUpClient;
