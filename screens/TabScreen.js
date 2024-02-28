import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import MyProfile from "./MyProfileScreen";
import AroundMeScreen from "./AroundMeScreen";

const Tab = createBottomTabNavigator();

export default function TabScreen({ setToken, userToken }) {
  const screenOptions = {
    tabBarStyle: { backgroundColor: "#fff" },
    tabBarLabelStyle: { fontSize: 12, color: "#EB5A62" },
  };
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={20} color="#EB5A62" />,
        }}
      />
      <Tab.Screen
        name="Around Me"
        options={{
          tabBarIcon: () => (
            <AntDesign name="enviromento" size={20} color="#EB5A62" />
          ),
        }}
      >
        {(props) => <AroundMeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="My Profile"
        options={{
          tabBarIcon: () => <AntDesign name="user" size={20} color="#EB5A62" />,
        }}
      >
        {(props) => <MyProfile {...props} setToken={setToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
