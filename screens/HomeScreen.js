import axios from "axios";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
} from "react-native";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [listRooms, setListRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setIsLoading(false);
        setListRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const Room = ({ title, photos, price, avatar, reviews, ratings }) => {
    return (
      <Pressable onPress={() => alert(`Go to ${title}`)} style={styles.room}>
        <View style={styles.blocImage}>
          <Image source={{ uri: photos }} style={styles.thumbnail} />
          <Text>{price}</Text>
        </View>
        <View>
          <View>
            <Text>{title}</Text>
            <Text>
              <Text>{ratings} étoiles</Text>
              {reviews} Reviews
            </Text>
          </View>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
      </Pressable>
    );
  };

  return isLoading ? (
    <ActivityIndicator size={"large"} color="purple" />
  ) : (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={listRooms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Room
            title={item.title}
            photos={item.photos[0].url}
            price={item.price}
            avatar={item.user.account.photo.url}
            ratings={item.ratingValue}
            reviews={item.reviews}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  room: {
    paddingVertical: 10,
  },
  blocImage: {
    backgroundColor: "pink",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  thumbnail: {
    resizeMode: "cover",
    width: "100%",
    height: 190,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
});
