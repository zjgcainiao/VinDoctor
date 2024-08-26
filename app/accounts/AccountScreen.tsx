import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AccountHome from "../../components/AccountHome";
import { AuthContextProvider } from '../auth/authContext';
import { Link, useRouter, router } from 'expo-router';
import { Text, View } from 'react-native';
import main_styles from "../../styles/MainTheme.styles";
import { firebaseUnsubscribed,firebaseUserStore } from "../auth/firebaseUserStore";
const AccountScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { isLoggedIn, user} = firebaseUserStore.useState();
  // const shouldRedirect = true; // Set to true to redirect, or false otherwise
  const shouldRedirect = !user; // Redirect if user is not logged in
  //   useEffect(() => {
  //     if (shouldRedirect) {
  //       // Navigate to the AccountHome screen
  //       navigation.navigate(AccountHome);
  //     }
  //   }, [shouldRedirect, navigation]);
  useEffect(() => {
    // This effect runs when the component mounts. Here, you could perform actions based on the current auth state.
    console.log("Visiting Account Screen. Is logged in?:", isLoggedIn, "...User info:", user);
    const unsubscribe = firebaseUnsubscribed; // Call the subscription function
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (shouldRedirect) {
      // Navigate to the app homepage
      navigation.navigate('index'); // Navigate to the homepage
    }

  }, [shouldRedirect, navigation]);
  //   return <SafeAreaView>{!shouldRedirect && <AccountHome />}</SafeAreaView>;
  return (
    
   
  //  <AuthContextProvider>
  //   </AuthContextProvider>
        <AccountHome />

  );
};

export default AccountScreen;
