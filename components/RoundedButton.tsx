import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../global.styles'
import Center from './Center'

interface Props {
    onPress: () => any
    icon: React.ReactNode
}

const RoundedButton = ({ onPress, icon }: Props) => {
    return (
        <TouchableOpacity style={styles.addButton}
            onPress={onPress}
        >
            <Center>
                {icon}
            </Center>
        </TouchableOpacity>
    )
}

export default RoundedButton

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: colors.secondaryLight,
        borderRadius: 30,
        width: 60,
        height: 60
    }, 
})
