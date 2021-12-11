import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global.styles'
import Center from './Center'

const Logo = () => {
    return (
        <View style={styles.container}>
            <Center>
                <Text style={styles.text}>Events Photos</Text>
            </Center>
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: 120,
        borderRadius: 30,
        width: 300
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    }
})
