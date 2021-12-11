import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { AssetsSelector } from 'expo-images-picker'
import { MaterialIcons } from '@expo/vector-icons'
import { MediaType } from 'expo-media-library'
import { colors } from '../global.styles'
import { useController } from 'react-hook-form'

const MediaSelector = ({ controller, route, navigation: { goBack } }: any) => {

    const { control } = route.params

    const { field } = useController({
        name: 'photos',
        control: controller ? controller : control,
        defaultValue: []
    })

    const onSuccess = (data: any) => {
        data.map((photo: any) => {
            field.value.push(photo.uri)
        })
        goBack()
    }

    const onBack = () => {
        goBack()
    }
    
    const widgetSettings = useMemo(
        () => ({
            getImageMetaData: false,
            initialLoad: 100,
            assetsType: [MediaType.photo],
            minSelection: 1,
            maxSelection: 3,
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
          onBack,
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
        <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
        />
    )
}

export default MediaSelector

const styles = StyleSheet.create({})
