import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import SegmentedControlTab from "react-native-segmented-control-tab";
import renderTabContentForSignIn from '../components/renderTabContentForSignIn';

import { onAuthStateChanged } from "firebase/auth";
import { firebaseUserStore } from "../app/auth/firebaseUserStore";
import LogoTitle from "../components/LogoTitle";
import main_styles from "../styles/MainTheme.styles";

const SignInScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(Number<0>);
  const logoAnim = useRef(new Animated.Value(2.5)).current; // Initial scale of logo
  const formOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of form
  const { isLoggedIn, user } = firebaseUserStore.useState();

  useEffect(() => {
    // Animate logo to scale down and move up
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1, // Scale down to its normal size
        duration: 300,  
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1, // Gradually show the form
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  // Use the renderTabContent function from components/renderTabContentForSignIn.tsx
  // const content = renderTabContentForSignIn(selectedIndex);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logo, { transform: [{ scale: logoAnim }] }]}>
        <LogoTitle />
      </Animated.View>

      <Animated.View
        style={[styles.form, { opacity: formOpacity }]}>
        <SegmentedControlTab
          values={["Email", "Phone"]}
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
        />
        {renderTabContentForSignIn(selectedIndex)}
      </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adjust padding as needed
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 200, // Adjust the size of the logo area
  },
  form: {
    flex: 1, // Allocate more space for the form
    flexDirection: 'column',
    width: '100%', // Ensure the form takes full width
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '100%', // Full width input field
    height: 10, // Adjust this value to control the height of the input field
    paddingVertical: 5, // Adjust padding inside the input vertically
    fontSize: 16, // Adjust font size as needed
  },
});

export default SignInScreen;
