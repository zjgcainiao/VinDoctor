import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import renderTabContent from "../components/renderTabCotentForSignIn";
import { firebase_auth, firebase_app } from "./auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LogoTitle from "../components/LogoTitle";
import main_styles from "../styles/MainTheme.styles";
const SignInScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const logoAnim = useRef(new Animated.Value(2.5)).current; // Initial scale of logo
  const formOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of form

  useEffect(() => {
    // Animate logo to scale down and move up
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1, // Scale down to its normal size
        duration: 1500,
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
  const content = renderTabContent(selectedIndex);

  return (
    <SafeAreaView style={main_styles.container}>
      <Animated.View style={[{ transform: [{ scale: logoAnim }], flex: 1 }]}>
        <LogoTitle />
      </Animated.View>

      <Animated.View
        style={[main_styles.tabContent, { opacity: formOpacity, flex: 1 }]}
      >
        <SegmentedControlTab
          values={["Email", "Phone"]}
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
        />
        {renderTabContent(selectedIndex)}
      </Animated.View>
    </SafeAreaView>
  );
};

export default SignInScreen;
