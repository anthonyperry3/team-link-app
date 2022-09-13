import { View, Text, TouchableOpacity, Button } from "react-native";
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
    createUserWithEmailAndPassword(props.userAuth, email, password);
  };

  const login = () => {
    signInWithEmailAndPassword(props.userAuth, email, password);
  };

  useEffect(() => {
    if (props.userId !== "") {
      props.navigation.navigate("Home");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [props.userId]);

  return (
    <View>
      <View>
        <View>
          <Text>Register</Text>
          <Text>Email</Text>
          <Input
            placeholder="Email/Username"
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
            leftIcon={
              <Icon name="lock" type="font-awesome" size={24} color="#444" />
            }
          />
        </View>
        <TouchableOpacity onPress={register}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
