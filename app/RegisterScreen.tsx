import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons"; // For the back button
import { useNavigation } from "expo-router";
import EmailRegister from "../components/EmailRegister";
import PhoneRegister from "../components/PhoneRegister";
import main_styles from "../styles/MainTheme.styles";
// import { ScrollView } from 'react-native-gesture-handler';
import LogoTitle from '../components/LogoTitle';


const RegisterScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(Number(0));
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
    
      <View style={ main_styles.container }>
        <LogoTitle />
        <TouchableOpacity
              style={ main_styles.backButton }
              onPress={() => navigation.goBack()}
            >
          <Ionicons name="arrow-back" size = { 24} />
        </TouchableOpacity>
        
          <SegmentedControlTab 
          style={styles.tabContainer}
          values={ ["Email", "Phone"]}
          selectedIndex={ selectedIndex }
          onTabPress={ setSelectedIndex }
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
    alignitems:'stretch',
    backgroundColor: 'transparent', // For the SegmentedControlTab to inherit the LinearGradient
    marginBottom: 20, // Adjust the space between the tabs and the content below
    color: 'black', // Change the color to black
  },
});

export default RegisterScreen ;
