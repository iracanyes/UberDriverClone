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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import StatusBox from "../StatusBox";
import { IHomeMapProps } from "../../types/interfaces";

navigator.geolocation = require("@react-native-community/geolocation");

const HomeMap = ({ location, setLocation, order, setOrder }: IHomeMapProps) => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(false);
  const [trafficVisibility, setTrafficVisibility] = useState(false);

  const fetchCurrentLocation = async () => {
    await Geolocation.getCurrentPosition((info) => {
      console.log("HomeMap fetchCurrentLocation info", info);
      setLocation(info.coords);
    });
  };

  useEffect(() => {
    const fetchNetworkState = async () => {
      try {
        await NetInfo.fetch().then((state) => {
          //console.log("fetchNetworkState state", state);
          setIsOnline(state.isConnected);
        });
      } catch (e) {
        console.warn("fetchNetworkState error", e);
      }
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

  // Ask permission enable network
  const onNetworkPress = () => {
    console.log("Button network pressed!");
  };

  const bottomAction1 = () => {
    console.log("Button open menu pressed!");
  };

  const onUserLocationChange = (event) => {
    console.log("onUserLocationChange data", event.nativeEvent);
    setLocation(event.nativeEvent.coordinate);
  };

  // Show traffic infos
  const showTraffic = () => {
    setTrafficVisibility(!trafficVisibility);
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
            label={`${0.12} ???`}
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
            latitudeDelta: 0.0822,
            longitudeDelta: 0.0121,
          }}
          style={styles.map}
          zoomEnabled={true}
          zoomControlEnabled={false}
          showsUserLocation={true}
          followsUserLocation={true}
          userLocationUpdateInterval={20000}
          onUserLocationChange={(data) => onUserLocationChange(data)}
          showsTraffic={trafficVisibility}
        >
          {/* Car Location */}
          <Marker title={"Position actuelle"} coordinate={location} />
          {/*** Directions - Client order ***/}
          {order !== null && (
            <MapViewDirections
              apikey={Env.dev.GOOGLE_MAPS_PLACE_API_KEY}
              origin={{
                latitude: order.originLatitude,
                longitude: order.originLongitude,
              }}
              destination={{
                latitude: order.destLatitude,
                longitude: order.destLongitude,
              }}
              strokeWidth={6}
              strokeColor={Colors.default.purple.light}
              strokeColors={[Colors.default.blue.primary]}
              onReady={(result) => {
                console.log("MapViewDirections ready result", result);
                if(order){
                  setOrder({
                    ...order,
                    duration: result.duration,
                    distance: result.distance,
                    isFinished:
                      order.pickedUp || result.distance < 0.2,
                  });
                }
              }}
            />
          )}
          {/*** Directions - Driver to Client ***/}
          {order && location && (
            <MapViewDirections
              apikey={Env.dev.GOOGLE_MAPS_PLACE_API_KEY}
              origin={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              destination={{
                latitude: order.originLatitude,
                longitude: order.originLongitude,
              }}
              strokeWidth={6}
              strokeColor={Colors.default.blue.primary}
              strokeColors={[Colors.default.blue.primary]}
              onReady={(result) => {
                console.log("MapViewDirections ready result", result);
                if (order) {
                  setOrder({
                    ...order,
                    durationPickUp: result.duration,
                    distancePickUp: result.distance,
                    pickedUp: order.pickedUp || result.distance < 0.2,
                  });
                }
              }}
            />
          )}
          {/*** Direction Origin Marker ****/}
          {order !== null && (
            <Marker
              title={"D??part"}
              coordinate={{
                latitude: order.originLatitude,
                longitude: order.originLongitude,
              }}
            >
              <MaterialCommunityIcons
                name={"map-marker"}
                size={42}
                style={styles.iconMarkerUp}
              />
            </Marker>
          )}

          {/*** Direction Destination Marker ****/}
          {order !== null && (
            <Marker
              title={"Arriv??e"}
              coordinate={{
                latitude: order.destLatitude,
                longitude: order.destLongitude,
              }}
            >
              <MaterialCommunityIcons
                name={"map-marker-check"}
                size={42}
                style={styles.iconMarkerDown}
              />
            </Marker>
          )}

          {/*** Directions ***/}
        </MapView>
      )}
      <View
        style={[
          styles.buttonContainer,
          styles.footerButtonContainer,
          { bottom: order ? 100 : 80 },
        ]}
      >
        <TouchableOpacity
          onPress={() => openMenu()}
          style={[styles.roundedButton, styles.buttonShield]}
        >
          <Entypo name={"shield"} size={24} style={styles.iconMenu} />
        </TouchableOpacity>
        {/* Button - Go ( Start strip ) */}
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

        {/* Button - Show traffic info */}
        <TouchableOpacity
          onPress={() => showTraffic()}
          style={[
            styles.roundedButton,
            styles.buttonMenu,
            {
              backgroundColor: trafficVisibility
                ? Colors.default.green.primary
                : Colors.default.grey.light,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"road-variant"}
            size={24}
            style={styles.iconMenu}
          />
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
        {isOnline && (<StatusBox order={order} isOnline={isOnline} />)}
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
