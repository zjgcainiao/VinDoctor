import React from "react";
import { Button, View, Text } from "react-native";
// import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import { CopilotProvider } from "react-native-copilot";
import RegisterScreen from "../app/RegisterScreen";

const AppWithCopilot = () => {
  return (
    <CopilotProvider>
      <RegisterScreen />
    </CopilotProvider>
  );
};

// Wrap your screen with the copilot HOC
export default AppWithCopilot;
