import React, { useState } from 'react';
import { View, Text, Pressable, Image, Linking, StyleSheet } from 'react-native';

const RepairHistory = ({ ratings, viewMore, onViewMoreToggle }) => {
  // State to manage view more/less toggle for each rating item
//   const [viewMore, setViewMore] = useState(ratings.reduce((acc, rating) => {
//     acc[rating.id] = false;
//     return acc;
//   }, {}));

//   const toggleViewMore = (id) => {
//     setViewMore(prevState => ({
//       ...prevState,
//       [id]: !prevState[id],
//     }));
//   };

  // Function to render field value, check if it's a URL to make it clickable
  const renderFieldValue = (value, key) => {
    if (key.includes('url') && value?.startsWith('http')) {
      return (
        <Text key={key} style={styles.linkText} onPress={() => Linking.openURL(value)}>
          {key.replace(/_/g, ' ')}
        </Text>
      );
    }
    return <Text key={key}>{`${key.replace(/_/g, ' ')}: ${value}`}</Text>;
  };

  return (
    <View>
      {history.map((rating) => (
        <View key={rating.id} style={styles.ratingContainer}>
          {/* Initially visible details */}
          <Text>VIN: {rating.vin}</Text>
          <Image source={{ uri: rating.vehicle_picture_url }} style={styles.image} />
          <Text>Overall Rating: {rating.overall_rating}</Text>
          
          {/* Toggleable detailed view */}
          {viewMore[rating.id] && Object.entries(rating).map(([key, value]) => renderFieldValue(value, key))}
          
          <Pressable onPress={onViewMoreToggle} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{viewMore[rating.id] ? "View Less" : "View More"}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  viewMoreButton: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  viewMoreText: {
    color: '#000',
  },
});

export default RepairHistory;
