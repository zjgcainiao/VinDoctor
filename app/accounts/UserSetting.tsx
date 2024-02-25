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

import main_styles from "../../styles/MainTheme.styles";

const Accounts: React.FC = () => (
  <SafeAreaView style={main_styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={main_styles.heading}>Welcome to Vin Doctor</Text>
      <Text style={main_styles.description}>
        Discover how our platform works and how it can help you.
      </Text>

      <Button
        title="Sign Up"
        onPress={() => {
            /* Sign Up Logic */
            1+1 ;
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

export default Accounts;
