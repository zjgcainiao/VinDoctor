import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import main_styles from "../styles/mainTheme.styles";
import { ScrollView } from "react-native-gesture-handler";
import { onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "../components/firebaseConfig";
import { Stack } from "expo-router/stack";
function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 90 }}
      source={{ uri: "../assets/icon.png" }}
    />
  );
}

import * as Linking from "expo-linking";
// const AppStack = () => {
//   return (
//     <Stack>
//       <Stack.Screen name="Index" component={IndexPage} />
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="TryOut" component={TryOutScreen} />
//     </Stack>
//   );
// };

const IndexPage: React.FC = (navigation) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // return <Redirect href="/home" />;
  // config={config}
  useEffect(() => {
    const auth = firebase_auth;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
        // Optionally redirect to the home page
        // navigation.navigate('Home');
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const auth = firebase_auth;
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setIsLoggedIn(true);
      // Optionally redirect to the home page
      // navigation.navigate('Home');
    } else {
      // User is signed out
      setIsLoggedIn(false);
    }
  });

  return (
    <SafeAreaView style={main_styles.container}>
      <LogoTitle />
      <ScrollView style={styles.buttonContainer}>
        {!isLoggedIn && (
          <>
            <Button
              title="Register"
              onPress={() => {
                Linking.openURL("/RegisterScreen");
              }}
            />
            <Button
              title="Login"
              onPress={() => {
                /* handle login */
                Linking.openURL("/SignInScreen");
              }}
            />
            <TouchableOpacity
              onPress={() => {
                /* handle try out */
              }}
            >
              <Text style={styles.mutedButton}>try out first</Text>
            </TouchableOpacity>
          </>
        )}
        {isLoggedIn && (
          <Text>Welcome back!</Text> // Or other content for logged-in users
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200, // Adjust as needed
    height: 150, // Adjust as needed
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
  },
  mutedButton: {
    color: "#6c757d", // Muted text color
    textAlign: "center",
    marginTop: 15,
  },
});

export default IndexPage;
