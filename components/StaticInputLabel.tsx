import React from 'react'
import { StyleSheet, Text, View, TextInput, ViewStyle } from 'react-native'
import { label as labelStyle, input } from '../global.styles'

interface Props {
    value: string
    label: string
    styles?: ViewStyle
}

const StaticInputLabel = ({ value, label, styles }: Props) => {
    return (
        <View style={{width: '100%', ...styles}}>
            <Text style={[labelStyle]}>{label}</Text>
                <TextInput 
                    value={value}
                    style={input}
                    editable={false}
                />
        </View>
    )
}

export default StaticInputLabel

