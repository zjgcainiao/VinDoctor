import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import main_styles from "../styles/MainTheme.styles";
import { useRef } from "react";
import { Link } from "expo-router";
import { firebaseSignOut } from "../app/auth/firebaseUserStore";
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   floatingButton: {
//     backgroundColor: "#fdba74", // #fdba74 is orange300. #c2410c is orange700.
//     alignItems: "center",
//     justifyContent: "center",
//     width: 60,
//     height: 60,
//     position: "absolute",
//     top: 10, // Changed from bottom to top
//     left: 10, // Changed from right to left
//     borderRadius: 30,
//     elevation: 8,
//   },
// });
const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#fdba74",
    margin: 16,
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
    maxHeight:200,
  },
});

const AccountHome: React.FC = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  console.log("navigation:", navigation);
  console.log("visible:", visible);
  console.log("pan", pan);
  console.log("panResponder:", panResponder);

  return (
    <View style= {{flex:1, minHeight:700}}>
        <Animated.View style={
            {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
            position: "absolute",
            top: 10,
            left: 10,
              zIndex: 10,
            }
          }
          {...panResponder.panHandlers }>
        <TouchableOpacity style={ styles.floatingButton }>
          <Ionicons name="ios-settings" size = {24} color = "black" />
        </TouchableOpacity>
      </Animated.View>
      <View>
        <Link href="/Accounts" ><Text style={main_styles.vinText}>Accounts </Text></Link>
      </View>
            <TouchableOpacity 
        style={styles.Button}
        onPress={async () => {
          const result = await firebaseSignOut();
          if (result.error) {
            // Handle error (e.g., show an alert)
            Alert.alert('Error', 'Failed to sign out.');
          } else {
            // Optionally, navigate to the login screen or update the UI
          }
        }}
      >
        <Ionicons name="ios-settings" size={24} color="black" />
      </TouchableOpacity>

      <View style={main_styles.card}>
        <Text>Card 1 </Text>
      </View>

      <View style={main_styles.card}>
        <Text>Card 2 </Text>
      
      </View>
    </View>
  );
};

export default AccountHome;
