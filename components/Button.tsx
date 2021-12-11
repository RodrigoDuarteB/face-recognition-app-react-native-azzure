import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors } from '../global.styles'

interface ButtonProps {
    onPress: () => any
    title: string
    color?: string
    textColor?: string
    styles?: ViewStyle
}

const Button = ({ onPress, title, color, textColor, styles }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[internStyles.button, {
                backgroundColor: color ? color : colors.primary
            }, styles]}
        >
            <Text style={[internStyles.buttonText, {
                color: textColor ? textColor : 'black'
            }]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const internStyles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        width: 150,
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16
    },
})
