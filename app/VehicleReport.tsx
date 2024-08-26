import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  // Button,
  StyleSheet,
  Pressable,
} from "react-native";
import axios from "axios";

import { RawButton } from 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { RefreshControl } from "react-native-gesture-handler";
import { SearchBar } from "@rneui/themed"; //react native elements
import { useRouter} from 'expo-router';
import Stack from 'expo-router/stack';
import main_styles from "../styles/MainTheme.styles";
import myLinearGradient from "../components/LinearGradientParts";
import { LinearGradient } from "expo-linear-gradient";
import {firebaseUserStore} from './auth/firebaseUserStore';
// import useFetch from '../hook/useFetch';
import SafetyRatings from '../components/SafetyRatingSection';
import RepairHistory from '../components/RepairHistorySection';
import RecallInfo from '../components/RecallInfoSection';
import LicensePlateSection from '../components/LicensePlateSection';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken,fetchAndStoreAnonymousToken  } from '../components/saveSecureStore';

interface CustomLinearGradientProps extends LinearGradient {
  borderRadius: string;
}

const VehicleReport: React.FC = () => {

  // const { isLoggedIn, user, token, uid } = firebaseUserStore.userState();
  const [searchResult, setSearchResult] = useState<[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [activeTab, setActiveTab] = useState('vinSearch'); // 'vinSearch' or 'licenseSearch'
  const [vin, setVin] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [state, setState] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('');

  const { isLoggedIn, user, token } = firebaseUserStore.useState();
  const [viewMoreSafetyRatings, setViewMoreSafetyRatings] = useState(false);
  const [viewMoreRecallInfo, setViewMoreRecallInfo] = useState(false);
  const [viewMoreLicensePlateSection, setViewMoreLicensePlateSection] = useState(false);
  const [keyValue, setKeyValue] = useState(0); // Initial key value
  
  useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
          setUrl('http://127.0.0.1:8000/apis/handle_react_native_vehicle_search_api_view/?format=json');
      } else {
          setUrl('https://new76prolubeplus.com/apis/handle_react_native_vehicle_search_api_view/?format=json');
      }
  }, []);

  const toggleLicensePlateSection = () => {
    setViewMoreLicensePlateSection(!viewMoreLicensePlateSection);
    setKeyValue(prevKey => prevKey + 1); // Increment key value to trigger re-render
  }


  const toggleViewMoreSafetyRatings = () => {
    setViewMoreSafetyRatings(!viewMoreSafetyRatings);
    setKeyValue(prevKey => prevKey + 1); // Increment key value to trigger re-render
  };

  const toggleViewMoreRecallInfo = () => {
    setViewMoreRecallInfo(!viewMoreRecallInfo);
    setKeyValue(prevKey => prevKey + 1); // Increment key value to trigger re-render
  };
  
  // this handleSearch can be divided into constructUrlAndFetch and fetchData() in the next phase.
  const handleSearch = async () => {
    // Start by resetting any error messages or states
    setIsLoading(true);
    setErrorMessage(null); // clear any previous error message
    try {
      let result;
      let searchParams={};
      if (activeTab === 'vinSearch') {
        // Validate VIN search inputs
        if (!vin || (modelYear && isNaN(modelYear))) {
          setErrorMessage('Please enter a valid VIN and an optional numeric model year.');
          setIsLoading(false);
          return;
        }

        // Construct a search term or object for VIN search
        // Assuming fetchSearchResult can handle an object or specific parameters for search
        searchParams = { vin:vin, modelYear: modelYear };
        setVin(vin);
        setModelYear(modelYear);
        setSearchParams(searchParams);
      

      } else if (activeTab === 'licenseSearch') {
        // Validate license plate search inputs
        if (!licensePlate || !state) {
          setErrorMessage('Both license plate and state must be provided.');
          setIsLoading(false);
          return;
        }
        // Construct a search term or object for license plate search
        searchParams = { licensePlate:licensePlate, state:state };
        setLicensePlate(licensePlate);
        setState(state);
        setSearchParams(searchParams);
      }
      
      let postData = {};
      // C for Vin search
      if ('vin' in searchParams && searchParams.vin) {
          
          postData = { vin: searchParams.vin,
              ...(searchParams.modelYear && { modelYear: searchParams.modelYear })
          };
          // Construct query parameters for license plate search
      } else if ('licensePlate' in searchParams && searchParams.licensePlate) {
          postData = {
              licensePlate: searchParams.licensePlate,
              ...(searchParams.state && { state: searchParams.state }) // Conditionally add state if it exists
          };
      }
      console.log('data submitted from react native:', postData);
      console.log('user is logged in:', isLoggedIn,'user is:', user, 'token:', token, 'token_type', token_type);
      //use ananoymousSearchCount
      // Assuming `token` determines if a user is signed in or not
      if (!token || !isLoggedIn) { // User is anonymous. count of 3
        await fetchAndStoreAnonymousToken();
        let searchCount = await SecureStore.getItemAsync('anonymousSearchCount');
        // searchCount=10; for testing or debugging
        console.log('customer is not logged in, searchCount:', searchCount);
        
        token_jwt = await getAccessToken();
        console.log('using jwt token', token_jwt);
        if (searchCount <= 0) {
          setErrorMessage('You have reached the maximum number of searches. Please sign in to continue.');
          return; // Exit the function if the search limit is reached
        } else {
          // Decrement the search counter and save it
          searchCount -= 1;
          await SecureStore.setItemAsync('anonymousSearchCount', JSON.stringify(searchCount));
          // Continue with the search
        }
      }

      // Perform the search (this includes the code you've provided for fetching data)
      setIsLoading(false);

      if (!url) return; // Ensure URL is available
      console.log('url:', url, 'token:', token, 'user is anonymous:', !isLoggedIn); 
      setIsFetching(true);
      
      let final_token_submitted;
      let token_type;
      if (token) {
        final_token_submitted = token;
        token_type = 'firebase';
      } else {
        final_token_submitted = token_jwt;
        token_type = 'simplejwt';
      }
      // submit to the django backend 
      try {
          const response = await axios.post(url, postData, {
              headers: {
                  Authorization: `Bearer ${final_token_submitted}`,
                  'Content-Type': 'application/json', // Specify the content type
                  'Token-Type': token_type,
              },
          });

          const data = response.data;
          

          // if (token_type === 'simplejwt' && data && data.length > 0) {
          //   data = data[0];
          // }

          console.log('submitted token type',token_type,'returned data from django server', data);
          if (data) {
              setData(data);
              setSearchResult(data);
          } else {
              setErrorMessage('No results found. Please try again with different search criteria.');
          }
      } catch (err) {
        setErrorMessage(err.message || 'An error occurred' );
        console.log('Error:', err, 'url:', url, 'token_submitted:', final_token_submitted);

      } finally {
        setIsFetching(false);
      }

    } catch (error) {
      // Handle the error in a way that is appropriate for your application
      console.error(error);
      // Optionally set an error state here
      // setErrorMessage(error);
      setErrorMessage('An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };
  // end of handle search 

  // const SafetyRatings = ({ ratings }) => (
  //   <>
  //     {ratings.map((rating) => (
  //       <Text key={rating.id}>{/* Display rating details */}11</Text>
  //     ))}
  //   </>
  // );

  const NhtsaDecodedVinInfo = ({ vinInfo }) => (
    <>
      <Text>{/* Display VIN info details */} Additionall Vehicle Info </Text>
        {vinInfo.length === 0 ? (
        <Text> No Additional Info available. This usually does not happen. Check if the Vin input is correct.</Text>
      ) : (
        vinInfo.map((record) => (
          <Text key={record.id}>{/* Display Nhtsa Decoded Vin details in a flattened format (variable-name: value) */}3344</Text>
        ))
      )}
    </>
  );

  const refetch = () => {
    setIsFetching(true);
    fetchData();
  };

  useEffect(() => {
    if (!vin ) {
      setVin('');
    }
    if (!modelYear) {
      setModelYear('');
    }
    if (!licensePlate) {
      setLicensePlate('');
    }
    if (!state) {
      setState('');
    }
    if (!searchParams) {
      setSearchParams({}); // Reset search params;
    }

  }, [searchParams]);

  return (
    <ScrollView  
        contentContainerStyle={styles.container}
        key={keyValue} // keyValue updates when content changes significantly
        style={{ flex: 1 }} // Apply flex: 1 here if needed for the ScrollView itself 
        >
        <View style={styles.tabs}>
          <Pressable 
          style={[styles.tab, activeTab === 'vinSearch' ? styles.activeTab : null]}
          onPress={() => setActiveTab('vinSearch')}>
            <Text style={styles.tabText}>VIN Search</Text>
          </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'licenseSearch' ? styles.activeTab : null]}
              onPress={() => setActiveTab('licenseSearch')}>
            <Text style={styles.tabText}>License Plate Search</Text>
          </Pressable> 
        </View>

        {activeTab === 'vinSearch' && (
          <>
            <TextInput
              style={styles.input}
              value={vin}
              onChangeText={setVin}
              placeholder="Enter VIN"
              maxLength={17} // Standard VIN length
            />
            <TextInput
              style={styles.input}
              value={modelYear}
              onChangeText={setModelYear}
              placeholder="Enter Model Year (Optional)"
              keyboardType="numeric"
              maxLength={4} // Four digits for year
            />
          </>
        )}

        {activeTab === 'licenseSearch' && (
          <>
            <TextInput
              style={styles.input}
              value={licensePlate}
              onChangeText={setLicensePlate}
              placeholder="Enter License Plate"
              maxLength={10} // Assuming a general max length for license plates
            />
            <TextInput
              style={styles.input}
              value={state}
              onChangeText={setState}
              placeholder="Enter State"
              maxLength={2} // Two-letter state code
            />
          </>
        )}

        <LinearGradient
          colors={['#BCC6CC', '#EAEAEA']} // #BCC6CC, #EAEAEA - Metallic gradient
          style={styles.buttonGradient}
        >
          <Pressable style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
        </LinearGradient>

        {isLoading && <Text>Loading...</Text>}
        {errorMessage && <Text>{errorMessage}</Text>}
        {data && activeTab==='licenseSearch' && (
          <>
            <LicensePlateSection
              licensePlateAndVinData={data}
              viewMore={viewMoreLicensePlateSection}
              onViewMoreToggle={toggleLicensePlateSection}
            />
          </>
        )}
        {data && activeTab === "vinSearch" && (
          <>
            {data.safety_ratings && 
              <SafetyRatings
                ratings={data.safety_ratings}
                viewMore={viewMoreSafetyRatings}
                onViewMoreToggle={toggleViewMoreSafetyRatings}
              />
            }
            {data.recall_info && 
              <RecallInfo 
                recalls={data.recall_info} 
                viewMore={viewMoreRecallInfo}
                onViewMoreToggle={toggleViewMoreRecallInfo}
              />
            }
          </>
        )}
    
    </ScrollView>
  );

};


// styles in the stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'upper',
    marginTop: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#BCC6CC', // Metallic color for tab indicator

  },
  activeTab: {
    backgroundColor: '#fdba74', //#fdba74-orange300

  },

  tabText: {
    color: '#606060', // Dark grey for contrast
    fontFamily: 'Exo2-ExtraBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BCC6CC', // Metallic border color
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '90%',
    fontFamily: 'Exo2-Regular',
    backgroundColor: '#F0F0F0', // Light background to simulate metal
  },
  buttonGradient: {
    borderRadius: 20,
    marginTop: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    width: 200,
    backgroundColor: '#555d61', // A color from your provided gradient that suggests a "darker" look
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Exo2-ExtraBold',
  },
});

export default VehicleReport;


