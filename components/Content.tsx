import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global.styles'

const Content = ({children}: any) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Content

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryDark
    }
})
