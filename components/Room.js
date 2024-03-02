import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../utils/Colors";

export default function Room({
  title,
  photos,
  price,
  avatar,
  reviews,
  ratings,
  id,
}) {
  const navigation = useNavigation();

  // Gestion Star ---
  let ratingsStar = [];
  for (let numStar = 0; numStar < 5; numStar++) {
    if (numStar < ratings) {
      ratingsStar.push(
        <FontAwesome name="star" size={16} color={colors.YELLOW} />
      );
    } else {
      ratingsStar.push(
        <FontAwesome name="star" size={16} color={colors.LIGHTGREY} />
      );
    }
  }
  // -----

  return (
    <Pressable onPress={() => navigation.navigate("Room", { id: id })}>
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
                <Text key={index} style={styles.star}>
                  {item}
                </Text>
              ))}
            </Text>
            <Text style={styles.reviews}>{reviews} Reviews</Text>
          </View>
        </View>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
  room: {
    paddingVertical: 10,
  },
  blocImage: {
    width: "100%",
  },
  price: {
    fontSize: 16,
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
});
