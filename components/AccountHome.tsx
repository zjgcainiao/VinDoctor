import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FAB, Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
const AccountHome = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="ios-settings" size={24} color="black" />
      </TouchableOpacity>
      <Card>
        <Card.Title>Guest</Card.Title>
        <Card.Divider />
        <Card.FeaturedSubtitle>No Email</Card.FeaturedSubtitle>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButton: {
    backgroundColor: "#fdba74", // #fdba74 is orange300. #c2410c is orange700.
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    top: 10, // Changed from bottom to top
    left: 10, // Changed from right to left
    borderRadius: 30,
    elevation: 8,
  },
});
export default AccountHome;
