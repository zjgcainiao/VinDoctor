import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
} from "react-native";

import main_styles from "../styles/MainTheme.styles";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

const Home = () => (
  <SafeAreaView style={main_styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Welcome to Vin Doctor</Text>
      <Text style={styles.description}>
        Discover how our platform works and how it can help you.
      </Text>

      <Button
        title="Sign Up"
        onPress={() => {
          /* Sign Up Logic */
        }}
      />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Home;
