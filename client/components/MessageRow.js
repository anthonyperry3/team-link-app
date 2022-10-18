import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

const MessageRow = ({ matchDetails, userId, props }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  const getMatchedUserInfo = (users, userId) => {
    const newUsers = { ...users };

    delete newUsers[userId];

    const [id, user] = Object.entries(newUsers).flat();
    return { id, ...user };
  };

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, userId));
  }, [matchDetails, userId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate("ChatRoom")}>
        <View style={styles.child}>
          <Image
            style={styles.matchedUserImage}
            source={{ uri: matchedUserInfo?.image }}
            />
          <Text style={styles.username}>{matchedUserInfo?.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MessageRow;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  child: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    borderBottomColor: "#444",
    height: 100,
    marginLeft: 12,
  },
  username: {
    fontSize: 25,
    paddingLeft: 10,
  },
  matchedUserImage: {
    marginLeft: 10,
    height: 75,
    width: 75,
    // borderWidth: 1,
    // borderColor: "#444",
    borderRadius: 37.5,
  },
});
