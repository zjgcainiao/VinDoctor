import React, { useState, useEffect  } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Alert,
  TextInput, Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For the back button
import main_styles from "../styles/MainTheme.styles";
import { useRef } from "react";
import { Link } from "expo-router";
import { firebaseSignOut } from "../app/auth/firebaseUserStore";
import {useProtectedRoute} from '../hook/useProtectedRoute';
import {firebaseUserStore,firebaseUnsubscribed} from "../app/auth/firebaseUserStore";

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
    width:'95%',
    maxHeight:200,
  },
});

const AccountHome: React.FC = () => {
  
  {/* useProtectedRoute(); */}
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const pan = useRef(new Animated.ValueXY()).current;

  // Using Pullstate's useStoreState hook to subscribe to changes in the store
  const { isLoggedIn, user } = firebaseUserStore.useState();

  useEffect(() => {
    // This effect runs when the component mounts. Here, you could perform actions based on the current auth state.
    console.log("Account Home");
    console.log("Is logged in:", isLoggedIn);
    console.log("User sattus:", user); 
    const unsubscribe = firebaseUnsubscribed;
    // Cleanup function to unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [isLoggedIn, user]);

  
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
    <View style= {{flex:1, minHeight:700,width:"95%",}}>
        <Animated.View style={
            {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
            position: "absolute",
            top: 5,
            right: 5,
              zIndex: 20,
            }
          }
          {...panResponder.panHandlers }>
          <TouchableOpacity 
            style={ styles.floatingButton }
            onPress={firebaseSignOut}
          >
          <Ionicons name="ios-settings" size = {24} color = "black" />
          </TouchableOpacity>
      </Animated.View>


      <View style={styles.card}>
        <Text> User Info </Text>
        <Text> {user?.email} </Text>
        <Text> Name: {user?.displayName} </Text>
        <Text> {user?.phoneNumber} </Text>

      </View>

        <View>
          <Link href="/VehicleReport" style={main_styles.mutedButton}>
            <Text>Get a vin report </Text>
          </Link>
        </View>
      
      
    </View>
  );
};

export default AccountHome;
