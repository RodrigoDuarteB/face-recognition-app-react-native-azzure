import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { auth as authentication } from '../firebase.config'
import { colors, safeTop } from '../global.styles'
import Loading from './Loading'
import CartButton from './CartButton'

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
            {cart && <CartButton />}
        </SafeAreaView>
    ) : (
        <View style={[internStyles.container, styles]}>
            {children}
            { cart && <CartButton />}
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
