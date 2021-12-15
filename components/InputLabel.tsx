import React from 'react'
import { useController } from 'react-hook-form'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { label as labelStyle, input } from '../global.styles'

interface Props {
    name: string
    label: string
    control: any
    password?: boolean
    multiline?: boolean
    styles?: ViewStyle | TextStyle
}

const InputLabel = ({ name, label, control, password, styles, multiline }: Props) => {
    const { field } = useController({
        name,
        control,
        defaultValue: ''
    })

    return (
        <View style={{width: '100%', ...styles}}>
            <Text style={[labelStyle]}>{label}</Text>
            <TextInput 
                value={field.value}
                onChangeText={field.onChange}
                style={input}
                placeholder={label}
                secureTextEntry={password}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
            />
        </View>
    )
}

export default InputLabel

