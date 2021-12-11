import React from 'react'
import { StyleSheet, Modal, ScrollView, ViewStyle, View } from 'react-native'
import { colors } from '../global.styles'

export interface ModalProps {
    visible: boolean
    children?: any
    styles?: ViewStyle
    onRequestClose?: () => any
}

const ModalContent = ({ visible, children, styles, onRequestClose }: ModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            style={internStyles.container}
            animationType='slide'
            onRequestClose={onRequestClose}
        >
            <View style={[internStyles.container, styles]}>
                <ScrollView style={internStyles.contentContainer}>
                    {children}
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ModalContent

const internStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000040',
        padding: 30
    },
    contentContainer: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 15,
        elevation: 10
    }
})
