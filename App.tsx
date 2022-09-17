import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/auth/Login';
import Home from './screens/Home';
import Profile from './screens/auth/Profile';
import Register from './screens/auth/Register';
import CreateEvent from './screens/events/CreateEvent';
import Event from './screens/events/Event';
import Cart from './screens/Cart';
import { Provider } from 'react-redux'
import store from './store';
import EditEvent from './screens/events/EditEvent';
import { LogBox } from 'react-native';
import AuthProvider from './context/Auth.context';

const Stack = createNativeStackNavigator()

LogBox.ignoreAllLogs(true)

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Provider store={store}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="CreateEvent" component={CreateEvent}/>
            <Stack.Screen name="EditEvent" component={EditEvent}/>
            <Stack.Screen name="Event" component={Event}/>
            <Stack.Screen name="Cart" component={Cart}/>
          </Stack.Navigator>
        </Provider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App