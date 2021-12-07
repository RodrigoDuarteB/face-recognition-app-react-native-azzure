import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login';
import Home from './screens/Home';
import Tabs from './components/Tabs';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator> */}
      <Tabs />
    </NavigationContainer>
  );
}
