import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../global.styles'
import Events from '../screens/Events'
import Photos from '../screens/Photos'
import Purchases from '../screens/Purchases'
import Header from './Header'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator 
            initialRouteName="events"
            screenOptions={{
                header: () => <Header />,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    height: 60, 
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen name="events" component={Events}/>
            <Tab.Screen name="photos" component={Photos}/>
            <Tab.Screen name="purchases" component={Purchases}/>
        </Tab.Navigator>
    )
}

export default Tabs

const styles = StyleSheet.create({})
