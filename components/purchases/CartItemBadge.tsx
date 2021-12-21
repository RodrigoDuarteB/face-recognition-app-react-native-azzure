import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../global.styles'
import { CartItem } from '../../models/Purchase'

interface Props {
    data: CartItem
    onPress: (...params: Array<any>) => any
}

const CartItemBadge = ({ data : { photo }, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.badge}
            onPress={onPress}
        >
            <Text>{photo.event.title}</Text>
            <Text>{photo.photographer.digitalCost}</Text>
            <Text>{photo.photographer.printedCost}</Text>
        </TouchableOpacity>
    )
}

export default CartItemBadge

const styles = StyleSheet.create({
    badge: {
        backgroundColor: colors.secondaryLight,
        height: '100%',
        borderRadius: 20,
        marginVertical: 5, 
        padding: 15
    },
})
