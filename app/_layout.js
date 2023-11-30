// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router/stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    'RobotoCondensed': require('../assets/fonts/RobotoCondensed-VariableFont_wght.ttf'),
    'Exo2-Light': require('../assets/fonts/Exo2-Light.ttf'),
    'Exo2-LightItalic': require('../assets/fonts/Exo2-LightItalic.ttf'),
    'Exo2-Regular': require('../assets/fonts/Exo2-Regular.ttf'),
    'Exo2-Thin': require('../assets/fonts/Exo2-Thin.ttf'),
    'Exo2-SemiBold': require('../assets/fonts/Exo2-SemiBold.ttf'),
    'Exo2-BoldItalic': require('../assets/fonts/Exo2-BoldItalic.ttf'),
    'Exo2-Bold': require('../assets/fonts/Exo2-Bold.ttf'),
    'ShareTechMono-Regular': require('../assets/fonts/ShareTechMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a custom loader if you prefer
  }

  
  return (
    <SafeAreaProvider>
    <Stack
      screenOptions={{
        headerShown:true,
        headerTintColor: '#c2410c', // orange700
        headerTitleStyle: {
          fontFamily: 'Exo2-Bold', // Replace 'YourCustomFont' with the actual font family name
          // fontWeight:700,
        },
      }}
      />
      </SafeAreaProvider>
      
    
  );
};