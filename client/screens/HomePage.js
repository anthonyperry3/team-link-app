import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";

import { useTailwind } from "tailwind-rn";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const dummyData = [
  {
    username: "Angel",
    location: "Fresno, CA",
    bio: "Semi-Pro Call of Duty League Player looking for 2 more players to join our org.",
    photoUrl:
      "https://media.istockphoto.com/vectors/gamer-esport-mascot-logo-design-vector-id1182383458?k=20&m=1182383458&s=612x612&w=0&h=Bz-KCJM-s292ES7f6PCOHxUK7-Dm34F-O67s9wfF02A=",
    id: 1,
  },
  {
    username: "Matt",
    location: "Sacramento, CA",
    bio: "Semi-Pro Call of Duty League Player looking for 2 more players to join our org.",
    photoUrl:
      "https://thumbs.dreamstime.com/z/gamers-mascot-logo-design-vector-modern-illustration-concept-style-badge-emblem-tshirt-printing-gamer-illustration-165721239.jpg",
    id: 2,
  },

  {
    username: "Colton",
    location: "Dallas, TX",
    bio: "Semi-Pro Call of Duty League Player looking for 2 more players to join our org.",
    photoUrl:
      "https://img.freepik.com/premium-vector/dark-gamer-cloak-mascot-esport-logo-design_139366-592.jpg?w=2000",
    id: 3,
  },
];

const Home = () => {
  const tw = useTailwind();

  const cardSwipeRef = useRef(null);

  return (
    <SafeAreaView style={tw("flex-1")}>
      <View style={tw("flex-row items-center justify-center px-5 mt-5")}>
        <TouchableOpacity>
          <Text>LOGO</Text>
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={cardSwipeRef}
          containerStyle={{ backgroundColor: " transparent" }}
          cards={dummyData}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedLeft={() => {
            console.log("Swipe PASSED");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
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
              key={card.id}
              style={tw("relative bg-white h-3/4 rounded-xl")}
            >
              <Image
                style={tw("absolute top-0 h-full w-full rounded-xl")}
                source={{ uri: card.photoUrl }}
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
                  <Text style={tw("text-xl font-bold")}>{card.username}</Text>
                  <Text style={tw("text-xl font-bold")}>{card.location}</Text>
                </View>
                <Text style={tw("px-5")}>{card.bio}</Text>
              </View>
            </View>
          )}
        />
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
