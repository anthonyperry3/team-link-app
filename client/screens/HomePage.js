import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { tailwind, useTailwind } from "tailwind-rn";
import Swiper from "react-native-deck-swiper";

const dummyData = [
  {
    username: "Angel",
    location: "Fresno, CA",
    bio: "Semi-Pro Call of Duty League Player looking for 2 more players to join our org.",
    photoUrl:
      "https://media.istockphoto.com/vectors/gamer-esport-mascot-logo-design-vector-id1182383458?k=20&m=1182383458&s=612x612&w=0&h=Bz-KCJM-s292ES7f6PCOHxUK7-Dm34F-O67s9wfF02A=",
  },
  {
    username: "Matt",
    location: "Sacramento, CA",
    bio: "Semi-Pro Call of Duty League Player looking for 2 more players to join our org.",
    photoUrl:
      "https://thumbs.dreamstime.com/z/gamers-mascot-logo-design-vector-modern-illustration-concept-style-badge-emblem-tshirt-printing-gamer-illustration-165721239.jpg",
  },
  {
    username: "Colton",
    location: "Dallas, TX",
    bio: "Semi-Pro Call of Duty League Player looking for 2 more players to join our org.",
    photoUrl:
      "https://img.freepik.com/premium-vector/dark-gamer-cloak-mascot-esport-logo-design_139366-592.jpg?w=2000",
  },
];

const Home = () => {
  const tw = useTailwind();

  return (
    <SafeAreaView style={tw("flex-1")}>
      <View style={tw("flex-row items-center justify-center px-5 mt-5")}>
        <TouchableOpacity>
          <Text>LOGO</Text>
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          containerStyle={{ backgroundColor: " transparent" }}
          cards={dummyData}
          renderCard={(card) => (
            <View style={tw("bg-white h-3/4 rounded-xl")}>
              <Text>{card.username}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
