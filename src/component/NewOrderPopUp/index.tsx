import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Pressable } from "react-native";
import {
  Card,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
import { Auth, API, graphqlOperation } from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ProgressBar from "react-native-progress";
import styles from "./styles";
import Colors from "../../constants/Colors";
import { getUser } from "../../graphql/queries";
import AntDesign from "react-native-vector-icons/AntDesign";

const NewOrderPopUp = () => {
  const [user, setUser] = useState({});
  const [visibility, setVisibility] = useState(false);

  const fetchUser = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();

      if (cognitoUser.attributes.sub) {
        const res = await API.graphql(
          graphqlOperation(getUser, {
            id: cognitoUser.attributes.sub,
          })
        );

        if (res.data.getUser) {
          setUser(res.data.getUser);
        }
      }
    } catch (e) {
      console.warn("NewOrderPopUp fetchUser error", e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onDeclinePress = () => {
    console.log("onDecline button pressed!");
    setVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onDeclinePress()}
        style={styles.declineButton}
      >
        <AntDesign
          name={"close"}
          size={24}
          style={styles.declineIcon}
        />
        <Text style={styles.declineText}>{"Decline"}</Text>
      </Pressable>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            { user.type || "Uber X" }
          </Text>
          <View style={styles.userIconWrapper}>
            <ProgressBar.Circle
              size={70}
              thickness={10}
              color={Colors.default.white.light}
              style={styles.progressBar}
            />
            <FontAwesome5
              name={"user-alt"}
              size={36}
              style={styles.iconUser}
            />
          </View>
          <FontAwesome5
            name={"star"}
            size={24}
            style={styles.iconStar}
          />
          <Text style={styles.headerText}>{5.08}</Text>
        </View>

        <Card.Content>
          <Title style={styles.title}>{`${2} min`}</Title>
          <Paragraph style={styles.caption}>{`${0.3} ml`}</Paragraph>
        </Card.Content>
        <View style={styles.footer}>
          <FontAwesome5
            name={"star"}
            size={24}
            style={styles.iconStar}
          />
          <Text style={styles.footerText}>
            Toward your destination
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default NewOrderPopUp;
