import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";

// Define a type for individual messages
type Message = {
  id: string;
  type: "option";
  text: string;
};

function Chatbot() {
  const [conversation, setConversation] = useState<Message[]>([]);

  const handleOptionPress = async (option: string) => {
    // Adding a new option to the conversation
    const newMessage: Message = {
      id: `${conversation.length}`,
      type: "option",
      text: option,
    };
    setConversation([...conversation, newMessage]);

    // Placeholder for backend communication
    // const response = await sendOptionToBackend(option);
    // setConversation([...conversation, response]);
  };

  // Rendering individual message
  const renderMessage = ({ item }: { item: Message }) => (
    <Text>{item.text}</Text>
  );

  return (
    <View>
      <FlatList
        data={conversation}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
      />
      <Button title="Guest" onPress={() => handleOptionPress("Guest")} />
      <Button title="Host" onPress={() => handleOptionPress("Host")} />
    </View>
  );
}

export default Chatbot;
