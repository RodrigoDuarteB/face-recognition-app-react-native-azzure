import React from 'react'
import { StyleSheet, Text, SafeAreaView, StatusBar, View } from 'react-native'
import { colors } from '../global.styles'
import Center from './Center'
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = ({ navigation }: any) => {
    
    return (
        <SafeAreaView style={styles.header}>
            {/* header bar */}
            <View style={styles.headerBar}>
                <Text style={styles.headerBarText}>Events Photos</Text>
            </View>

            {/* user logo */}
            <Center>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                >
                    <FontAwesome5 name="user-cog" size={30} color={colors.secondaryLight}/>
                </TouchableOpacity>
            </Center>

        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
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
