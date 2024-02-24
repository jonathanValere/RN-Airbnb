import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import Title from "../components/Title";
import { useState } from "react";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Title title="Sign in" />
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
      <View style={styles.blocBtn}>
        <TouchableHighlight onPress={() => alert("Sign in pressed!")}>
          <Text style={styles.btn}>Sign In</Text>
        </TouchableHighlight>
        <Pressable onPress={() => navigation.navigate("signup")}>
          <Text style={styles.goToRegister}>No account ? register</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  form: {
    gap: 30,
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
    marginVertical: 30,
    alignItems: "center",
  },
  btn: {
    borderColor: "#EB5A62",
    borderWidth: 2.5,
    borderRadius: 30,
    overflow: "hidden", // Permet d'appliquer un border radius pour iOS
    paddingVertical: 20,
    paddingHorizontal: 80,
    fontSize: 15,
    fontWeight: "bold",
    color: "#737373",
    backgroundColor: "white",
  },
  goToRegister: {
    marginTop: 20,
    color: "#737373",
    fontSize: 11,
  },
});
