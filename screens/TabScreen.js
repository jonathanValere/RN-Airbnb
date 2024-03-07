import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../utils/Colors";

import HomeScreen from "./HomeScreen";
import RoomScreen from "./RoomScreen";
// import MyProfile from "./MyProfileScreen";
import AroundMeScreen from "./AroundMeScreen";
import { Pressable, Text } from "react-native";
import MyProfileScreen from "./MyProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabScreen({ navigation, setToken, userToken, userId }) {
  const screenOptions = {
    tabBarStyle: { backgroundColor: "#fff" },
    tabBarLabelStyle: { fontSize: 12, color: "#000" },
    headerTitle: () => (
      <Pressable onPress={() => navigation.navigate("HomeScreen")}>
        <FontAwesome6 name="airbnb" size={30} color={colors.PRIMARY} />
      </Pressable>
    ),
    headerLeft: () => {
      if (navigation.canGoBack()) {
        return (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>Go back</Text>
          </Pressable>
        );
      }
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
                color={props.focused === true ? colors.PRIMARY : "#000"}
              />
            );
          },
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
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
              color={props.focused === true ? colors.PRIMARY : "#000"}
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
              color={props.focused === true ? colors.PRIMARY : "#000"}
            />
          ),
        }}
      >
        {(props) => (
          <MyProfileScreen
            {...props}
            setToken={setToken}
            userToken={userToken}
            userId={userId}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
