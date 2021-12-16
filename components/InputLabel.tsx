import React from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import { Text, TextStyle, View, ViewStyle, StyleSheet, KeyboardTypeOptions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { label as labelStyle, input } from '../global.styles'

interface Props {
    name: string
    label: string
    control: any
    password?: boolean
    multiline?: boolean
    required?: boolean
    numeric?: boolean
    email?: boolean
    styles?: ViewStyle | TextStyle
}

const InputLabel = ({ name, label, control, password, styles, multiline, required, numeric, email }: Props) => {
    const { formState: { errors } } = useController({
        control,
        name
    })

    const handleKeyboardType = (): KeyboardTypeOptions | undefined => {
        if(numeric){
            return 'numeric'
        }
        if(email){
            return 'email-address'
        }
        return 'default'
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required
            }}
            render={({ field }) => (
                <View style={{width: '100%', ...styles}}>
                    { errors[name] && <Text style={internStyles.error}>{'*Este campo es requerido'}</Text>}
                    <Text style={[labelStyle]}>{label}</Text>
                    <TextInput 
                        value={field.value}
                        onChangeText={field.onChange}
                        style={input}
                        placeholder={label}
                        secureTextEntry={password}
                        multiline={multiline}
                        numberOfLines={multiline ? 4 : 1}
                        keyboardType={handleKeyboardType()}
                    />
                </View>
            )}
        />
            
    )
}

export default InputLabel

const internStyles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: 'bold'
    }
})

