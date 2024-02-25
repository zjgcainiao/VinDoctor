// PhoneRegister.tsx
import React,{useState, useEffect} from "react";
import { View, Text, styles } from "react-native";
import { RecaptchaVerifier } from "firebase/auth";


// for firebase auth, there is no registration for Phone number. SignInwithPhoneNumber
const PhoneRegister: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [confirmationResult, setConfirmationResult] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  
  return (
    <View style={main_styles.container}>
      <Text>Phone Login </Text>
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
          onChangeText={setCode}
          // Additional TextInput props...
        />
        <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

export default PhoneRegister;
