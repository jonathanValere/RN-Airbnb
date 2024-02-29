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
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
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

  const Room = ({ title, photos, price, avatar, reviews, ratings, id }) => {
    let ratingsStar = [];
    for (let numStar = 0; numStar < 5; numStar++) {
      if (numStar < ratings) {
        ratingsStar.push(<FontAwesome name="star" size={16} color="#FFB100" />);
      } else {
        ratingsStar.push(<FontAwesome name="star" size={16} color="#BBBBBB" />);
      }
    }

    return (
      <Pressable
        onPress={async () => {
          try {
            const { data } = await axios.get(
              `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
            );
            return navigation.navigate("Room", { dataRoom: data });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <View style={styles.blocImage}>
          <Image source={{ uri: photos }} style={styles.thumbnail} />
          <Text style={styles.price}>{price} €</Text>
        </View>
        <View style={styles.blocReviewsAndAvatar}>
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <View style={styles.ratingsAndReviews}>
              <Text style={styles.stars}>
                {ratingsStar.map((item, index) => (
                  <Text key={index}>{item}</Text>
                ))}
              </Text>
              <Text style={styles.reviews}>{reviews} Reviews</Text>
            </View>
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
            id={item._id}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  room: {
    paddingVertical: 10,
  },
  blocImage: {
    width: "100%",
  },
  price: {
    fontSize: 20,
    backgroundColor: "black",
    color: "#fff",
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
  },
  stars: {
    marginRight: 10,
  },
  reviews: {
    fontSize: 14,
    color: "grey",
  },
  thumbnail: {
    resizeMode: "cover",
    width: "100%",
    height: 190,
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
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "grey",
    marginBottom: 20,
  },
});
