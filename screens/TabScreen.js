import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabScreen({ setToken }) {
  const screenOptions = {
    tabBarStyle: { backgroundColor: "#EB5A62" },
    tabBarLabelStyle: { fontSize: 12, color: "white" },
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="home" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarBadge: 3,
        }}
      >
        {(props) => <SettingsScreen {...props} setToken={setToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
