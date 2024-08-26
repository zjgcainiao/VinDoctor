import React from "react";
import { Image } from "react-native";

const LogoTitle: React.FC   = () => {
  return (
    <Image
      style={{ width: 150, height: 150 }}
      source={require("../assets/icon.png")}
    />
  );
};

export default LogoTitle;
