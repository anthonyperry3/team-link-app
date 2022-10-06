import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./ProfilePageStyles";
import { getFirestore } from "firebase/firestore";
import app from "../Firebase/firebase";
import { doc, setDoc } from "@firebase/firestore";

import {
  getStorage,
  getDownloadURL,
  uploadBytes,
  ref as sRef,
} from "firebase/storage";
import uuid from "uuid";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = (props) => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const storage = getStorage();
  const db = getFirestore(app);

  // Image Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(pickerResult);

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // const fileRef = sRef(getStorage(), uuid.v4());
    const userImageRef = sRef(storage, `users/${props.userId}`, uuid.v4());
    const result = await uploadBytes(userImageRef, blob);

    return await getDownloadURL(userImageRef);
  }

  const updateUserProfile = () => {
    setDoc(doc(db, "users", props.userId), {
      id: props.userId,
      username: username,
      bio: bio,
      location: location,
      image: image,
    });
  };

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("LoginPage");
    } else {
      const fetchImage = async () => {
        const storage = getStorage();
        const reference = sRef(storage, `users/${props.userId}`);
        await getDownloadURL(reference).then((url) => {
          setImage(url);
          // editProfileImage(url);
        });
      };

      fetchImage();
    }
  }, [props.userId]);

  const signOut = () => {
    setImage(null);
    setBio("");
    setLocation("");
    setUsername("");
    props.userAuth.signOut();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxOne}>
        <View>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>
        <View style={styles.topUserInfo}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>

          <Text style={styles.topUserInfoName}>
            {username ? username : null}
          </Text>
          <Text style={styles.topUserInfoLocation}>
            {location ? location : null}
          </Text>
        </View>
      </View>
      <View style={styles.boxTwo}>
        <Text style={styles.aboutTitle}>About</Text>

        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
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
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.inputInfo}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={updateUserProfile}>
          <Text>Update Profile</Text>
        </TouchableOpacity>
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
