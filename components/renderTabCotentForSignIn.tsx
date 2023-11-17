import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { firebase_auth } from "./firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";

const auth = firebase_auth;

// Helper function to validate email format
const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Helper function to validate phone number format
const isValidPhone = (phone: string) => {
  const re = /^\+[1-9]\d{1,14}$/; // E.164 format
  return re.test(phone);
};

const renderTabContent = (selectedIndex: number) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleEmailSignIn = () => {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    // Firebase auth logic for email sign-in
  };

  const handlePhoneSignIn = () => {
    if (!isValidPhone(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid phone number in E.164 format."
      );
      return;
    }

    // Firebase automatically handles reCAPTCHA verification when necessary
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        // Now, navigate the user to the screen where they can enter the verification code
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert("Error", "SMS not sent. Please try again.");
      });
  };

  if (selectedIndex === 0) {
    return (
      <View style={styles.formContainer}>
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
      </View>
    );
  } else {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <Button title="Sign In with Phone" onPress={handlePhoneSignIn} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  formContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default renderTabContent;
