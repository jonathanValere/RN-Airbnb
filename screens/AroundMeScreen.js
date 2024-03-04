import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Foundation } from "@expo/vector-icons";

import colors from "../utils/Colors";

export default function AroundMe({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [listRooms, setListRooms] = useState([]);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState({});
  const iconLocalization = <Foundation name="marker" size={18} color="black" />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setListRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    const askPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          // Récupérer la position de l'utilisateur ---
          // let location = await Location.getCurrentPositionAsync();
          // const coordsUser = {
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // };

          // Par défaut (Paris)
          const coordsUser = {
            latitude: 48.8564449,
            longitude: 2.4002913,
          };
          setCoords(coordsUser);

          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${coordsUser.latitude}&longitude=${coordsUser.longitude}`
          );
          // console.log(JSON.stringify(data, null, 2));
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };

    askPermission();
    fetchData();
  }, []);

  const greeting = () => {
    return console.log("hello");
  };

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={colors.PRIMARY}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    />
  ) : error ? (
    <View style={styles.container}>
      <Text>Permission refusée</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, width: "100%", height: "100%" }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation
      >
        {listRooms.map((marker) => {
          return (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              onPress={() => navigation.navigate("Room", { id: marker._id })}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE,
  },
});
