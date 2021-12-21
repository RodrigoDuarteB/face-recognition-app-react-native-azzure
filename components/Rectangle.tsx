import React from 'react'
import { ColorValue, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface Props {
    height: number
    width: number
    borderColor: ColorValue | undefined 
    top?: number
    left?: number
    style?: ViewStyle
}

const Rectangle = ({ height, width, borderColor, top, left }: Props) => {
    return (
        <View style={[styles.rectangle, {height, width, borderColor, top, left}]}>
        </View>
    )
}

export default Rectangle

const styles = StyleSheet.create({
    rectangle: {
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        position: 'absolute'
    }
})
