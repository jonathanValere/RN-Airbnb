import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function MyProfile({ setToken, userToken, ...props }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("my profil");
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>MyProfile</Text>
      <Pressable onPress={() => setToken(null)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
