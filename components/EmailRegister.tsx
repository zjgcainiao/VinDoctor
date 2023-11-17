import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const EmailRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the registration process
  const handleRegister = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // Handle the successful registration (e.g., navigate to the next screen)
        Alert.alert("Success", "Registration successful!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here, such as displaying an alert
        Alert.alert("Error", errorMessage);
      });
  };

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
      <Button
        title="Register"
        onPress={handleRegister}
        disabled={!isInputValid()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default EmailRegister;
