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
import { upload, useAuth } from "../Firebase/firebase";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

import {
  getStorage,
  getDownloadURL,
  uploadBytes,
  ref as sRef,
} from "firebase/storage";
import uuid from "uuid";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = (props) => {
  const currentUser = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
  );
  const [image, setImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState(undefined);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState({});

  const [toggleEdit, setToggleEdit] = useState(false);
  const db = getDatabase();

  const userRef = ref(db, "users/" + props.userId);

  const newUserRef = push(userRef);

  const storage = getStorage();

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

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("LoginPage");
    } else {
      const fetchImage = async () => {
        const storage = getStorage();
        const reference = sRef(storage, `users/${props.userId}`);
        await getDownloadURL(reference).then((url) => {
          setImage(url);
          console.log(url);
        });
      };

      fetchImage();
    }
  }, [props.userId]);

  useEffect(() => {
    return onValue(userRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        let result = Object.keys(data).map((key) => {
          return { username: data[key].username, id: key }; //{ task: data[key].task, id: key };
        });

        setData(result);
      } else {
        set(newUserRef, { username: "", bio: "" });
        setData({});
      }
    });
  }, []);

  const editUsername = (newUsername) => {
    update(userRef, { username: newUsername });
    setToggleEdit(!toggleEdit);
  };

  const editBio = (newBio) => {
    update(userRef, { bio: newBio });
    setToggleEdit(!toggleEdit);
  };

  const signOut = () => {
    props.userAuth.signOut();
    setImage(null);
    console.log(image);
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

          <Text style={styles.topUserInfoName}>BOB</Text>
          <Text style={styles.topUserInfoLocation}>Fresno,CA</Text>
        </View>
      </View>
      <View style={styles.boxTwo}>
        <Text style={styles.aboutTitle}>About</Text>

        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Username</Text>
          <TextInput
            value={username}
            onBlur={() => editUsername(username)}
            onChangeText={setUsername}
            style={styles.inputInfo}
          />
        </View>
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Bio</Text>
          <TextInput
            value={bio}
            onBlur={() => editBio(bio)}
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
