import React from "react";
import { Image } from "react-native";

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 150, height: 90 }}
      source={require("../assets/icon.png")}
    />
  );
};

export default LogoTitle;
