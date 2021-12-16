import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global.styles'
import Center from './Center'

const Fallback = ({ message }: {message: string}) => {
    return (
        <Center styles={styles.fallback}>
            <Text style={styles.fallbackText}>{message}</Text>
        </Center>
    )
}

export default Fallback

const styles = StyleSheet.create({
    fallback: {
        padding: 10
    },
    fallbackText: {
        color: colors.secondaryLight,
        fontSize: 17
    }
})
