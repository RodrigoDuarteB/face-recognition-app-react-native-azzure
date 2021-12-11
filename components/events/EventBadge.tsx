import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../global.styles'
import Center from '../Center'

interface Props {
    data: any
}

const EventBadge = ({ data }: Props) => {
    const { title, date, photos, appears } = data

    const navigation: any = useNavigation()

    return (
        <TouchableOpacity style={styles.eventCard}
            onPress={() => navigation.navigate('Event', data)}
        >
            <Center>
                <Text>{title}</Text>
                <View style={styles.flex}>
                    <Text>Fecha: {date}</Text>
                    <Text>Fotos: {photos}</Text>
                </View>
                <Text>Fotos en las que apareces: {appears}</Text>
            </Center>
        </TouchableOpacity>
    )
}

export default EventBadge

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: colors.secondaryLight,
        height: 100,
        borderRadius: 20
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
