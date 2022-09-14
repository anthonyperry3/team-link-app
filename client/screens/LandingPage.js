import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./LandingPageStyles";

const LandingPage = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.startText}>
        <Text style={styles.mainText}>Let's Get Started</Text>
        <Text style={styles.subText}>Play Together</Text>
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => props.navigation.navigate("LoginPage")}
      >
        <Text style={styles.buttonText}>JOIN NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;
