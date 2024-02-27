import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Pressable onPress={() => setToken(null)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
