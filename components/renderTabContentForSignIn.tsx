import React, { useState,useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import main_styles from "../styles/MainTheme.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebaseUserStore } from "../app/auth/firebaseUserStore";
import { firebaseSignIn,firebaseSignOut,firebaseSignUp,firebaseUnsubscribed,firebasePhoneSignIn } from "../app/auth/firebaseUserStore";
import { useRouter,useNavigation } from "expo-router";  
import { isValidUSPhoneNumber } from '../utils/isValidUSPhoneNumber';


const renderTabContentForSignIn = (selectedIndex: number) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [confirmationResult, setConfirmationResult] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");

  const { isLoggedIn, user } = firebaseUserStore.useState();
  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const formStyles = selectedIndex === 0 ? styles.emailForm : styles.phoneForm;
  // return the formatted phone number in E.164 format when it's valid, or null (or some other indicative value) when it's not.
  const isValidPhone = (phone: string) => {
    // Remove non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Check if it's a 10-digit number
    if (!/^\d{10}$/.test(digits)) {
      return null; // Indicate invalid phone
    }

    // Convert to E.164 format
    const e164 = `+1${digits}`;

    // Return formatted number if it's valid E.164 format
    const re = /^\+[1-9]\d{1,14}$/;
    if (re.test(e164)) {
      return e164; // Return the formatted phone number
    }

    return null; // Indicate invalid phone
  };

  const handleEmailSignIn = () => {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      // Ensure firebaseSignIn is an async function and await its result
      firebaseSignIn(email, password);
      Alert.alert("Success", "Sign In successful!");

      // firebaseSignIn(email, password);
      router.replace("/accounts/AccountScreen");  
      } catch (error) {
        console.log("signIn error", error);
        return { user: null, error: error };
      }

  };


  const handlePhoneSignIn = async () => {
    const formattedPhoneNumber = isValidPhone(phoneNumber);
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
      console.log("Sign-in verification sent, navigating to confirmation screen...");
      if (confirmation ) {
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
        await confirm.confirm(code);
        console.log("Phone number verified and user signed in");
        // No need to manually navigate or update auth state - onAuthStateChanged will handle it
      }
    } catch (error) {
      console.error("Verification code confirmation error:", error);
      Alert.alert("Error", "Invalid code.");
    }
  };

  return (
    <View style={styles.formStyles}>
      {selectedIndex === 0 ? (    
        <>
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
          <Button title="Sign In with Email" onPress={handleEmailSignIn} />
          
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          <Button title="Sign In with Phone" onPress={handlePhoneSignIn} />
           {confirm && (
            <>
              <TextInput
                value={code}
                onChangeText={text=>setCode(text)}
                // Additional TextInput props...
              />
              <Button title="Confirm Code" onPress={confirmCode} />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex:1,
    display: "block",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '100%', // Full width input field
    height: 50, // Adjust this value to control the height of the input field
    paddingVertical: 5, // Adjust padding inside the input vertically
    fontSize: 16, // Adjust font size as needed
  },
  emailForm: {
    flex:2,
    width: "90%",
    padding: 10,  
    //border color to black 
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  phoneForm: {
    minHeight: 20,

    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default renderTabContentForSignIn;
