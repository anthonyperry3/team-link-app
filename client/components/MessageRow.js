import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("ChatRoom")}>
        <Image
          style={styles.matchedUserImage}
          source={{ uri: matchedUserInfo?.image }}
        />
        <Text>{matchedUserInfo?.username}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageRow;

const styles = StyleSheet.create({
  matchedUserImage: {
    height: 100,
    width: 100,
  },
});
