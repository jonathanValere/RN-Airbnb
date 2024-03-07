import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import TabScreen from "./screens/TabScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ScreenOptions ---
  const screenOptionsSign = {
    headerShown: false,
  };

  const screenOptionsTab = {
    headerStyle: { backgroundColor: "blue" },
    headerShown: false,
  };
  // -----

  const setToken = async (token, id) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }

    setUserId(id);
    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setUserId(userId);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // Screens pour l'authentification
          <Stack.Group screenOptions={screenOptionsSign}>
            <Stack.Screen name="Signin">
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          // Screens pour les utilisateurs loggés
          <Stack.Group screenOptions={screenOptionsTab}>
            <Stack.Screen name="Tab">
              {(props) => (
                <TabScreen
                  {...props}
                  setToken={setToken}
                  userToken={userToken}
                  userId={userId}
                />
              )}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
