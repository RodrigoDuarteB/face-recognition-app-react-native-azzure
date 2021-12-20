import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Center from './Center'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../global.styles'
import { Props } from '../global.functions'

interface IProps extends Props {
    onPress: () => any
}

const AddPhotosButton = ({ onPress, styles }: IProps) => {
    return (
        <TouchableOpacity
            style={[internStyles.buttonImage, styles]}
            onPress={onPress}
        >
            <Center>
                <MaterialIcons name='add' size={30} color={colors.secondaryLight}/>
            </Center>
        </TouchableOpacity>
    )
}

export default AddPhotosButton

const internStyles = StyleSheet.create({
    buttonImage: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 10,
        marginTop: 5
    }
})
