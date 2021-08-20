import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { HomeMap, NewOrderPopUp } from "../component";
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  onCreateOrder,
  onUpdateOrder,
} from "../graphql/subscriptions";
import { getOrder, getUser } from "../graphql/queries";
import DropOffClient from "../component/StatusBox/DropOffClient";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [location, setLocation] = useState(null);
  const [newOrders, setNewOrders] = useState([]);
  const [newOrder, setNewOrder] = useState(null);
  let createOrderSubscription;
  let updateOrderSubscription;

  const fetchUser = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();

      if (cognitoUser.attributes) {
        const res = await API.graphql(
          graphqlOperation(getUser,{ id: cognitoUser.attributes.sub })
        );

        if (res.data.getUser) {
          console.log("fetchUser", res.data.getUser);
          setUser(res.data.getUser);
        }
      } else {
        navigation.navigate("Login");
      }
    } catch (e) {
      console.warn("fetchUser error", e);
    }
  };

  // Fetch user
  useEffect(() => {
    fetchUser();
  }, []);

  // Subscriptions :
  // Subscribe to order created in the area of 5 km near location
  // Subscribe to update on order accepted if exists
  //On unmount, unsubscribe from
  useEffect(() => {
    createOrderSubscription = API.graphql({
      query: onCreateOrder,
      // variables: {},
    }).subscribe({
      next: ({provider, value}) => {
        console.log("createOrderSubscription value", value);
        const orderData = value.data.onCreateOrder;

        // If order near car, add to newOrders array
        const distance = (
          6372.795477598 *
          Math.acos(
            Math.sin(location.latitude) *
              Math.sin(orderData.originLatitude) +
              Math.cos(location.latitude) *
                Math.cos(orderData.originLatitude) *
                Math.cos(location.longitude - orderData.originLongitude),
          )
        );


        const diffLatitude = Math.abs(location.latitude) - Math.abs(orderData.originLatitude);
        const diffLongitude = Math.abs(location.longitude) - Math.abs(orderData.originLongitude);

        if (
          (diffLatitude >= 0 && diffLatitude <= 0.05) ||
          (diffLongitude >= 0 && diffLongitude <= 0.05)
        ) {
          if (
            newOrders.find((el) => el.id === orderData.id) ===
            undefined
          ) {
            console.log("push order to newOrders");
            newOrders.push(order);
          }
        }
      },
      error: (e) => console.warn("createOrderSubscription error", e),
    });

    if (order) {
      updateOrderSubscription = API.graphql({
        query: onUpdateOrder,
        //variables: { id: order.id },
      }).subscribe({
        next: ({ value }) => {
          console.log("Subscription on update order", value);

          if (value.data.onUpdateOrder) {
            // If it's the active order, update it
            if (order && order.id === value.data.onUpdateOrder.id) {
              setOrder(value.data.onUpdateOrder);
            }

            // If newOrders contains the order updated, if taken by another driver delete it from newOrders
            const arr = newOrders;
            const index = arr
              .map((el) => el.id)
              .indexOf(value.data.onUpdateOrder.id);
            console.log("newOrders", arr);
            console.log("Order index", index);
            console.log("Order exist in newOrders", index > -1);

            if (index > -1) {
              if (value.data.onUpdateOrder.status === "Started") {
                arr.splice(index, 1);
                console.log("updated newOrders", arr);
                setNewOrders(arr);
              }
            }
          }
          //
        },
        error: (error) => {
          console.warn("Subscription car update error", error);
        },
      });
    }

    return () => {
      createOrderSubscription &&
        createOrderSubscription.unsubscribe();
      updateOrderSubscription &&
        updateOrderSubscription.unsubscribe();
    };
  }, [order]);

  /***
   * Show new order if no new order already shown
   * Check if order already taken by an other driver
   * Take the first element of the array, as each newOrder is pushed in the array
   */
  useEffect(() => {
    const checkOrder = async () => {
      try {
        const res = await API.graphql(
          graphqlOperation(getOrder, { id: newOrders[0].id }),
        );

        if (res.data.getOrder) {
          // If Order has a driver, remove it from newOrders
          if (res.data.getOrder.car) {
            const arr = newOrders;
            arr.splice(0, 1);
            setNewOrders(arr);
          } else {
            setNewOrder(res.data.getOrder);
          }
        } else {
          console.warn(`Order doesn't exist!`);
        }
      } catch (e) {
        console.warn("fetchOrder error", e);
      }
    };

    if (newOrder === null && order === null && newOrders.length > 0) {
      checkOrder();
    }
  }, [newOrders, newOrder]);

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
