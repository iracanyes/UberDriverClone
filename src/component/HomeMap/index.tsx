import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Avatar, ToggleButton, Text } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./styles";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "@react-native-community/geolocation";
import Env from "../../constants/Env";
import Colors from "../../constants/Colors";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";


navigator.geolocation = require("@react-native-community/geolocation");

const HomeMap = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  const fetchCurrentLocation = async () => {
    await Geolocation.getCurrentPosition((info) => {
      console.log("HomeMap fetchCurrentLocation info", info);
      setLocation(info.coords);
    });
  };

  useEffect(() => {
    const fetchNetworkState = async () => {
      await NetInfo.fetch().then(state => {
        console.log("fetchNetworkState state", state);
        setIsOnline(state.isConnected);
      });
    };

    fetchNetworkState();
  }, []);

  // Fetch current location
  useEffect(() => {
    if (location === null) {
      fetchCurrentLocation();
    }
  }, [location]);

  const openMenu = () => {
    console.log("Button open menu pressed!");
  };

  const onNetworkPress = () => {
    console.log("Button network pressed!");
  };

  const bottomAction1 = () => {
    console.log("Button open menu pressed!");
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.buttonContainer, styles.headerButtonContainer]}
      >
        <TouchableOpacity
          onPress={() => openMenu()}
          style={[styles.roundedButton, styles.buttonMenu]}
        >
          <Entypo name={"menu"} size={24} style={styles.iconMenu} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonPrice]}>
          <Avatar.Text
            size={36}
            label={`${0.12} €`}
            style={styles.headerPrice}
            labelStyle={styles.buttonLabelText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Root", { screen: "Search" })
          }
          style={[styles.roundedButton, styles.headerRightButton]}
        >
          <Feather
            name={"search"}
            size={24}
            style={styles.iconSearch}
          />
        </TouchableOpacity>
      </View>
      {location !== null && (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}
          style={styles.map}
          zoomEnabled={true}
          zoomControlEnabled={false}
          showsUserLocation={true}
        >
          {/* Car Location */}
          <Marker title={"Position actuelle"} coordinate={location} />
          {/*** Directions ***/}
          {/*
            <MapViewDirections
              apiKey={Env.dev.GOOGLE_MAPS_PLACE_API_KEY}
              //origin={}
              //destination={}
              strokeWidth={6}
              strokeColor={Colors.default.purple.light}
              strokeColors={[Colors.default.blue.primary]}
              onReady={(result) =>
                console.log("MapViewDirections ready result", result)
              }
            />
          */}
          {/*** Directions ***/}
        </MapView>
      )}
      <View
        style={[styles.buttonContainer, styles.footerButtonContainer]}
      >
        <TouchableOpacity
          onPress={() => openMenu()}
          style={[styles.roundedButton, styles.buttonShield]}
        >
          <Entypo name={"shield"} size={24} style={styles.iconMenu} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openMenu()}
          style={styles.buttonGo}
        >
          <Avatar.Text
            size={45}
            label={"Go"}
            style={styles.buttonGoIconContainer}
            labelStyle={styles.buttonLabelText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openMenu()}
          style={[styles.roundedButton, styles.buttonMenu]}
        >
          <Entypo name={"menu"} size={24} style={styles.iconMenu} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.bottomLeftbutton}
          onPress={() => onNetworkPress()}
        >
          {isOnline ? (
            <FontAwesome
              name={"toggle-on"}
              size={24}
              style={styles.iconNetworkOn}
            />
          ) : (
            <FontAwesome
              name={"toggle-off"}
              size={24}
              style={styles.iconNetworkOff}
            />
          )}
        </Pressable>
        {isOnline ? (
          <Text style={styles.bottomText}>You're online</Text>
        ) : (
          <Text style={styles.bottomText}>You're offline!</Text>
        )}
        <Pressable
          style={styles.bottomRightbutton}
          onPress={() => bottomAction1()}
        >
          <Entypo name={"menu"} size={24} style={styles.iconMenu} />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeMap;
