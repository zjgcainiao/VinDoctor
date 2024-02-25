import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text,Pressable } from "react-native";
import main_styles from '../styles/MainTheme.styles';
import {firebaseSignUp} from "../app/auth/firebaseUserStore";
import {firebaseUserStore} from "../app/auth/firebaseUserStore";
const EmailRegister:React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, user } = firebaseUserStore.useState();


  // Basic validation (can be enhanced as needed)
  const isInputValid = () => {
    return email.includes("@") && password.length >= 6;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput  
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        onPress={firebaseSignUp}
        disabled={!isInputValid()}
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'lightgray' : '#800000', // Dark Maroon
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        })}
        >
        <Text style={{ color: 'white' }}>Register</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex:1  ,
    width: "100%", // Make the container take the full width of the screen  
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    justifyContent: 'upper',
    alignItems: 'center',
  },
  input: {
    width: '100%', // Make input fiel  ds take the full width of the container
    // Remove maxWidth or adjust it appropriately
    padding: 10,
    alignItems: 'center',
    // flexDirection: '',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin:10,
  },
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute', // Positioning is correct for placing at the top-left corner
    top: 10,
    left: 10,
  },
});


export default EmailRegister;
