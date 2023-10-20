import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Navbar = ({ onVinSearch }) => (
  <View style={styles.navbar}>
    <Text style={styles.title}>VinDoctor</Text>
    <Button title="Vin Search" onPress={onVinSearch} />
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
});

export default Navbar;
