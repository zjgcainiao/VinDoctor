import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, TextInput, Button, Text } from "react-native";

const SecureStoreComponent = () => {
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [retrievedValue, setRetrievedValue] = useState("");

  const storeSecureItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const retrieveSecureItem = async (key) => {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      setRetrievedValue(result);
    } else {
      alert("No values stored under that key.");
    }
  };
  // }
  return (
    <View>
      <TextInput
        placeholder="Key"
        value={inputKey}
        onChangeText={setInputKey}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 10 }}
      />
      <TextInput
        placeholder="Value"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 10 }}
      />
      <Button
        title="Store Value"
        onPress={() => storeSecureItem(inputKey, inputValue)}
      />
      <Button
        title="Retrieve Value"
        onPress={() => retrieveSecureItem(inputKey)}
      />
      {retrievedValue ? (
        <Text style={{ margin: 10 }}>Retrieved Value: {retrievedValue}</Text>
      ) : null}
    </View>
  );
};

export default SecureStoreComponent;
