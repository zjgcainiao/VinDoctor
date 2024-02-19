import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { firebase_auth } from "../app/auth/firebaseConfig";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import main_styles from "../styles/MainTheme.styles";
import { SafeAreaView } from "react-native-safe-area-context";
const auth = getAuth();

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
  const formStyles = selectedIndex === 0 ? styles.emailForm : styles.phoneForm;
  const handleEmailSignIn = () => {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    // Firebase auth logic for email sign-in
    Alert.alert("Success", "Sign In successful!");
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
  return (
    <SafeAreaView style={formStyles}>
      {selectedIndex === 0 ? (
        <View style={main_styles.container}>
          <TextInput
            style={main_styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={main_styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Button title="Sign In with Email" onPress={handleEmailSignIn} />
        </View>
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
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex:1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    flex:1,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  emailForm: {
    flex:1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  phoneForm: {
    minHeight: 200,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default renderTabContent;
