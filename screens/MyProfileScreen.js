import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

import Colors from "../utils/Colors";

export default function MyProfileScreen({
  setToken,
  userToken,
  userId,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Récupérer les données de l'utilisateur --
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUsername(data.username);
        setEmail(data.email);
        setDescription(data.description);
        if (data.photo) {
          setAvatar(data.photo);
        }
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Gestion d'une photo avatar ---
  const getPermissionAndGetPicture = async () => {
    // Demander le droit d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      // Ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setAvatar(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  // Gestion update ---
  const handleUpdate = () => {
    return console.log("updated");
  };

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.PRIMARY}
      style={{
        justifyContent: "center",
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    />
  ) : (
    <View style={styles.container}>
      <View style={styles.containerAvatar}>
        <View style={styles.avatar}>
          {!avatar ? (
            <FontAwesome5 name="user-alt" size={80} color={Colors.LIGHTGREY} />
          ) : (
            <Image
              source={{ uri: avatar }}
              width={150}
              height={150}
              style={styles.avatar}
            />
          )}
        </View>
        <View style={styles.linkAvatar}>
          <Pressable onPress={getPermissionAndGetPicture}>
            <FontAwesome5 name="images" size={28} color={Colors.LIGHTGREY} />
          </Pressable>
          <Pressable onPress={() => alert("ouvrir caméra")}>
            <FontAwesome5 name="camera" size={28} color={Colors.LIGHTGREY} />
          </Pressable>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.description}
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          multiline
        />
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.containerBtn} onPress={handleUpdate}>
          <Text style={styles.btn}>Update</Text>
        </Pressable>
        <Pressable
          style={[styles.containerBtn, styles.btnLogout]}
          onPress={() => setToken(null)}
        >
          <Text style={[styles.btn, styles.textLogout]}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  containerAvatar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 50,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkAvatar: {
    justifyContent: "space-evenly",
  },
  input: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY,
    marginBottom: 30,
  },
  description: {
    padding: 10,
    borderWidth: 1,
    textAlignVertical: "top",
    borderColor: Colors.PRIMARY,
    marginBottom: 30,
    height: 100,
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerBtn: {
    marginTop: 20,
    width: 180,
    borderRadius: 28,
  },
  btn: {
    borderRadius: 28,
    borderWidth: 2,
    textAlign: "center",
    padding: 15,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    borderColor: Colors.PRIMARY,
  },
  btnLogout: {
    backgroundColor: Colors.PRIMARY,
  },
  textLogout: {
    color: Colors.WHITE,
  },
});
