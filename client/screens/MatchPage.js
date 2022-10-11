import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import React from "react";

const MatchPage = () => {
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View>
      <Text>MatchPage</Text>
      <Text>
        {loggedInProfile.username} and {userSwiped.username} have matched. Send
        your first message to link up in game!
      </Text>
    </View>
  );
};

export default MatchPage;
