import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";

import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import ProfilePage from "./screens/ProfilePage";
import HomePage from "./screens/HomePage";
import firebase from "./Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

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
          {/* <Tab.Screen
            name="LandingPage"
            options={{
              tabBarStyle: { display: "none" },
              headerShown: false,
            }}
            component={LandingPage}
          /> */}
          <Tab.Screen
            name="LoginPage"
            options={{
              tabBarIcon: () => (
                <Icon name="envelope" type="font-awesome" color="#444" />
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
          {/* <Tab.Screen name="ProfilePage" component={ProfilePage} /> */}
          {/* <Tab.Screen name="Matches" component={Matches} /> */}
        </Tab.Navigator>
        {/* <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="LoginPage">
          {(props) => (
            <LoginPage {...props} userAuth={userAuth} userId={userId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeTabs} /> */}
        {/* </Stack.Navigator> */}
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
