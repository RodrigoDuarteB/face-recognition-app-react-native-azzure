import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors } from '../global.styles'
import Events from './Events'
import Photos from './Photos'
import Purchases from './Purchases'
import Header from '../components/Header'
import { MaterialIcons } from '@expo/vector-icons'
import Notifications from './Notifications'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateEvent from '../components/events/CreateEvent'
import Event from '../components/events/Event'

const Tab = createBottomTabNavigator()
const EventsStack = createNativeStackNavigator()

const Home = () => {

    /* const EventsStackScreen = () => (
        <EventsStack.Navigator screenOptions={{headerShown: false}}>
            <EventsStack.Screen name="EventsHome" component={Events}/>
            <EventsStack.Screen name="CreateEvent" component={CreateEvent}/>
            <EventsStack.Screen name="Event" component={Event}/>
        </EventsStack.Navigator>
    ) */

    return (
        <Tab.Navigator 
            initialRouteName="Events"
            screenOptions={({ route, navigation }) => ({
                header: () => <Header navigation={navigation}/>,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    height: 60, 
                    borderTopWidth: 0,
                    paddingTop: 7
                }
            })}
        >
            <Tab.Screen name="Events" component={Events}
                options={{
                    tabBarIcon: ({focused}) => <MaterialIcons name="event" size={30} color={focused ? 'white' : 'black'}/>,
                    tabBarLabel: ({focused}) => <Text style={{...styles.label, color: focused ? 'white': 'black'}}>Eventos</Text>,
                }}
            />
            <Tab.Screen name="Photos" component={Photos}
                options={{
                    tabBarIcon: ({focused}) => <MaterialIcons name="photo" size={30} color={focused ? 'white' : 'black'}/>,
                    tabBarLabel: ({focused}) => <Text style={{...styles.label, color: focused ? 'white': 'black'}}>Mis Fotos</Text>
                }}
            />
            <Tab.Screen name="Purchases" component={Purchases}
                options={{
                    tabBarIcon: ({focused}) => <MaterialIcons name="shopping-cart" size={30} color={focused ? 'white' : 'black'}/>,
                    tabBarLabel: ({focused}) => <Text style={{...styles.label, color: focused ? 'white': 'black'}}>Mis Compras</Text>
                }}
            />
            <Tab.Screen name="Notifications" component={Notifications}
                options={{
                    tabBarIcon: ({focused}) => <MaterialIcons name="notifications-active" size={30} color={focused ? 'white' : 'black'}/>,
                    tabBarLabel: ({focused}) => <Text style={{...styles.label, color: focused ? 'white': 'black'}}>Notificaciones</Text>
                }}
            />
        </Tab.Navigator>
    )
}

export default Home

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: 'bold'
    }
})
