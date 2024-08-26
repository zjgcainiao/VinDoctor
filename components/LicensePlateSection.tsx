import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
// import main_styles from '../styles/MainTheme.styles';

const LicensePlateSection = ({ licensePlateAndVinData, viewMore, onViewMoreToggle }) => {

  if (
    Array.isArray(licensePlateAndVinData) &&
    licensePlateAndVinData.length === 1 &&
    typeof licensePlateAndVinData[0] === 'object' &&
    'color_abbreviation' in licensePlateAndVinData[0]
  ) {
    // licensePlateAndVinData is a single object list with color_abbreviation property
    // Fetch the dictionary from the list
    licensePlateAndVinData = licensePlateAndVinData[0];

    // Use it for LicensePlateSection
    // Assuming LicensePlateSection is a React component that takes a prop named data

  } else {
    // licensePlateAndVinData is not a single object list with color_abbreviation property
    // Handle this case as needed
    console.log('licensePlateAndVinData is not a single object list with color_abbreviation property');
  }
  return (
    <ScrollView style= { styles.container } >
    <Text style={styles.headerText}> License Plate Information </Text>
      <Text> License Plate: { licensePlateAndVinData.license_plate } </Text>
        <Text> State: { licensePlateAndVinData.state } </Text>
          <Text> VIN: { licensePlateAndVinData.vin } </Text>
            <Text > Year: { licensePlateAndVinData.year } </Text>
              <Text> Make: { licensePlateAndVinData.make } </Text>
                <Text > Engine: { licensePlateAndVinData.engine } </Text>
                  <Text > Drive Type: { licensePlateAndVinData.drive_type } </Text>
                    <Text> Style: { licensePlateAndVinData.style } </Text>
                      <Text> Fuel: { licensePlateAndVinData.fuel } </Text>
                        <Text> Color: { licensePlateAndVinData.color_name } ({ licensePlateAndVinData.color_abbreviation }) < /Text>

  {
    viewMore && (
      <View style={ styles.vinDataContainer }>
        <Text style={ styles.subHeaderText }> Detailed Information < /Text>
    {
      licensePlateAndVinData.vin_data.map((data, index: number) => (
        <View key= { index } style = { styles.vinDataItem } >
        <Text>{ data.variable_name }: { data.value } < /Text>
      < /View>
      ))
    }
    </View>
  )}

<Pressable onPress={ onViewMoreToggle } style = { styles.viewMoreButton } >
  <Text style={ styles.viewMoreButtonText }> { viewMore? 'View Less': 'View More' } < /Text>
    < /Pressable>
    < /ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 10,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3, // for Android
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18, // slightly smaller than headerText
    fontWeight: '500', // less bold than headerText
    color: '#333333', // slightly darker for contrast against a lighter background
    marginBottom: 5, // space below the sub-header
  },
  vinDataContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  vinDataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  viewMoreButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  viewMoreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  viewMoreText: {
    color: '#000',
  },
});

export default LicensePlateSection;
