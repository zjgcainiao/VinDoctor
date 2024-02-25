import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AccountHome from "../../components/AccountHome";
import { AuthContextProvider } from '../auth/authContext';
const AccountScreen = () => {
  const navigation = useNavigation();
  const shouldRedirect = true; // Set to true to redirect, or false otherwise

  //   useEffect(() => {
  //     if (shouldRedirect) {
  //       // Navigate to the AccountHome screen
  //       navigation.navigate(AccountHome);
  //     }
  //   }, [shouldRedirect, navigation]);

  //   return <SafeAreaView>{!shouldRedirect && <AccountHome />}</SafeAreaView>;
  return (
    
   
  //  <AuthContextProvider>
  //   </AuthContextProvider>
        <AccountHome />
 
    
  );
};

export default AccountScreen;
