import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../global.styles'
import { Event } from '../../models/Event'
import Center from '../Center'

interface Props {
    data: Event,
    contract?: boolean
}

const EventBadge = ({ data, contract }: Props) => {
    const { title, date, photos } = data

    const navigation: any = useNavigation()

    return (
        <TouchableOpacity style={styles.eventCard}
            onPress={() => navigation.navigate('Event', data)}
        >
            <Center>
                <Text style={styles.text}>{title}</Text>
                <View style={styles.flex}>
                    <Text style={styles.text}>Fecha: {date.toLocaleDateString()}</Text>
                    <Text style={styles.text}>Fotos: {photos!.length}</Text>
                </View>
                { !contract && <Text style={styles.text}>Fotos en las que apareces: {0}</Text>}
            </Center>
        </TouchableOpacity>
    )
}

export default EventBadge

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: colors.secondaryLight,
        height: 100,
        borderRadius: 20,
        marginVertical: 5
    },
    flex: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})
