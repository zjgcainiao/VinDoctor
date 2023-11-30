import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  // Button,
  // StyleSheet,
  Pressable,
} from "react-native";

import { RawButton } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { RefreshControl } from "react-native-gesture-handler";
import { SearchBar } from "@rneui/themed"; //react native elements
import { Stack, useRouter } from "expo-router";
import main_styles from "../styles/MainTheme.styles";
import myLinearGradient from "../components/LinearGradientParts";
import { LinearGradient } from "expo-linear-gradient";
import {
  GluestackUIProvider,
  ButtonText,
  Box,
  Button,
  HStack,
  Heading,
  Center,
  VStack,
  Image,
  StyledProvider,
  Link,
  LinkText,
} from "@gluestack-ui/themed"; //gluestack-ui themed
import { config } from "@gluestack-ui/config";
interface CustomLinearGradientProps extends LinearGradient {
  borderRadius: string;
}

// const CustomLinearGradient: React.FC<CustomLinearGradientProps> = ({
//   borderRadius,
//   ...props
// }) => {
//   return <LinearGradient {...props} />;
// };

const VehicleReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
    <SafeAreaView style={main_styles.container}>
      <ScrollView>
        <GluestackUIProvider config={config}>
          <VStack space="md" reversed={false} style={{ marginTop: 50 }}>
            <TextInput
              style={main_styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Enter VIN"
              keyboardType="numeric"
            ></TextInput>
            <LinearGradient
              colors={["$purple400", "$blue400", "$pink300"]}
              style={{ borderRadius: 16 }}
            >
              <Pressable style={main_styles.button} onPress={handleSearch}>
                <Text style={main_styles.buttonText}>Search</Text>
              </Pressable>
            </LinearGradient>
            {isLoading && <Text>Searching vin... please wait...</Text>}
            {searchResult && (
              <Text style={main_styles.resultText}>{searchResult}</Text>
            )}
          </VStack>
        </GluestackUIProvider>
      </ScrollView>
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

export default VehicleReport;
