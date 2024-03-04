import axios from "axios";
import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import colors from "../utils/Colors";

// Components ---
import Room from "../components/Room";

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

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={colors.PRIMARY}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={listRooms}
        style={styles.list}
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
    backgroundColor: colors.WHITE,
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: colors.LIGHTGREY,
    marginBottom: 20,
  },
});
