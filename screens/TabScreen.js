import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import RoomScreen from "./RoomScreen";
import MyProfile from "./MyProfileScreen";
import AroundMeScreen from "./AroundMeScreen";
import { Pressable, Text } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabScreen({ navigation, setToken }) {
  const screenOptions = {
    tabBarStyle: { backgroundColor: "#fff" },
    tabBarLabelStyle: { fontSize: 12, color: "#000" },
    headerTitle: () => (
      <Pressable onPress={() => navigation.navigate("HomeScreen")}>
        <FontAwesome6 name="airbnb" size={30} color="#EB5A62" />
      </Pressable>
    ),
    headerLeft: (props) => {
      console.log(props);
      return (
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </Pressable>
      );
    },
  };
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: (props) => {
            return (
              <Ionicons
                name="home"
                size={20}
                color={props.focused === true ? "#EB5A62" : "#000"}
              />
            );
          },
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Room" component={RoomScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Around Me"
        options={{
          tabBarIcon: (props) => (
            <AntDesign
              name="enviromento"
              size={20}
              color={props.focused === true ? "#EB5A62" : "#000"}
            />
          ),
        }}
      >
        {(props) => <AroundMeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="My Profile"
        options={{
          tabBarIcon: (props) => (
            <AntDesign
              name="user"
              size={20}
              color={props.focused === true ? "#EB5A62" : "#000"}
            />
          ),
        }}
      >
        {(props) => <MyProfile {...props} setToken={setToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
