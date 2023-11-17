import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { SafeAreaView } from "react-native";


// Import your screen components

import Index from './index';
import AccountScreen from './AccountScreen';
import RegisterScreen from './RegisterScreen';
import SignInScreen from './SignInScreen';

const Layout = () => {
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#e7e5e4',
          },
          headerTintColor: '#c2410c', // orange700
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          flex: 1,
          headerTitleAlign: 'center',

      }}
      >
        {/* <Stack.Screen name="index" />
        <Stack.Screen name="accountScreen" />
        <Stack.Screen name="RegisterScreen" />
        <Stack.Screen name="SignInScreen" />
        <Stack.Screen name="VehicleReport" /> */}
        <Stack.Screen name="index"  />
        <Stack.Screen name="AccountScreen" />
        <Stack.Screen name="RegisterScreen" />
        <Stack.Screen name="SignIn"  />

      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );

};

// const Layout = () => {
//   return (<Stack />);
// };

export default Layout;
