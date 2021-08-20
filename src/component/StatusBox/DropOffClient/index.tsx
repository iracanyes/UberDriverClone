import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Title } from "react-native-paper";
import styles from "./styles";
import { IDropOffClientProps } from "../../../types/interfaces";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DropOffClient = ({ order }: IDropOffClientProps) => {
  const completeOrder = () => {
    console.log("button Complete order pressed!");
  };
  
  const onPhonePress = () => {
    console.log("button onPhonePress pressed!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onPhonePress()}
          style={styles.headerButton}
        >
          <MaterialCommunityIcons
            name={"phone-message"}
            size={32}
            style={styles.iconPhone}
          />
        </TouchableOpacity>
        <Title style={styles.title}>{order.user.username}</Title>
        <TouchableOpacity
          onPress={() => onPhonePress()}
          style={styles.headerButton}
        >
          <FontAwesome5
            name={"user-circle"}
            size={32}
            style={styles.iconPhone}
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        onPress={() => completeOrder()}
        style={styles.button}
      >
        <FontAwesome5
          name={"flag-checkered"}
          size={24}
          style={styles.iconFlag}
        />
        <Text
          style={styles.buttonText}
        >{`Complete ${order.type}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropOffClient;
