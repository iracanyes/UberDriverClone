import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Pressable } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";
import { Auth, API, graphqlOperation } from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ProgressBar from "react-native-progress";
import styles from "./styles";
import Colors from "../../constants/Colors";
import { getUser } from "../../graphql/queries";
import AntDesign from "react-native-vector-icons/AntDesign";
import { INewOrderPopUp } from "../../types/interfaces";

const NewOrderPopUp = ({
  newOrder,
  distance,
  duration,
  setNewOrder,
  onDecline,
  onAccept,
}: INewOrderPopUp) => {
  const [user, setUser] = useState({});
  const [counter, setCounter] = useState(60);
  console.log("counter", counter);

  useEffect(() => {
    const timer =
      ( counter > 0)
        && setInterval(() => setCounter(counter - 1), 1000);

    if(counter === 0){
      setNewOrder(null);
    }

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onDecline()}
        style={styles.declineButton}
      >
        <AntDesign
          name={"close"}
          size={24}
          style={styles.declineIcon}
        />
        <Text style={styles.declineText}>{"Decline"}</Text>
      </Pressable>
      <Pressable
        onPress={() => onAccept(newOrder)}
        style={styles.cardWrapper}
      >
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              { newOrder.type || "Uber X" }
            </Text>
            <View style={styles.userIconWrapper}>
              <ProgressBar.Circle
                size={70}
                //thickness={10}
                progress={counter / 60}
                color={Colors.default.white.light}
                style={styles.progressBar}
                //indeterminate={true}
                //indeterminateAnimationDuration={30000}
                borderWidth={2}
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
            <Text style={styles.headerText}>
              {newOrder.user.rating || 5.12}
            </Text>
          </View>

          <Card.Content>
            <Title
              style={styles.title}
            >
              {`${newOrder.duration || 12} min`}
            </Title>
            <Paragraph style={styles.caption}>
              {`${newOrder.distance || 2.3} ml`}
            </Paragraph>
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
      </Pressable>
    </View>
  );
};

export default NewOrderPopUp;
