import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function RoomScreen({ route }) {
  const data = route.params.dataRoom;
  // console.log(JSON.stringify(data, null, 2));
  let ratingsStar = [];
  for (let numStar = 0; numStar < 5; numStar++) {
    if (numStar < data.ratings) {
      ratingsStar.push(<FontAwesome name="star" size={18} color="#FFB100" />);
    } else {
      ratingsStar.push(<FontAwesome name="star" size={18} color="#BBBBBB" />);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.blocImage}>
        {/* <Image source={{ uri: data.photos[0].url }} style={styles.thumbnail} /> */}
        <FlatList
          data={data.photos}
          keyExtractor={(item) => item.picture_id}
          renderItem={(item) => {
            // console.log(item.item);
            return (
              <Image source={{ uri: item.item.url }} style={styles.thumbnail} />
            );
          }}
          horizontal
        />
        <Text style={styles.price}>{data.price} €</Text>
      </View>
      <View style={styles.containerText}>
        <View style={styles.blocReviewsAndAvatar}>
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {data.title}
            </Text>
            <View style={styles.ratingsAndReviews}>
              <Text style={styles.stars}>
                {ratingsStar.map((item, index) => (
                  <Text key={index}>{item}</Text>
                ))}
              </Text>
              <Text style={styles.reviews}>{data.reviews} Reviews</Text>
            </View>
          </View>
          <Image
            source={{ uri: data.user.account.photo.url }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.description}>{data.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
    // backgroundColor: "blue",
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
    height: "100%",
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
    lineHeight: 20,
  },
});
