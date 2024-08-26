// PhoneRegister.tsx
import React,{useState, useEffect} from "react";
import { View, Text, TextInput, Button, Alert,StyleSheet, Pressable } from "react-native";
// import { RecaptchaVerifier } from "firebase/auth";
import main_styles from '../styles/MainTheme.styles';
import { isValidUSPhoneNumber } from '../utils/isValidUSPhoneNumber'; // Relative import path
import auth from "@react-native-firebase/auth";
import {firebaseUserStore,firebaseUnsubscribed} from "../app/auth/firebaseUserStore";
import { useRouter } from 'expo-router';
// for firebase auth, there is no registration for Phone number. SignInwithPhoneNumber
const PhoneRegister: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [confirmationResult, setConfirmationResult] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const { isLoggedIn, user } = firebaseUserStore.useState();
  const router = useRouter();
  // auto navigate to AccountScreen when user is logged in. isLoggedIn is true when code is confirmed via confirmCode()
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/accounts/AccountScreen'); // Navigate when the user logs in
    }
  }, [isLoggedIn, router]);

  const handlePhoneSignIn = async () => {
    const formattedPhoneNumber = isValidUSPhoneNumber(phoneNumber);
    console.log('Formatted Phone number used to send SMS for sign-in verification:', formattedPhoneNumber);
    if (!formattedPhoneNumber) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid phone number in E.164 format (+1234567890). Default country code is +1 (US)."
      );
      return;
    }
    console.log('Phone number used to send SMS for sign-in verification:', formattedPhoneNumber);
    
    try {
      // Ensure firebasePhoneSignIn is an async function and await its result
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      // const confirmation = await auth().verifyPhoneNumber(formattedPhoneNumber);
      console.log("Sign-in verification sent, navigating to confirmation screen...");
      if (confirmation) {
        setConfirm(confirmation);
      } else {
        // Handle error or invalid confirmation result...
        Alert.alert("Error", "Could not get confirmation result.");

      }
    } catch (error) {
      Alert.alert("Sign In Error", error.message);
    }
  };

  const confirmCode = async () => {
    try {
      // Ensure `confirm` holds the confirmationResult from handlePhoneSignIn
      if (confirm) {
        const userCredential = await confirm.confirm(code);
        console.log("Phone number verified and user signed in");
        Alert.alert("Success", "Phone number verified and user signed in");
        const user = userCredential.user;
        if (user) {
          console.log("Phone number verified and user signed in:", user);
          // Update the user store with the new user
          firebaseUserStore.update((store) => {
            store.isLoggedIn = true;
            store.user = user;
            store.uid = user.uid;
            store.token = user.getIdToken();
          });
        // router.push('/accounts/AccountScreen');
        // use useEffect() to navigate to the AccountScreen automatically when isLoggedIn is true
        // No need to manually navigate or update auth state - onAuthStateChanged will handle it
        }
      }
    } catch (error) {
      console.error("Verification code confirmation error:", error);
      Alert.alert("Error", "Invalid code.");
    }
  };
  // Validate input for phone number
  const isInputValid = (): boolean => {
    // 1. Basic presence check
    if (!phoneNumber) {
      return false;
    }

    // 2. Robust validation (using a utility function or regex)
    const isValid = isValidUSPhoneNumber(phoneNumber); // Assuming you have this function
    if (!isValid) {
      return false;
    }

    // 3. Any other criteria you might have

    return true; 
  };
  // Handle confirm code button press
  // async function confirmCode() {
  //   try {
  //     const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
  //     let userData = await auth().currentUser.linkWithCredential(credential);
  //     setUser(userData.user);
  //   } catch (error) {
  //     if (error.code == 'auth/invalid-verification-code') {
  //       console.log('Invalid code.');
  //     } else {
  //       console.log('Account linking error');
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text>Login via SMS </Text>
      <TextInput
            style={main_styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        <Pressable
          onPress={handlePhoneSignIn}
          disabled={!isInputValid()}
          style={({ pressed }) => ({
            backgroundColor: pressed ? 'lightgray' : '#800000', // Dark Maroon
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
        <Text style={{ color: 'white' }}>Sign In with Phone</Text>
      </Pressable>
      
      {confirm && (
      <>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={text=>setCode(text)}
          // Additional TextInput props...
        />
        <Button title="Confirm Code" onPress={confirmCode} />
      </>
      )}
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

export default PhoneRegister;
