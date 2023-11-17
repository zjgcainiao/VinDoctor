import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons"; // For the back button
import { Stack, useNavigation } from "expo-router";
import EmailRegister from "../components/EmailRegister";
import PhoneRegister from "../components/PhoneRegister";

const RegisterScreen = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleIndexChange = (index: React.SetStateAction<number>) => {
    setSelectedIndex(index);
  };

  const renderTabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <EmailRegister />;
      case 1:
        return <PhoneRegister />;
      default:
        return <EmailRegister />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>

      <SegmentedControlTab
        values={["Email", "Phone"]}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexChange}
      />

      <View style={styles.tabContent}>{renderTabContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  tabContent: {
    marginTop: 20,
    // Additional styles for tab content
  },
});

export default RegisterScreen;
