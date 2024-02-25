import React, { useEffect } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
    ScrollView,
  Text,
} from "react-native";
import { Link,useRouter, } from 'expo-router';

import {
  useRootNavigationState,
  useRootNavigation,
  useSegments,
  useNavigation,
} from "expo-router";
import { Tabs } from 'expo-router/tabs';
import { StatusBar } from "expo-status-bar";
import main_styles from '../styles/MainTheme.styles';
// import { ScrollView } from "react-native-gesture-handler";
import { Stack } from "expo-router/stack";

import LogoTitle from "../components/LogoTitle";
import  {LinearGradient } from "expo-linear-gradient";
import { firebaseUserStore } from "./auth/firebaseUserStore";
import { useStoreState } from "pullstate";
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { homepageRichTextContent } from '../../new_76prolubeplus.com/frontend/dashboard_react/src/components/Constants';
import { initializeSearchCounter } from '../components/saveSecureStore';

const IndexPage: React.FC = () => {
  // const router = useRouter();
  //let store = useStoreState(firebaseUserStore);
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isLoggedIn, isInitialized } = firebaseUserStore.useState();
  const trueCondition = true;
  // // Inside your component
  const navigation = useNavigation();

  // the function is set the anonymousSearchCount to be 3. the number is saved in the expo-secure-store.
  initializeSearchCounter();

  return (
    <LinearGradient
        colors={["#97989a", "#d1d3d5", "#555d61"]} //"#97989a" - color of the top, "#d1d3d5" - color of the bottom
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={main_styles.container}
        >
      <SafeAreaView >
        {/* !isLoggedIn */ }
        
          <LogoTitle/>
          <TouchableOpacity
            style={main_styles.button}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={main_styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={main_styles.button}
            onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={main_styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
  
          <Link href="/VehicleReport" style={main_styles.mutedButton}>
            <Text>Try It out</Text>
          </Link>

        {/* isLoggedIn */}
        {/* { false && (
          <Text>Welcome back!</Text> // Or other content for logged-in users
        )} */}
      </SafeAreaView>
     
    </LinearGradient>     
  );
};

export default IndexPage;
