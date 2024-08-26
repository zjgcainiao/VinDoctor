import React, { useState,useRef,useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
    Animated,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons"; // For the back button
import { useNavigation } from "expo-router";
import EmailRegister from "../components/EmailRegister";
import PhoneRegister from "../components/PhoneRegister";
import main_styles from "../styles/MainTheme.styles";
// import { ScrollView } from 'react-native-gesture-handler';
import LogoTitle from '../components/LogoTitle';
import {firebaseUserStore} from "../app/auth/firebaseUserStore";

const RegisterScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(Number(0));
  const navigation = useNavigation();
  const logoAnim = useRef(new Animated.Value(2.5)).current; // Initial scale of logo
  const formOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of form
  const { isLoggedIn, user } = firebaseUserStore.useState();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
    
      <View style={main_styles.container}>
      <Animated.View style={[main_styles.logo, { transform: [{ scale: logoAnim }] }]}>
        <LogoTitle />
      </Animated.View>
        <TouchableOpacity
              style={ main_styles.backButton }
              onPress={() => navigation.goBack()}
            >
          <Ionicons name="arrow-back" size = { 24} />
        </TouchableOpacity>
        
          <SegmentedControlTab 
          values={ ["Email", "Phone"]}
          selectedIndex={ selectedIndex }
          onTabPress={ setSelectedIndex }
          tabsContainerStyle={{ borderColor: 'black' }}
          tabStyle={{ borderColor: 'black', backgroundColor: 'white' }}
          activeTabStyle={{ backgroundColor: 'black' }}
          tabTextStyle={{ color: 'black' }}
          activeTabTextStyle={{ color: 'white' }}
          />
        
        { renderTabContent(selectedIndex) }
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
        marginTop: 50,
  },
  backButton: {
    alignSelf: 'flex-start', // Align the back button to the left
    marginBottom: 20, // Add some space below the back button
  },

  tabContainer: {
    alignItems:'stretch',
    backgroundColor: 'transparent', // For the SegmentedControlTab to inherit the LinearGradient
    marginBottom: 20, // Adjust the space between the tabs and the content below
    color: 'black', // Change the color to black
  },
});

export default RegisterScreen ;
