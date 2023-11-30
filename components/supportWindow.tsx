import React, { useState, useEffect } from "react";
import { View, TextInput, Button, ScrollView, Text } from "react-native";

const SupportWindow = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  // Add this inside the ChatWindow component

  useEffect(() => {
    // Replace with your WebSocket URL
    const ws = new WebSocket("wss://automanrepair.azurewebsites.net/ws/chat/");

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (e) => {
      // When you receive a message, add it to the messages array
      const message = e.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onerror = (e) => {
      // Handle errors
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  // Function to handle sending messages
  const sendMessage = () => {
    if (message.trim()) {
      // Logic to send message will be added here
      setMessage(""); // Clear input field after sending
    }
  };

  // Function to render each message
  const renderMessages = () => {
    return messages.map((msg, index) => <Text key={index}>{msg}</Text>);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>{renderMessages()}</ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            marginRight: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default SupportWindow;
