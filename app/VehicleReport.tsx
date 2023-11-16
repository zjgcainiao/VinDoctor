import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { Stack, useRouter } from "expo-router";
import main_styles from "../styles/MainTheme.styles";
import myLinearGradient from "../components/LinearGradientParts";
import { LinearGradient } from "expo-linear-gradient";
import {
  GluestackUIProvider,
  ButtonText,
  Box,
  // Button,
  HStack,
  Heading,
  Center,
  VStack,
  Image,
} from "@gluestack-ui/themed"; //gluestack-ui themed
import { config } from "@gluestack-ui/config";
import { Link, LinkText } from "@gluestack-ui/themed"; //gluestack-ui themed
interface CustomLinearGradientProps extends LinearGradient {
  borderRadius: string;
}

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
      {/* <Stack.Screen>

      </Stack.Screen> */}
      <GluestackUIProvider config={config}>
        <ScrollView>
          <VStack space="md" reversed={false}>
            <TextInput
              style={main_styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Enter VIN"
            />
            <Button title="Search" onPress={handleSearch} />
            {isLoading && <Text>Searching vin... please wait...</Text>}
            {searchResult && (
              <Text style={main_styles.resultText}>{searchResult}</Text>
            )}

            <LinearGradient
              colors={["$purple400", "$blue400", "$pink300"]}
              style={{ borderRadius: 16 }}
            >
              {/* ... */}
              <Link href="https://ui.gluestack.io/docs/" isExternal>
                <LinkText fontSize="$xl">Learn gluestack-ui</LinkText>
              </Link>
            </LinearGradient>
          </VStack>
        </ScrollView>
      </GluestackUIProvider>
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
