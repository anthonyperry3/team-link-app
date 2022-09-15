import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, Input } from "react-native-elements";
import styles from "./LoginPageStyles";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleRegister, setToggleRegister] = useState(true);
  // const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(props.userAuth, email, password);
  };

  const login = () => {
    signInWithEmailAndPassword(props.userAuth, email, password);
  };

  useEffect(() => {
    if (props.userId !== "") {
      console.log(props.userId);
      props.navigation.navigate("ProfilePage");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [props.userId]);

  return (
    <View style={styles.container}>
      {toggleRegister ? (
        <View>
          <Text style={styles.registerHeader}>Create Account</Text>
          <View>
            <Text style={styles.inputTitles}>Enter Email</Text>
            <Input value={email} onChangeText={setEmail} />
          </View>
          <View>
            <Text style={styles.inputTitles}>Create Password</Text>
            <Input value={password} onChangeText={setPassword} />
          </View>
          <TouchableOpacity onPress={register} style={styles.actionButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.toggleText}
              onPress={() => setToggleRegister(!toggleRegister)}
            >
              Already Have An Account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.registerHeader}>Welcome Back!</Text>
          <View>
            <Text style={styles.inputTitles}>Email</Text>
            <Input value={email} onChangeText={setEmail} />
          </View>
          <View>
            <Text style={styles.inputTitles}>Password</Text>
            <Input value={password} onChangeText={setPassword} />
          </View>
          <TouchableOpacity onPress={login} style={styles.actionButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.toggleText}
              onPress={() => setToggleRegister(!toggleRegister)}
            >
              Or Create A New Account
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginPage;
