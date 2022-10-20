import { FlatList, Text, View, SafeAreaView } from "react-native";
import styles from "./MatchPageStyles";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, query, where } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../Firebase/firebase";
import { ListItem } from "react-native-elements";
import MessageRow from "../components/MessageRow";
import { useTailwind } from "tailwind-rn";

const MatchPage = (props) => {
  const [matches, setMatches] = useState([]);

  const db = getFirestore(app);
  const tw = useTailwind();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", props.userId)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [props.userId]);

  return matches.length > 0 ? (
    <SafeAreaView style={tw("px-4 bg-slate-50 h-full w-full")}>
      <Text style={tw("text-2xl font-bold pl-2 my-4")}>Matches</Text>
      <FlatList
        style={tw("h-full")}
        data={matches.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageRow matchDetails={item} userId={props.userId} props={props} />
        )}
      />
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <Text>No matches at the moment.. Keep searching!</Text>
    </View>
  );
};
export default MatchPage;
