import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";

import { Stack, useRouter } from "expo-router";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchTerm) return;

    setIsLoading(true);

    // Assume this sends a request to your Django app
    const result = await fetchSearchResult(searchTerm);

    setSearchResult(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResult(null); // Remove search result when search term is cleared
    }
  }, [searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen></Stack.Screen>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Enter VIN"
      />
      <Button title="Search" onPress={handleSearch} />
      {isLoading && <Text>Searching vin... please wait...</Text>}
      {searchResult && <Text style={styles.resultText}>{searchResult}</Text>}
    </SafeAreaView>
  );
};

const fetchSearchResult = async (term: string): Promise<string> => {
  // This is a mock function. You'd use something like `fetch` here to call your Django API.
  // Example: const response = await fetch(`yourApiUrl/search?term=${term}`);
  //          const data = await response.json();
  //          return data.result;
  return `Result for ${term}`; // Mocking the returned result
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default SearchPage;
