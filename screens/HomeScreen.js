import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen({ route }) {
  // const { token } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur la homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
