import React from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../global.styles'

interface Props {
    name: string, label?: string, control: any, password?: boolean, styles?: any
}

const InputLabel = ({ name, label, control, password, styles }: Props) => {
    const { field } = useController({
        name,
        control,
        defaultValue: ''
    })

    return (
        <View style={{width: '100%', ...styles}}>
            <Text style={internStyles.label}>{label ? label : name}</Text>
            <TextInput 
                value={field.value}
                onChangeText={field.onChange}
                style={internStyles.input}
                placeholder={name}
                secureTextEntry={password}
            />
        </View>
    )
}

export default InputLabel

const internStyles = StyleSheet.create({
    input: {
        backgroundColor: colors.secondaryLight,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 5,
        fontSize: 15,
        fontWeight: '700'
    },
    label: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
})
