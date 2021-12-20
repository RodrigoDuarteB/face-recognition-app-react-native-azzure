import React from 'react'
import { StyleSheet, Text, View, TextInput, ViewStyle } from 'react-native'
import { label as labelStyle, input } from '../global.styles'

interface Props {
    value: string
    label: string
    styles?: ViewStyle
    lines?: number
}

const StaticInputLabel = ({ value, label, styles, lines }: Props) => {
    return (
        <View style={{width: '100%', ...styles}}>
            <Text style={[labelStyle]}>{label}</Text>
                <TextInput 
                    value={value}
                    style={input}
                    editable={false}
                    multiline={lines ? true : false}
                    numberOfLines={lines ? lines : 1}
                />
        </View>
    )
}

export default StaticInputLabel

