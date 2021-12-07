import React from 'react'
import { StyleSheet, Text, SafeAreaView, StatusBar, View } from 'react-native'
import { colors } from '../global.styles'
import Center from './Center'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            {/* header bar */}
            <View style={styles.headerBar}>
                <Text style={styles.headerBarText}>Events Photos</Text>
            </View>

            {/* user logo */}
            <Center>
                <Text>User</Text>
            </Center>

        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight,
        height: 60,
        backgroundColor: colors.secondaryDark,
    },
    headerBar: {
        backgroundColor: colors.primary,
        width: '75%',
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBarText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
