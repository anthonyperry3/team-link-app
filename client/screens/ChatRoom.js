import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { addDoc } from "firebase/firestore";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
} from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../Firebase/firebase";

const ChatRoom = ({ route, props }) => {
  const { matchedUserInfo, userId, matchDetails } = route.params;
  const [userData, setUserData] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const db = getFirestore(app);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [matchDetails, db]);

  useEffect(() => {
    const fetchUserInfo = () => {
      onSnapshot(doc(db, `users/${userId}`), (snapshot) => {
        setUserData(snapshot.data());
      });
    };

    fetchUserInfo();
  }, []);

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: userId,
      username: userData.username,
      imageURL: matchedUserInfo.image,
      message: input,
    });

    setInput("");
  };

  return (
    <View>
      <Text>{matchedUserInfo?.username}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              messages.userId === userId ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View>
          <TextInput
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
