wimport React, { useState } from "react";
import { View, Text, Button } from "react-native";

function Chatbot() {
  const [conversation, setConversation] = useState([]);

  const handleOptionPress = (option) => {
    // Send option to backend and wait for response
    // Then update conversation
    setConversation([...conversation, { type: "option", text: option }]);
    // You would typically await a response from your backend and then add it to the conversation
  };

  return (
    <View>
      {conversation.map((message, index) => (
        <Text key={index}>{message.text}</Text>
      ))}
      <Button title="Guest" onPress={() => handleOptionPress("Guest")} />
      <Button title="Host" onPress={() => handleOptionPress("Host")} />
    </View>
  );
}

export default Chatbot;
