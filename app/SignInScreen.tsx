import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import renderTabContent from "../components/renderTabCotentForSignIn";
import { auth } from "../components/firebaseConfig";
const SignInScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const logoAnim = useRef(new Animated.Value(1)).current; // Initial scale of logo

  useEffect(() => {
    // Animate logo to scale down and move up
    Animated.timing(logoAnim, {
      toValue: 0.5, // Scale down to half its size
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Use the renderTabContent function from components/renderTabContentForSignIn.tsx
  const content = renderTabContent(selectedIndex);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logo, { transform: [{ scale: logoAnim }] }]}
      >
        {/* Your Logo Here */}
        <Text>Logo</Text>
      </Animated.View>

      <SegmentedControlTab
        values={["Email", "Phone"]}
        selectedIndex={selectedIndex}
        onTabPress={setSelectedIndex}
      />

      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    // Styles for your logo
  },
  tabContent: {
    marginTop: 20,
    // Additional styles for tab content
  },
});

export default SignInScreen;
