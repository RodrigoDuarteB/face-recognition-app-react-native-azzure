import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native'
import { getAuth } from 'firebase/auth'
import { colors, safeTop } from '../global.styles'
import Loading from './Loading'
import CartButton from './CartButton'

interface Props {
    safe?: boolean,
    children?: any
    auth?: boolean
    cart?: boolean
    styles?: ViewStyle
}

const Content = ({children, safe, auth, styles, cart }: Props) => {
    const [user] = useAuthState(getAuth())
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
