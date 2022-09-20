import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./ProfilePageStyles";

const ProfilePage = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const signOut = () => {
    props.userAuth.signOut();
  };

  useEffect(() => {
    if (props.userId === "") props.navigation.navigate("LoginPage");
  }, [props.userId]);

  return (
    <View style={styles.container}>
      <View style={styles.boxOne}>
        <View>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>
        <View style={styles.topUserInfo}>
          <Image style={styles.topUserInfoImage} />
          <Text style={styles.topUserInfoName}>BOB</Text>
          <Text style={styles.topUserInfoLocation}>Fresno,CA</Text>
        </View>
      </View>
      <View style={styles.boxTwo}>
        <Text style={styles.aboutTitle}>About</Text>
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputInfo}
          />
        </View>
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.inputInfo}
          />
        </View>
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.inputInfo}
          />
        </View>
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={styles.inputInfo}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={signOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
