import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Dashboard from '../screens/Dashboard';
import CurrencyConverter from '../screens/CurrencyConverter';


const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CurrencyConverter" component={CurrencyConverter} />

    </Stack.Navigator>
  );
}

export default AppNavigator;
