import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  DocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../Firebase/firebase";
import { Ionicons } from "@expo/vector-icons";

const Home = (props) => {
  const [usersList, setUsersList] = useState([]);
  const isFocused = useIsFocused();

  const tw = useTailwind();

  const db = getFirestore(app);

  const cardSwipeRef = useRef(null);

  const generateMatchId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

  useEffect(() => {
    const fetchUsers = async () => {
      onSnapshot(collection(db, "users"), (snapshot) => {
        setUsersList(
          snapshot.docs
            .filter((doc) => doc.id !== props.userId)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
    };

    fetchUsers();
  }, []);

  const swipeLeft = (cardIndex) => {
    if (!usersList[cardIndex]) return;

    const userSwiped = usersList[cardIndex];

    setDoc(doc(db, "users", props.userId, "passed", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!usersList[cardIndex]) return;

    const userSwiped = usersList[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", props.userId))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", props.userId)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          setDoc(
            doc(db, "users", props.userId, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(
            doc(db, "matches", generateMatchId(props.userId, userSwiped.id)),
            {
              users: {
                [props.userId]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [props.userId, userSwiped.id],
              timestamp: serverTimestamp(),
            }
          );

          props.navigation.navigate("MatchPage", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          setDoc(
            doc(db, "users", props.userId, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-slate-50")}>
      <View style={tw("flex-row items-center justify-center px-5 mt-5")}>
        <TouchableOpacity>
          <Ionicons name="logo-electron" size={55} color="#ff0000" />
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1 -mt-6")}>
        {Object.keys(usersList).length > 0 ? (
          <Swiper
            ref={cardSwipeRef}
            containerStyle={{ backgroundColor: " transparent" }}
            cards={usersList}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            onSwipedLeft={(cardIndex) => {
              console.log("Swipe PASSED");
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe MATCH");
              swipeRight(cardIndex);
            }}
            overlayLabels={{
              left: {
                title: "SKIP",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "MATCH",
                style: {
                  label: {
                    textAlign: "left",
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) => (
              <View
                // key={card.id}
                style={tw("relative bg-white h-3/4 rounded-xl")}
              >
                <Image
                  style={tw("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.image }}
                />
                <View
                  style={[
                    tw(
                      "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw("text-xl font-bold")}>{card.bio}</Text>
                    <Text style={tw("text-xl font-bold")}>{card.username}</Text>
                  </View>
                  <Text style={tw("px-5")}></Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View>
            <Text>Nothing here right now</Text>
          </View>
        )}
      </View>
      <View style={tw("flex flex-row justify-evenly mb-12")}>
        <TouchableOpacity
          onPress={() => cardSwipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={26} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => cardSwipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo name="check" size={26} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1.41,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
