import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-rn";

const SenderMessage = ({ message }) => {
  return (
    <View>
      <Text>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
