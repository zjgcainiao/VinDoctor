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
import { onAuthStateChanged } from "firebase/auth";

const IndexPage: React.FC = () => {
  // const [open, setOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // // return <Redirect href="/home" />;
  // // config={config}

  // // Inside your component
  // const navigation = useNavigation();
  // useEffect(() => {
  //   const auth = firebase_auth;
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //       // Optionally redirect to the home page
  //       // navigation.navigate('Home');
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   });
  //   return () => unsubscribe(); // This ensures the listener is unsubscribed when the component unmounts
  // }, []);

  const router = useRouter();
  //let store = useStoreState(firebaseUserStore);
  // const isLoggedIn = store.isLoggedIn;
  // const isInitiated = store.isInitiated;
  const { isLoggedIn, isInitialized } = firebaseUserStore.useState();
  // let isLoggedIn = false;
  return (
    <LinearGradient
      colors={["#97989a", "#d1d3d5", "#555d61"]}
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
