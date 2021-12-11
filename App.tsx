import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Register from './screens/Register';
import MediaSelector from './components/MediaSelector';
import CreateEvent from './components/events/CreateEvent';
import Event from './components/events/Event';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Media" component={MediaSelector} />
        <Stack.Screen name="CreateEvent" component={CreateEvent}/>
        <Stack.Screen name="Event" component={Event}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App