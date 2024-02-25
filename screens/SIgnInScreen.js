import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableHighlight,
} from "react-native";
import Title from "../components/Title";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <TouchableHighlight onPress={() => alert("Sign in pressed!")}>
          <Text style={styles.btn}>Sign In</Text>
        </TouchableHighlight>
        <Pressable onPress={() => navigation.navigate("signup")}>
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
});
