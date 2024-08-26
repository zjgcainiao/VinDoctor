import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Text,Pressable } from "react-native";
import main_styles from '../styles/MainTheme.styles';
import {firebaseUserStore, storeInterface,firebaseSignUp} from "../app/auth/firebaseUserStore";
import { useRouter } from 'expo-router';
// import router from '../../smart_home_hub/frontend/smart_home_hub_vue/src/router/index';
import auth from "@react-native-firebase/auth";
import { isInputValid } from "../utils/validationUtils";

export const EmailRegister:React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, user } = firebaseUserStore.useState();
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/accounts/AccountScreen'); // Navigate when the user logs in
    }
  },[isLoggedIn, router]);



  //It checks if the email is valid and the password is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number.
  const isInputValid = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  
    return emailRegex.test(email) && passwordRegex.test(password);
  };

  const handleEmailSignup = async () => {
      try {
            // verify the input is correct
            if (!isInputValid()) {
              setMessage("Please fill out all fields correctly.");
              return;
            }
            // this will trigger onAuthStateChange to update the store.
            auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                setMessage("Sign-up successful! Please check your email for a verification link.");
                console.log('Sign-up successful');
                const user = auth().currentUser;
                const token = user ? user.getIdToken() : null;
                const uid = user ? user.uid : null;
                console.log("signIn firebase User:", user,'token:', token);

                console.log("signUp new user ", user);
                firebaseUserStore.update((store: storeInterface) => {
                    store.isInitialized = user !== null;
                    store.isLoggedIn = true;
                    store.user = user;
                    store.token = token;
                    store.uid = uid;
                });
            })
            .catch(error=>{
              setMessage("Sign-up failed. Please try again.");
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                } else {
                    console.log('Error:', error.message);
                }
            });
            return { user: auth().currentUser, error: null };
        } catch (error) {
            console.log("signUp error", error);
            return { user: null, error: error }
        }
      };
  return (
    <View style={styles.container}>
    {message && <p>{message}</p>}
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
        onPress={handleEmailSignup}
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
    justifyContent: 'flex-start',
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
