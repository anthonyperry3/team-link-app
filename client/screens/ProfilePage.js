import { View, Text, TouchableOpacity, TextInput, Image, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./ProfilePageStyles";
import { upload, useAuth} from "../Firebase/firebase";

const ProfilePage = (props) => {
  const currentUser = useAuth()
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png")

  const signOut = () => {
    props.userAuth.signOut();
  };

  // const currentUser = () => {
  //   props.userAuth.currentUser();
  // };

  

  useEffect(() => {
    if(currentUser && currentUser.photoURL){
      setPhotoURL(currentUser.photoURL)
    }
  }, [currentUser]);

  useEffect(() => {
    if (props.userId === "") props.navigation.navigate("LoginPage");
  }, [props.userId]);

  function handleChange(e) {
    if(e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxOne}>
        <View>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>
        <View style={styles.topUserInfo}>
          {/* <Image style={styles.topUserInfoImage} /> */}
          <input type="file" onChange={handleChange}/>
          <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
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
