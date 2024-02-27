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

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

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
            <Stack.Screen name="Tab" component={TabScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
