// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router/stack';
import { Text } from 'react-native';
import { useFonts, loadAsync } from 'expo-font';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView, useEffect } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export default function Layout() {
  const fontsLoaded = useFonts({
    'RobotoCondensed': require('../assets/fonts/RobotoCondensed-VariableFont_wght.ttf'),
    'RobotoCondensed-Italic-Variables': require('../assets/fonts/RobotoCondensed-Italic-VariableFont_wght.ttf'),
    'ShareTechMono-Regular': require('../assets/fonts/ShareTechMono-Regular.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'Exo2-Light': require('../assets/fonts/Exo2-Light.ttf'),
    'Exo2-LightItalic': require('../assets/fonts/Exo2-LightItalic.ttf'),
    'Exo2-Regular': require('../assets/fonts/Exo2-Regular.ttf'),
    'Exo2-Thin': require('../assets/fonts/Exo2-Thin.ttf'),
    'Exo2-SemiBold': require('../assets/fonts/Exo2-SemiBold.ttf'),
    'Exo2-SemiBoldItalic': require('../assets/fonts/Exo2-SemiBoldItalic.ttf'),
    'Exo2-BoldItalic': require('../assets/fonts/Exo2-BoldItalic.ttf'),
    'Exo2-Bold': require('../assets/fonts/Exo2-Bold.ttf'),
    'Exo2-ExtraBold': require('../assets/fonts/Exo2-ExtraBold.ttf'),
    'Orbitron-Regular': require('../assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-SemiBold': require('../assets/fonts/Orbitron-SemiBold.ttf'),
    'Orbitron-Bold': require('../assets/fonts/Orbitron-Bold.ttf'),
    'Orbitron-ExtraBold': require('../assets/fonts/Orbitron-ExtraBold.ttf'),
    'Orbitron-Black': require('../assets/fonts/Orbitron-Black.ttf'),
    'NotoSansMono-Regular': require('../assets/fonts/NotoSansMono-Regular.ttf'),
    'NotoSansMono-Light': require('../assets/fonts/NotoSansMono-Light.ttf'),
    'NotoSansMono-Thin': require('../assets/fonts/NotoSansMono-Thin.ttf'),
    'NotoSansMono-Medium': require('../assets/fonts/NotoSansMono-Medium.ttf'),
    'NotoSansMono-ExtraBold': require('../assets/fonts/NotoSansMono-ExtraBold.ttf'),
    'NotoSansMono-Black': require('../assets/fonts/NotoSansMono-Black.ttf'),
    'NotoSansMono-Bold': require('../assets/fonts/NotoSansMono-Bold.ttf'),
    'NotoSansMono-SemiBold': require('../assets/fonts/NotoSansMono-SemiBold.ttf'),
    'NotoSansMono_Condensed-Regular': require('../assets/fonts/NotoSansMono_Condensed-Regular.ttf'),
    'NotoSansMono_Condensed-Light': require('../assets/fonts/NotoSansMono_Condensed-Light.ttf'),
    'NotoSansMono_Condensed-Thin': require('../assets/fonts/NotoSansMono_Condensed-Thin.ttf'),
    'NotoSansMono_Condensed-Medium': require('../assets/fonts/NotoSansMono_Condensed-Medium.ttf'),
    'NotoSansMono_Condensed-ExtraBold': require('../assets/fonts/NotoSansMono_Condensed-ExtraBold.ttf'),
    'NotoSansMono_Condensed-Black': require('../assets/fonts/NotoSansMono_Condensed-Black.ttf'),
    'NotoSansMono_Condensed-Bold': require('../assets/fonts/NotoSansMono_Condensed-Bold.ttf'),
    'NotoSansMono_Condensed-SemiBold': require('../assets/fonts/NotoSansMono_Condensed-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (<Text> Loading Customized fonts...</Text>);
  };


  return (
    <SafeAreaProvider >
        <Stack
          screenOptions={{
            headerShown: true,
            headerTintColor: '#9a3412', // #c2410c-orange700. #9a3412-orange800
            headerTitleStyle: {
              fontFamily: 'Exo2-Bold',
              // fontWeight:700,
            }
          }}
        >
        <Stack.Screen name="home" options={{}} />
        </Stack>
    </SafeAreaProvider>


  );
};