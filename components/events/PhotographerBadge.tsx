import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../global.styles'
import Center from '../Center'

const PhotographerBadge = () => {

    return (
        <TouchableOpacity style={styles.eventCard}
            onPress={() => {}}
        >
            <Center>
                <Text>Nombre: </Text>
                <Text>Precio por/hora: </Text>
                <Text>Precio por Foto Digital: </Text>
                <Text>Precio por Foto Impresa: </Text>
            </Center>
        </TouchableOpacity>
    )
}

export default PhotographerBadge

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: colors.secondaryLight,
        height: 100,
        borderRadius: 20,
        margin: 8
    }
})
