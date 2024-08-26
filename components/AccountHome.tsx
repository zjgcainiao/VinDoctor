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
  Button,
  Pressable
} from "react-native";
import auth from '@react-native-firebase/auth';

import { MaterialIcons,FontAwesome5, AntDesign } from "@expo/vector-icons"; // For the back button
import main_styles from "../styles/MainTheme.styles";
import { useRef } from "react";
import { Link, useRouter,useNavigation } from "expo-router";


import {firebaseUserStore,
  firebaseUnsubscribed,
  firebaseSignOut,
  storeInterface} from "../app/auth/firebaseUserStore";
import LinearGradient from 'react-native-linear-gradient';
import { interpolate} from 'react-native-reanimated';

const AccountHome: React.FC = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  {/* useProtectedRoute(); */}
  const navigation = useNavigation();
  // const router = useRouter();
  const menuHeight = useRef(new Animated.Value(0)).current; // Animation for height
  const animation = useRef(new Animated.ValueXY()).current;
  const pan = useRef(new Animated.ValueXY()).current;
  // Using Pullstate's useStoreState hook to subscribe to changes in the store
  const { isLoggedIn, user} = firebaseUserStore.useState();

  // useEffect(() => {
  //   // This effect runs when the component mounts. Here, you could perform actions based on the current auth state.
  //   console.log("Visiting Account Home. Is logged in?:", isLoggedIn, "...User status?:", user);
  //   const unsubscribe = firebaseUnsubscribed;
  //   // Cleanup function to unsubscribe from the auth state listener when the component unmounts
  //   return () => {unsubscribe();};
  // }, [isLoggedIn, user]);

  // PanResponder for the floating button
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => menuExpanded, // Disable dragging when expanded
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

  // Function to toggle the menu
   const toggleMenu = () => {
    setMenuExpanded(!menuExpanded);
    if (menuExpanded) {
      // Collapse
      Animated.timing(menuHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false 
      }).start();
    } else {
      // Expand
      Animated.timing(menuHeight, {
        toValue: 150, // Adjust height as needed
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  };
  // local sign out
  const localSignOut = async () => {
    // const router = useRouter();
    try {
        auth().signOut().then(()=>{
        console.log("signOut");
        firebaseUserStore.update((store: storeInterface) => {
            store.isLoggedIn = false;
            store.user = null;
            store.token = null;
            store.uid = null;
            });
        });
        // router.push("/");
        return { user: null, error: null };
    } catch (error) {
        console.log("signOut error", error);
        return { user: null, error: error };
    }
};

  return (
    <View style= {{flex:1, minHeight:700,width:"95%",}}>
      <Animated.View style={
          [styles.floatingButtonContainer,
            {transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }]
        }
        {...panResponder.panHandlers }
        >
        <TouchableOpacity 
          style={ styles.floatingButton }
          onPress={toggleMenu}
        >
        <MaterialIcons name="more-vert" size = {22} color = "black" />
        </TouchableOpacity>
        {/* Expandable Menu */}

            <Animated.View
              style={[
                styles.menu,
                { height: menuHeight, // Animate the height
                backgroundColor: 'sliver', // Basic silver background, replace with gradient if needed
                },
              ]}
            >
              
                <Pressable onPress={() => navigation.navigate('VehicleReport')}>
                
                  <Text style={styles.menuItem}><FontAwesome5 name="car" size={24} color="black" /></Text>
                </Pressable>
                {/*<Text style={styles.menuItem}>AI(beta)</Text>*/}
                
                <Pressable onPress={localSignOut}>
                  <Text style={styles.menuItem}><AntDesign name="logout" size={24} color="black" /></Text>
                </Pressable>

            </Animated.View>

      </Animated.View>


      <View style={[styles.card, styles.cardHover]}>
        <Text style={main_styles.heading}> User Info </Text>
        <Text> Name: {user?.displayName} </Text> 
        <Text> Email: {user?.email} </Text>         
        <Text> Email Verified?: {user?.emailVerified ? "Yes" : "No"} </Text>

        <Text> PhoneNumber {user?.phoneNumber} </Text>

      </View>

      
        <Link href="/VehicleReport" style={main_styles.mutedButton}>
          <Text>Try out a vin report </Text>
        </Link>
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  // ... existing styles
  floatingButton: {
    backgroundColor: "#fdba74",// color of the button is orange
    margin: 15,
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
    // shadowOffset: { width: 1, height: 2 },
    elevation: 3,
    width:'95%',
    maxHeight:200,
  },
  floatingButtonContainer: {
    // ... 
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 20,
  },  
  menu: {
    backgroundColor: '#e0e0e0', //'linear-gradient(to right, #e0e0e0, #6699cc)', // Replace with little silver metallic gradient
    // padding: 10, commen it out so there is no white bar when the menu is collapsed
    borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    position: 'absolute',
    top: 40, 
    right: 5,
    zIndex: 21 // Ensure it's on top of the button
  },
  menuItem: {
    // flex:1,
    fontFamily:'Exo2-Regular', // Adjust for desired font
    fontSize: 14, // Adjust for desired size
    marginVertical: 20, //Adds vertical spacing between menu items
    color: '#333', // Text color, adjust as needed

    borderBottomWidth: 2, 
    // justifyContent: 'center', // Align items vertically in the center
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ddd',  // Add a border to separate menu items  
  },

  cardHover: {
    opacity: 0.9, // Slight fade on hover
    // Add other effects like a subtle scale up if desired
  },
});

export default AccountHome;
