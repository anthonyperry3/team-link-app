import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import ProfilePage from "./screens/ProfilePage";

import firebase from "./Firebase/firebase";
// import { getAuth, onAuthStateChanged } from "./Firebase/firebase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Finder" component={Finder} />
      <Tab.Screen name="Matches" component={Matches} />
    </Tab.Navigator>
  );
}

function App() {

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
    <NavigationContainer>
    <Stack.Navigator initialRouteName = "Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
