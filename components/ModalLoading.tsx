import React from 'react'
import { Modal, StyleSheet, View, ActivityIndicator } from 'react-native'
import { colors } from '../global.styles'

const ModalLoading = ({visible}: {visible: boolean}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size={60} color={colors.primary}/>
                </View>
            </View>
        </Modal>
    )
}

export default ModalLoading

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
