import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";

import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import ProfilePage from "./screens/ProfilePage";
import HomePage from "./screens/HomePage";
import MatchPage from "./screens/MatchPage";
import firebase from "./Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const [userId, setUserId] = useState("");

  const userAuth = getAuth();

  useEffect(() => {
    onAuthStateChanged(userAuth, (user) => {
      if (user !== null) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="HomePage" style={styles.container}>
          <Tab.Screen
            name="LandingPage"
            options={{
              tabBarIcon: () => (
                <AntDesign name="layout" size={24} color="black" />
              ),
              tabBarStyle: { display: "none" },
              headerShown: false,
            }}
            component={LandingPage}
          />
          <Tab.Screen
            name="LoginPage"
            options={{
              tabBarIcon: () => (
                <AntDesign name="login" size={24} color="black" />
              ),

              tabBarStyle: { display: "none" },
              headerShown: false,
            }}
          >
            {(props) => (
              <LoginPage {...props} userAuth={userAuth} userId={userId} />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="MatchPage"
            options={{
              tabBarIcon: () => (
                <Ionicons name="md-people" size={24} color="black" />
              ),

              headerShown: false,
            }}
          >
            {(props) => (
              <MatchPage {...props} userAuth={userAuth} userId={userId} />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="HomePage"
            options={{
              tabBarIcon: () => (
                <Icon name="home" type="font-awesome" color="#444" />
              ),

              headerShown: false,
            }}
          >
            {(props) => (
              <HomePage {...props} userAuth={userAuth} userId={userId} />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="ProfilePage"
            options={{
              tabBarIcon: () => (
                <Icon name="user" type="font-awesome" color="#444" />
              ),

              headerShown: false,
            }}
          >
            {(props) => (
              <ProfilePage {...props} userAuth={userAuth} userId={userId} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
