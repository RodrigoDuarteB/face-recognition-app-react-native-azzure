import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { auth as authentication } from '../firebase.config'
import { colors, safeTop } from '../global.styles'
import Loading from './Loading'

const Content = ({children, safe, auth, styles }: any) => {
    /* const [user] = useAuthState(authentication.getAuth())
    const [ready, setReady] = useState(false)
    const navigation: any = useNavigation()

    useEffect(() => {
        if(auth && !user){
            navigation.replace('Login')
        }else{
            setReady(true)
        }
    }, []) */

    return safe ? (
            <SafeAreaView style={[internStyles.container, safeTop, styles]}>
                {children}
            </SafeAreaView>
        ) : (
            <View style={[internStyles.container, styles]}>
                {children}
            </View>
        )
    
    
}

export default Content

const internStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryDark
    }
})
