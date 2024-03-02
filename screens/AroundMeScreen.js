import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function AroundMe() {
  const [markers, SetMarkers] = useState([]);

  useEffect(() => {
    const getMap = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${48.8564449}&longitude=${2.4002913}`
        );
        // console.log(data);
        SetMarkers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMap();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 48.8564449,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {markers.map((marker) => {
          // console.log("marker >>>>", JSON.stringify(marker, null, 2));
          return (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              title={marker.title}
              description={marker.description}
              image={require("../assets/images/marker.png")}
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
  },
});
