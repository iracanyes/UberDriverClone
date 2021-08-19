import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { HomeMap, NewOrderPopUp } from "../component";
import { Title } from "react-native-paper";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import { getCar, getUser } from "../graphql/queries";
import DropOffClient from "../component/StatusBox/DropOffClient";

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [location, setLocation] = useState(null);
  const [newOrder, setNewOrder] = useState({
    createdAt: "",
    destLatitude: 37.424755,
    destLongitude: -122.079553,
    originLatitude: 37.417471,
    originLongitude: -122.089764,
    duration: 103.81,
    distance: 103.81,
    id: "aee4c1ab-7f10-4090-83ee-4cc8ee2242e1",
    status: "Picking up someone",
    type: "UberX",
    userId: "b686e661-f5ae-4f5c-9d69-3e5615ec8b7b",
    user: {
      username: "Biggy",
      rating: 6.12,
    },
    isFinished: false,
    pickedUp: true,
  });

  let subscription;

  const setSubscription = (user) => {
    subscription = API.graphql({
      query: onUpdateOrder,
      variables: {
        id: user.card.id,
      },
    }).subscribe({
      next: data => {
        console.log("Subscription on update order", data);
        setNewOrder(data);
      },
      error: (error) => {
        console.warn("Subscription car update error", error);
      },
    });
  };

  const fetchUser = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();

      if (cognitoUser.attributes) {
        const res = await API.graphql(
          graphqlOperation(
            getUser,
            { id: cognitoUser.attributes.sub }
          )
        );

        if (res.data.getUser) {
          console.log("fetchUser", res.data.getUser);
          setUser(res.data.getUser);
        }
      }
    } catch (e) {
      console.warn("fetchUser error", e);
    }
  };

  // Fetch user
  useEffect(() => {
    fetchUser();
  }, []);

  // Set user's card info updates subscription
  useEffect(() => {
    if (user && user.car.isActive) {
      setSubscription(user);
    }
  }, [user]);

  // onOrderDecline
  const onDecline = () => {
    console.log("Decline button pressed!");
    setNewOrder(null);
  };

  const onAccept = (newOrder) => {
    console.log("Accept button pressed!");
    setOrder(newOrder);
    setNewOrder(null);
  };

  return (
    <View style={styles.container}>
      <HomeMap
        location={location}
        setLocation={setLocation}
        order={order}
        setOrder={setOrder}
      />
      {newOrder && (
        <NewOrderPopUp
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          onDecline={onDecline}
          onAccept={onAccept}
        />
      )}
      {order && order.isFinished && (
        <DropOffClient order={order} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
