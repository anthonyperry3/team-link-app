import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./ProfilePageStyles";

const ProfilePage = (props) => {
  const signOut = () => {
    props.userAuth.signOut();
  };

  useEffect(() => {
    if (props.userId === "") props.navigation.navigate("LoginPage");
  }, [props.userId]);

  return (
    <View>
      <Text>Profile Page</Text>

      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
