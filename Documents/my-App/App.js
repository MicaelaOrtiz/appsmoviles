import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/homescreen';
import DetailScreen from './components/detailscreen';

const Stack = Platform.OS === 'web' ? createStackNavigator() : createNativeStackNavigator();

export default function App() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#ffffff',
    headerTitleStyle: { fontWeight: 'bold' },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Películas' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalle' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
