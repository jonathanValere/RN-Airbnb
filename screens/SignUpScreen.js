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

import colors from "../utils/Colors";

import Title from "../components/Title";

export default function SignInScreen({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Gestion SignupSubmit
  const submitSignUp = async () => {
    try {
      // Gestion de tous les champs vides
      if (
        !email ||
        !username ||
        !description ||
        !password ||
        !confirmPassword
      ) {
        return setErrorMessage("Please fill all fields.");
      }

      // Gestion du mot de passe différent
      if (password !== confirmPassword) {
        return setErrorMessage("Passwords must be the same");
      }

      // Envoie de la requête
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setErrorMessage("");
      setToken(response.data.token, response.data.id);
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Title title="Sign up" />
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
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Describe yourself in a few words..."
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          autoComplete="off"
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      {/* Bouton de validation */}
      <View style={styles.blocBtn}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TouchableHighlight onPress={submitSignUp}>
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableHighlight>
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.goToSignin}>
            Already have an account ? Sign in
          </Text>
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
    backgroundColor: colors.WHITE,
    paddingBottom: 30,
  },
  form: {
    gap: 20,
    backgroundColor: colors.WHITE,
  },
  input: {
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.PRIMARY,
    fontSize: 14,
    width: 300,
  },
  multiline: {
    minHeight: 90,
    borderWidth: 0.8,
    borderColor: colors.PRIMARY,
    padding: 10,
    textAlignVertical: "top",
    marginTop: 20,
  },
  blocBtn: {
    alignItems: "center",
    marginBottom: 10,
  },
  btn: {
    borderColor: colors.PRIMARY,
    borderWidth: 2.5,
    borderRadius: 30,
    overflow: "hidden", // Permet d'appliquer un border radius pour iOS
    paddingVertical: 16,
    paddingHorizontal: 60,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.LIGHTGREY,
    backgroundColor: colors.WHITE,
  },
  goToSignin: {
    marginTop: 15,
    color: colors.LIGHTGREY,
    fontSize: 11,
  },
  error: {
    color: colors.PRIMARY,
    marginBottom: 10,
    fontSize: 12,
  },
});
