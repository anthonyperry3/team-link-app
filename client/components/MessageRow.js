import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  getFirestore,
} from "firebase/firestore";
import app from "../Firebase/firebase";

const MessageRow = ({ matchDetails, userId, props }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState();

  const tw = useTailwind();
  const db = getFirestore(app);

  const getMatchedUserInfo = (users, userId) => {
    const newUsers = { ...users };

    delete newUsers[userId];

    const [id, user] = Object.entries(newUsers).flat();
    return { id, ...user };
  };

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, userId));
  }, [matchDetails, userId]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
    );
  }, [matchDetails, db]);

  return (
    <TouchableOpacity
      style={[
        tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"),
        styles.cardShadow,
      ]}
      onPress={() =>
        props.navigation.navigate("ChatRoom", {
          matchedUserInfo,
          userId,
          props,
          matchDetails,
        })
      }
    >
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo?.image }}
      />
      <View>
        <Text style={tw("text-lg font-semibold")}>
          {matchedUserInfo?.username}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
