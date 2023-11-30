// PhoneRegister.tsx
import React from "react";
import { View, Text } from "react-native";
// import { RecaptchaVerifier } from "firebase/auth";
import { firebase_auth } from "../app/auth/firebaseConfig";

const auth = firebase_auth;
auth.languageCode = "it"; // /id

// for firebase auth, there is no registration for Phone number. SignInwithPhoneNumber
const PhoneRegister = () => {
  return (
    <View>
      {/* Your phone registration form here */}
      <Text>Phone Registration</Text>
    </View>
  );
};

export default PhoneRegister;
