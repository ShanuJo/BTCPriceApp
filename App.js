import { View, Text, StatusBar, StyleSheet } from "react-native";
import Splash from "./src/screens/Splash";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from 'expo-font';


export default function App() {
  const [loaded] = useFonts({
    interBold: require('./src/fonts/Inter-Bold.otf'),
    interRegular: require('./src/fonts/Inter-Regular.otf'),
    interItalic: require('./src/fonts/Inter-Italic.otf'),
    interBold2: require('./src/fonts/InterDisplay-ExtraBold.otf'),
    interSemiBold: require('./src/fonts/Inter-SemiBold.otf'),
  });
  
  if (!loaded) {
    return null;
  }
  return (
<>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    {/* <MyDropdown/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#000',
      justifyContent:'center',
      alignItems:'center'
  }
})
