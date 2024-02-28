import { View, Text, StyleSheet, Pressable } from "react-native";

export default function MyProfile({ setToken }) {
  return (
    <View>
      <Text>MyProfile</Text>
      <Pressable onPress={() => setToken(null)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
