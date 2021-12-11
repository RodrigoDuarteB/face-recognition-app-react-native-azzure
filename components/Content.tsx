import { useNavigation } from '@react-navigation/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { auth as authentication } from '../firebase.config'
import { colors, safeTop } from '../global.styles'
import Loading from './Loading'
import { MaterialIcons } from '@expo/vector-icons'
import Center from './Center'

const FloatCartButton = () => {
    const navigation: any = useNavigation()

    return (
        <TouchableOpacity 
            style={internStyles.floatButton}
            onPress={() => navigation.navigate('Cart')}
        >
            <Center>
                <MaterialIcons name="shopping-cart" size={30} color='black'/>
            </Center>
        </TouchableOpacity>
    )
}

const Content = ({children, safe, auth, styles, cart }: any) => {
    const [user] = useAuthState(authentication.getAuth())
    const navigation: any = useNavigation()

    useEffect(() => {
        if(auth && !user){
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            })
        }
    }, [])

    if(auth && !user)
        return <Loading />

    return safe ? (
        <SafeAreaView style={[internStyles.container, safeTop, styles]}>
            {children}
            {cart && <FloatCartButton />}
        </SafeAreaView>
    ) : (
        <View style={[internStyles.container, styles]}>
            {children}
            { cart && <FloatCartButton />}
        </View>
    )
    
}

export default Content

const internStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryDark
    },
    floatButton: {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: colors.primaryDark,                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        shadowColor: colors.secondaryLight,
        shadowOpacity: 0.8,
        elevation: 7,
        shadowRadius: 15 ,
        shadowOffset : { width: 56, height: 13},
        borderWidth:0,
    }
})
