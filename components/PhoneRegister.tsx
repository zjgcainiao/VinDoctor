// PhoneRegister.tsx
import React from "react";
import { View, Text } from "react-native";
import { RecaptchaVerifier } from "firebase/auth";


// for firebase auth, there is no registration for Phone number. SignInwithPhoneNumber
const PhoneRegister: React.FC = () => {
  return (
    <View>
      <Text>Phone Registration</Text>
    </View>
  );
};

export default PhoneRegister;
