import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

import MapView, { Marker } from "react-native-maps";

import colors from "../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function RoomScreen({ route }) {
  const [roomInfos, setRoomInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setRoomInfos(data);
        setLongitude(data.location[0]);
        setLatitude(data.location[1]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const listStar = (rating) => {
    const ratingStar = [];
    for (let numStar = 0; numStar < 5; numStar++) {
      if (numStar < rating) {
        ratingStar.push(
          <FontAwesome name="star" size={18} color={colors.YELLOW} />
        );
      } else {
        ratingStar.push(
          <FontAwesome name="star" size={18} color={colors.LIGHTGREY} />
        );
      }
    }
    return ratingStar;
  };

  return isLoading ? (
    <ActivityIndicator
      style={styles.indicator}
      size="large"
      color={colors.PRIMARY}
    />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.blocImage}>
        <FlatList
          data={roomInfos.photos}
          keyExtractor={(item) => item.picture_id}
          renderItem={({ item }) => {
            return (
              <Image source={{ uri: item.url }} style={styles.thumbnail} />
            );
          }}
          horizontal
        />
        <Text style={styles.price}>{roomInfos.price} €</Text>
      </View>
      <View style={styles.containerText}>
        <View style={styles.blocReviewsAndAvatar}>
          <View>
            <Text style={styles.title}>{roomInfos.title}</Text>
            <View style={styles.ratingsAndReviews}>
              <Text style={styles.stars}>
                {listStar(roomInfos.ratingValue).map((item, index) => (
                  <Text key={index}>{item}</Text>
                ))}
              </Text>
              <Text style={styles.reviews}>{roomInfos.reviews} Reviews</Text>
            </View>
          </View>
          <Image
            source={{ uri: roomInfos.user.account.photo.url }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {roomInfos.description}
        </Text>
      </View>
      <MapView
        style={{ flex: 1, width: "100%", height: "100%", marginTop: 20 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        <Marker
          key={roomInfos._id}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={roomInfos.title}
          description={roomInfos.description}
          // image={require("../assets/images/marker.png")}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  indicator: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  containerText: {
    paddingHorizontal: 20,
  },
  room: {
    paddingVertical: 10,
  },
  blocImage: {
    width: "100%",
    height: 250,
  },
  price: {
    fontSize: 20,
    backgroundColor: "black",
    color: colors.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: "absolute",
    bottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    width: 250,
    marginBottom: 15,
    lineHeight: 22,
  },
  stars: {
    marginRight: 10,
  },
  reviews: {
    fontSize: 14,
    color: colors.LIGHTGREY,
  },
  thumbnail: {
    resizeMode: "cover",
    width: 400,
  },
  blocReviewsAndAvatar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    alignItems: "center",
  },
  ratingsAndReviews: {
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    height: 65,
    width: 65,
    borderRadius: 50,
  },
  description: {
    lineHeight: 22,
    fontSize: 16,
  },
});
