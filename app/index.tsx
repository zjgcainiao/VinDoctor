import { Redirect } from "expo-router";
import React from "react";
import { GluestackUIProvider, Button, ButtonText } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SpeedDial } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";

export default function Index() {
  const [open, setOpen] = React.useState(false);
  // return <Redirect href="/home" />;
  // config={config}
  return (
    <GluestackUIProvider config={config}>
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
    </GluestackUIProvider>
  );
}
