import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-rn";

const ReceiverMessage = ({ message }) => {
  return (
    <View>
      <Text>
        {message.username} : {message.message}
      </Text>
    </View>
  );
};

export default ReceiverMessage;
