import { MediaType, usePermissions, requestPermissionsAsync } from 'expo-media-library'
import React, { useEffect, useMemo } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { colors } from '../global.styles'
import { MaterialIcons } from '@expo/vector-icons'
import { AssetsSelector } from 'expo-images-picker'
import { Control, useController } from 'react-hook-form'
import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker'

interface Props {
    control: Control<any, object>
    visible: boolean
    minSelection?: number
    maxSelection?: number
    onCancel: () => any
    onAccept: () => any
}

const ModalMediaSelector = ({ control, visible, onCancel, onAccept, minSelection, maxSelection }: Props) => {
    const [status, requestPermission] = usePermissions()  
    
    useEffect(() => {
        requestMediaLibraryPermissionsAsync()
        .then(res => {})
    }, [])
    
    const { field } = useController({
        name: 'photos',
        control,
        defaultValue: []
    })

    const onSuccess = (data: any) => {
        data.map((photo: any) => {
            field.value.push(photo.uri)
        })
        onAccept()
    }

    const widgetSettings = useMemo(
        () => ({
            getImageMetaData: false,
            initialLoad: 150,
            assetsType: [MediaType.photo],
            minSelection: minSelection ? minSelection : 1,
            maxSelection: maxSelection ? maxSelection : 2,
            portraitCols: 4,
            landscapeCols: 4,
        }),[]
    )

    const widgetErrors = useMemo(
        () => ({
            errorTextColor: 'black',
            errorMessages: {
                hasErrorWithPermissions: 'Permission errors',
                hasErrorWithLoading: 'loading',
                hasErrorWithResizing: 'rezising',
                hasNoAssets: 'has no assets',
            },
        }), []
    )

    const widgetNavigator = useMemo(
        () => ({
          Texts: {
            finish: 'Elegir',
            back: 'Cancelar',
            selected: 'Seleccionados',
          },
          midTextColor: 'white',
          minSelection: 1,
          buttonTextStyle: {color: 'white'},
          buttonStyle: {
            backgroundColor: colors.primary,
            borderRadius: 10,
          },
          onBack: () => onCancel(),
          onSuccess: (e: any) => onSuccess(e),
        }),[]
    )

    const widgetStyles = useMemo(
        () => ({
            margin: 2,
            bgColor: colors.secondaryDark,
            spinnerColor: colors.primary,
            widgetWidth: 99,
            videoIcon: {
                Component: MaterialIcons,
                iconName: 'videocam',
                color: 'black',
                size: 20,
            },
            selectedIcon: {
                Component: MaterialIcons,
                iconName: 'check',
                color: colors.primaryDark,
                bg: colors.secondary,
                size: 30,
            },
        }),
        []
    )
    
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType='slide'
        >
            <View style={styles.modalBackground}>
                <AssetsSelector
                    Settings={widgetSettings}
                    Errors={widgetErrors}
                    Styles={widgetStyles}
                    Navigator={widgetNavigator}
                />
            </View>
        </Modal>
    )
}

export default ModalMediaSelector

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
        padding: 15
    },
})
