import { View, Text, TouchableOpacity, TextInput, Image, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./ProfilePageStyles";
// import { userAuth } from "firebase";

// const currentUser = userAuth()


const ProfilePage = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [photoURL, setPhotoURL] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg")

  const signOut = () => {
    props.userAuth.signOut();
  };

  const currentUser = () => {
    props.userAuth.currentUser();
  };

  useEffect(() => {
    if(currentUser && currentUser.photoURL){
      setPhotoURL(currentUser.photoURL)
    }
  }, [currentUser]);

  useEffect(() => {
    if (props.userId === "") props.navigation.navigate("LoginPage");
  }, [props.userId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxOne}>
        <View>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>
        <View style={styles.topUserInfo}>
          {/* <Image style={styles.topUserInfoImage} /> */}
          <img src={photoURL} alt="avatar"/>
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
    </ScrollView>
  );
};

export default ProfilePage;
