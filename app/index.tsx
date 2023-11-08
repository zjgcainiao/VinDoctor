import { Link, Redirect } from "expo-router";
import React from "react";
import {
  GluestackUIProvider,
  Button,
  ButtonText,
  Box,
  Text,
  HStack,
  Heading,
  Center,
  VStack,
} from "@gluestack-ui/themed"; //gluestack-ui themed

import { config } from "@gluestack-ui/config"; //
import { SpeedDial } from "@rneui/themed"; // React Native Elements
import { Switch } from "@rneui/themed"; // React Native Elements

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Image, Card } from "@rneui/themed";
import main_styles from "../styles/MainTheme.styles";
import { LinearGradient } from "expo-linear-gradient";
// import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

function LogoTitle() {
  return (
    <Image
      style={main_styles.logoTitle}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Index() {
  const [open, setOpen] = React.useState(false);
  // return <Redirect href="/home" />;
  // config={config}
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
    //gluestack-UI style
    <SafeAreaView style={main_styles.container}>
      <GluestackUIProvider config={config}>
        {/* <LogoTitle /> */}
        <ScrollView>
          <Box bg="$secondary300" p="$2" m="$2">
            <Center>
              <Text color="white">First line</Text>
              <Text color="green">second line</Text>
            </Center>
          </Box>

          <Box>
            <Heading>This is the H-Stack</Heading>
            <HStack space="md" reversed={false}>
              <Box w="$24" h="$24" bg="$blue200">
                <Text color="textDark">24x24</Text>
              </Box>
              <Box
                w="$48"
                h="$48"
                bg="$blue400"
                justifyContent="center"
                alignItems="center"
              >
                <Text size="4xl" color="$white">
                  48x48
                </Text>
              </Box>

              <Box w="$72" h="$72" bg="$blue600">
                <Text size="4xl" color="$white">
                  72x72
                </Text>
              </Box>
            </HStack>
          </Box>
          <Box>
            <Heading>This is the V-Stack</Heading>
            <Center>
              <VStack space="md" reversed={false}>
                <Box
                  w="$72"
                  h="$72"
                  bg="$purple200"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    size="4xl"
                    color="$warmGray800"
                    justifyContent="center"
                    alignItems="center"
                  >
                    72x72
                  </Text>
                </Box>
                <Box w="$80" h="$80" bg="$violet400">
                  <Text size="4xl" color="$warmGray200">
                    80x80
                  </Text>
                </Box>
                <Box w="$96" h="$96" bg="$violet800">
                  <Text size="4xl" color="$warmGray200">
                    96x96
                  </Text>
                </Box>
              </VStack>
            </Center>
          </Box>
        </ScrollView>
        <SpeedDial
          isOpen={open}
          icon={{ name: "edit", color: "#fff" }}
          openIcon={{ name: "close", color: "#fff" }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
        >
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Add"
            onPress={() => console.log("Add Something")}
          />
          <SpeedDial.Action
            icon={{ name: "delete", color: "#fff" }}
            title="Delete"
            onPress={() => console.log("Delete Something")}
          />
        </SpeedDial>
        <StatusBar />
      </GluestackUIProvider>
    </SafeAreaView>
  );
}
