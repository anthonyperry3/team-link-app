import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./ProfilePageStyles";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

const ProfilePage = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const [data, setData] = useState({});

  const [toggleEdit, setToggleEdit] = useState(false);
  const db = getDatabase();

  const userRef = ref(db, "users/" + props.userId);
  const newUserRef = push(userRef);

  useEffect(() => {
    return onValue(userRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        //console.log(data);
        let result = Object.keys(data).map((key) => {
          return { username: data[key].username, id: key }; //{ task: data[key].task, id: key };
        });
        // console.log(data);
        setData(result);
      } else {
        set(newUserRef, { username: "", bio: "" });
        setData({});
      }
    });
  }, []);
  const editUsername = (newUsername) => {
    //console.log(userRef);
    update(userRef, { username: newUsername });
    setToggleEdit(!toggleEdit);
  };

  const editBio = (newBio) => {
    update(userRef, { bio: newBio });
    setToggleEdit(!toggleEdit);
  };

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
          {/* <Image style={styles.topUserInfoImage} /> */}
          <Text style={styles.topUserInfoName}>BOB</Text>
          <Text style={styles.topUserInfoLocation}>Fresno,CA</Text>
        </View>
      </View>
      <View style={styles.boxTwo}>
        <Text style={styles.aboutTitle}>About</Text>
        {/* <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputInfo}
          />
        </View> */}
        <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Username</Text>
          <TextInput
            value={username}
            onBlur={() => editUsername(username)}
            onChangeText={setUsername}
            style={styles.inputInfo}
          />
        </View>
        {/* <View style={styles.inputContainers}>
          <Text style={styles.inputTitles}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.inputInfo}
          />
        </View> */}
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
    </View>
  );
};

export default ProfilePage;

// import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
// import React, { useState, useEffect } from "react";
// import styles from "./ProfilePageStyles";

// const ProfilePage = (props) => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [location, setLocation] = useState("");

//   const signOut = () => {
//     props.userAuth.signOut();
//   };

//   useEffect(() => {
//     if (props.userId === "") props.navigation.navigate("LoginPage");
//   }, [props.userId]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.boxOne}>
//         <View>
//           <Text style={styles.pageTitle}>Profile</Text>
//         </View>
//         <View style={styles.topUserInfo}>
//           <Image style={styles.topUserInfoImage} />
//           <Text style={styles.topUserInfoName}>BOB</Text>
//           <Text style={styles.topUserInfoLocation}>Fresno,CA</Text>
//         </View>
//       </View>
//       <View style={styles.boxTwo}>
//         <Text style={styles.aboutTitle}>About</Text>
//         <View style={styles.inputContainers}>
//           <Text style={styles.inputTitles}>Full Name</Text>
//           <TextInput
//             value={name}
//             onChangeText={setName}
//             style={styles.inputInfo}
//           />
//         </View>
//         <View style={styles.inputContainers}>
//           <Text style={styles.inputTitles}>Username</Text>
//           <TextInput
//             value={username}
//             onChangeText={setUsername}
//             style={styles.inputInfo}
//           />
//         </View>
//         <View style={styles.inputContainers}>
//           <Text style={styles.inputTitles}>Location</Text>
//           <TextInput
//             value={location}
//             onChangeText={setLocation}
//             style={styles.inputInfo}
//           />
//         </View>
//         <View style={styles.inputContainers}>
//           <Text style={styles.inputTitles}>Bio</Text>
//           <TextInput
//             value={bio}
//             onChangeText={setBio}
//             style={styles.inputInfo}
//           />
//         </View>
//       </View>

//       <View>
//         <TouchableOpacity onPress={signOut}>
//           <Text>Sign Out</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProfilePage;
