import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, Input } from "react-native-elements";
import styles from "./LoginPageStyles";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleRegister, setToggleRegister] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(
      props.getAuth,
      email,
      password,
      confirmPassword
    );
  };

  const login = () => {
    signInWithEmailAndPassword(props.getAuth, email, password);
  };

  useEffect(() => {}, []);

  return (
    <View>
      <View>
        <View>
          <Text>Register</Text>
          <Text>Email</Text>
          <Input
            placeholder="Email/Username"
            leftIcon={
              <Icon
                name="envelope"
                type="font-awesome"
                size={24}
                color="#444"
              />
            }
          />
        </View>
        <View>
          <Text>Password</Text>
          <Input
            placeholder="Password"
            leftIcon={
              <Icon name="lock" type="font-awesome" size={24} color="#444" />
            }
          />
        </View>
        <Button onPress={() => register(email, password)}>
          <Text>Register</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginPage;
