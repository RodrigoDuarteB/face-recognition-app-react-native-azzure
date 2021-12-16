import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../global.styles'
import { Photographer } from '../../models/Photographer'
import Center from '../Center'

interface Props {
    data: Photographer
    onPress: (params: any) => any
}

const PhotographerBadge = ({ data, onPress }: Props) => {
    const [selected, setSelected] = useState(false)

    const pressed = () => {
        setSelected(!selected)
        onPress(data.user?.id)
    }
 
    return (
        <TouchableOpacity style={[styles.eventCard, selected ? styles.selected : {}]}
            onPress={pressed}
        >
            <Center>
                <Text style={styles.text}>Nombre: {data.user?.name}</Text>
                <Text style={styles.text}>Precio de Contrato: {data.contractCost}</Text>
                <Text style={styles.text}>Precio por Foto Digital: {data.digitalCost}</Text>
                <Text style={styles.text}>Precio por Foto Impresa: {data.printedCost}</Text>
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
    },
    selected: {
        borderColor: colors.primaryDark,
        borderWidth: 3
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})
