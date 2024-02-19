import React, { useEffect } from "react";
import { useStoreRootState } from "expo-router/src/global-state/router-store";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { Pressable } from "react-native";

import {
  useRootNavigationState,
  useRouter,
  useSegments,
  Link,
  Tabs,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import main_styles from "../styles/MainTheme.styles";
import { ScrollView } from "react-native-gesture-handler";
import { firebase_auth } from "./auth/firebaseConfig";
import { Stack } from "expo-router/stack";
import { useNavigation } from "@react-navigation/native";
import LogoTitle from "../components/LogoTitle";
import { LinearGradient } from "expo-linear-gradient";
import { firebaseUserStore } from "./auth/firebaseUserStore";
import { useStoreState } from "pullstate";
import { onAuthStateChanged,getAuth } from "firebase/auth";

const IndexPage: React.FC = () => {
  const router = useRouter();
  //let store = useStoreState(firebaseUserStore);
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isLoggedIn, isInitialized } = firebaseUserStore.useState();

  // // Inside your component
  const navigation = useNavigation();
  useEffect(() => {
    if (!navigationState?.key || !isInitialized) return;
    if (!isLoggedIn) {
      //redirect to the login page
      router.replace("SignInScreen");
    } else {
      router.replace("AccountScreen");
    }
  }, [segments,navigationState?.key, isInitialized]);



  return (
    <LinearGradient
      colors={["#97989a", "#d1d3d5", "#555d61"]} //"#97989a" - color of the top, "#d1d3d5" - color of the bottom
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={main_styles.container}
    >
      <SafeAreaView style={main_styles.container}>
        <LogoTitle />

        {!isLoggedIn && (
          <View>
            <TouchableOpacity style={main_styles.button}>
              <Link style={main_styles.buttonText} href="/RegisterScreen">
                Register
              </Link>
            </TouchableOpacity>

            <TouchableOpacity
              // style={[main_styles.button, { backgroundColor: "#ee2244" }]}
              style={[main_styles.button]}
            >
              <Link style={main_styles.buttonText} href="/SignInScreen">
                Sign In
              </Link>
            </TouchableOpacity>

            <TouchableOpacity
              style={main_styles.mutedButton}
              onPress={() => {
                /* handle try out */
              }}
            >
              <Link style={main_styles.mutedButtonText} href="/AccountScreen">
                try out first
              </Link>
              {/* <Text style={main_styles.mutedButtonText}>try out first</Text> */}
            </TouchableOpacity>
          </View>
        )}
        {isLoggedIn && (
          <Text>Welcome back!</Text> // Or other content for logged-in users
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default IndexPage;
