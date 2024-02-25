import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function ({ title }) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="airbnb" size={100} color="#EB5A62" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#737373",
  },
});
