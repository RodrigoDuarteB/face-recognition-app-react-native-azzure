import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native'
import { colors, safeTop } from '../global.styles'
import CartButton from './CartButton'
import { useAuth } from '../context/Auth.context'

interface Props {
    safe?: boolean,
    children?: any
    auth?: boolean
    cart?: boolean
    styles?: ViewStyle
}

const Content = ({children, safe, auth, styles, cart }: Props) => {
    const navigation: any = useNavigation()
    const { user } = useAuth()

    if(auth && !user){
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        })
    }

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
