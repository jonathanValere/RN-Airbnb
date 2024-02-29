import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import Title from "../components/Title";

export default function SignInScreen({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  // Gestion de l'authentification --
  const handleSignIn = async () => {
    try {
      // Vérification que les champs sont remplis
      if (!email || !password) {
        return setErrorMessage(!errorMessage);
      }
      // Envoie de la requête d'authentification
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.email === email && password === "pass") {
        setErrorMessage(false);
        // Stocker le token dans la mémoire de l'appareil
        setToken(response.data.token);
      } else {
        alert("Email or password error");
      }
    } catch (error) {
      console.log("Error >>>>", error.response.data.error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Title title="Sign in" />
      {/* Formulaire */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {/* Bouton de validation */}
      <View style={styles.blocBtn}>
        {errorMessage && (
          <Text style={styles.error}>Please fill all fields</Text>
        )}
        <TouchableHighlight onPress={handleSignIn}>
          <Text style={styles.btn}>Sign In</Text>
        </TouchableHighlight>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.goToRegister}>No account ? register</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingBottom: 30,
  },
  form: {
    gap: 20,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: "#EB5A62",
    fontSize: 14,
    width: 300,
  },
  blocBtn: {
    alignItems: "center",
    marginBottom: 10,
  },
  btn: {
    borderColor: "#EB5A62",
    borderWidth: 2.5,
    borderRadius: 30,
    overflow: "hidden", // Permet d'appliquer un border radius pour iOS
    paddingVertical: 16,
    paddingHorizontal: 60,
    fontSize: 14,
    fontWeight: "bold",
    color: "#737373",
    backgroundColor: "white",
  },
  goToRegister: {
    marginTop: 15,
    color: "#737373",
    fontSize: 11,
  },
  error: {
    color: "#EB5A62",
    marginBottom: 10,
    fontSize: 12,
  },
});
