import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
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
import { useTailwind } from "tailwind-rn";

import { Ionicons } from "@expo/vector-icons";

const ChatRoom = ({ route }) => {
  const { matchedUserInfo, userId, matchDetails, props } = route.params;
  const [userData, setUserData] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const db = getFirestore(app);

  const tw = useTailwind();

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
    if (input !== "") {
      addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        timestamp: serverTimestamp(),
        userId: userId,
        username: userData.username,
        imageURL: userData.image,
        message: input,
      });
    } else {
      return;
    }

    setInput("");
  };

  return matchedUserInfo ? (
    <SafeAreaView style={tw("bg-white flex-1")}>
      <View style={tw("flex flex-row items-center")}>
        <View style={tw("flex flex-row items-center justify-between")}>
          <TouchableOpacity>
            <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
          </TouchableOpacity>
          <Text style={tw("text-2xl font-bold pl-2")}>
            {matchedUserInfo?.username}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={tw("flex-1")}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback>
          <FlatList
            style={tw("pl-4")}
            data={messages}
            inverted={-1}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === userId ? (
                <SenderMessage key={message.id} message={message} tw={tw} />
              ) : (
                <ReceiverMessage key={message.id} message={message} tw={tw} />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View
          style={tw(
            "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  ) : (
    <View>
      <Text>Go to chatroom to pick a room</Text>
    </View>
  );
};

export default ChatRoom;
