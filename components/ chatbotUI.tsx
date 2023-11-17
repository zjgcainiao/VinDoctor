import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  FlatList,
} from "react-native";

// Define a type for individual messages
type Message = {
  id: string;
  type: "option";
  text: string;
};
interface virtualAssistantResponse {
  // Define the structure of the response you expect
  id?: string;
  choices?: Array<{ text: string }>;
  error?: string;
}

const virtualAssistantComponent: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<virtualAssistantResponse | null>(
    null
  );

  const handleOpenAIRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://new76prolubeplus.com/apis/api/openai_proxy/", // the django side openai backend
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Your payload for the OpenAI API
            prompt:
              "Translate the following English text to French: 'Hello, world!'",
            max_tokens: 60,
          }),
        }
      );
      const data: virtualAssistantResponse = await response.json();
      setResponse(data);
    } catch (error) {
      setError("An error occurred while fetching the data.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={handleOpenAIRequest}>
          <Text>Ask</Text>
        </TouchableOpacity>
      )}
      {error && <Text>Error: {error}</Text>}
      {response && <Text>Response: {JSON.stringify(response, null, 2)}</Text>}
    </ScrollView>
  );
};

export default virtualAssistantComponent;
