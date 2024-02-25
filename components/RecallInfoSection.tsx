import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import main_styles from '../styles/MainTheme.styles';

const RecallInfo = ({ recalls, viewMore, onViewMoreToggle  }) => {
  // const [viewMore, setViewMore] = useState(false);

  // const toggleViewMore = () => {
  //   setViewMore(!viewMore);
  // };

  return (
    <View >
      {recalls.map((recall) => (
        <View key={recall.id} style={styles.container}>
          <Text>Recall Info for -- VIN: {recall.vin}</Text>
          <Text>Model Year: {recall.model_year}</Text>
          <Text>Make: {recall.make}</Text>
          <Text>Model: {recall.model}</Text>
          
          {viewMore && (
            <>
              <Text>NHTSA Campaign Number: {recall.nhtsa_campaign_number}</Text>
              <Text>Recall Component: {recall.recall_component}</Text>
              <Text>Recall Summary: {recall.recall_summary}</Text>
              <Text>Recall Remedy: {recall.recall_remedy}</Text>
              <Text>Recall Notes: {recall.recall_notes}</Text>
              {/* Add more fields as needed */}
            </>
          )}

          <Pressable onPress={onViewMoreToggle} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{viewMore ? "View Less" : "View More"}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
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

export default RecallInfo;
