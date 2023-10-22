import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


import React from "react";

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "index",
          title: "Online Vin Doctor",
        }}
      />
      <Drawer.Screen
        name="user/[id]" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "User",
          title: "overview",
        }}
      />
    </Drawer>
  );

};

export default Layout;
