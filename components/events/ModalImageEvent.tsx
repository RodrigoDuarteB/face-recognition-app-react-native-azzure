import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import ModalContent from '../ModalContent'
import { ModalProps } from '../ModalContent'

interface Props extends ModalProps {
    data?: any
}

const ModalImageEvent = ({ visible, onRequestClose, data }: Props) => {
    const [counter, setCounter] = useState(15)
    const { title, date, photos, appears, description } = data

    useEffect(() => {
        visible && counter > 0 && setTimeout(() => {
            setCounter(counter - 1)
        }, 1000)
    }, [visible, counter])

    return (
        <ModalContent
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <Center>
                <Text style={styles.title}>{title}</Text>
                <Text style={[styles.title, {fontSize: 18}]}>Vista Previa: {counter}</Text>
                <View style={[styles.imageContainer, {backgroundColor: counter > 0 ? colors.secondaryDark : 'black' }]}>
                    
                </View>
                <Button 
                    title="Añadir al Carro"
                    onPress={() => {}}
                />
            </Center>
        </ModalContent>
    )
}

export default ModalImageEvent

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: colors.secondaryDark,
        height: 300,
        width: '100%',
        marginBottom: 20
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
})
