import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { colors, container, title as globalTitle } from '../../global.styles'
import Button from '../../components/Button'
import Center from '../../components/Center'
import Content from '../../components/Content'
import { MaterialIcons } from '@expo/vector-icons'
import RoundedButton from '../../components/RoundedButton'
import { usePreventScreenCapture } from 'expo-screen-capture'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Event as ModelEvent } from '../../models/Event'
import ConditionalRender from '../../components/ConditionalRender'
import Fallback from '../../components/Fallback'
import ImageModal from '../../components/ImageModal'
import { getEventPhotos, removeEventPhoto } from '../../services/EventService'
import { Photo } from '../../models/Photo'
import Loading from '../../components/Loading'
import ModalLoading from '../../components/ModalLoading'

const Event = ({ route, navigation }: any): JSX.Element => {
    usePreventScreenCapture()
    const { id, title, description, photographers, createdBy }: ModelEvent = route.params
    const [user] = useAuthState(getAuth())
    const [eventPhotos, setEventPhotos] = useState<Array<Photo>>([])
    const [fetching, setFetching] = useState(false)
    const [deleting, setDeleting] = useState(false)
    
    const isOwner = user!.uid == createdBy
    const isPhotographer = photographers.filter(ph => ph.user?.id == user?.uid).length > 0

    const fetchData = async () => {
        setEventPhotos(await getEventPhotos(id!))
    }

    useEffect(() => {     
        const unsuscribe = navigation.addListener('focus', () => { 
            setFetching(true)
            fetchData()
            .then(res => {
                setFetching(false)
            })
            .catch(e => {
                setFetching(false)
                ToastAndroid.show('No se pudo traer las imagenes', ToastAndroid.SHORT)
            })
        })
        return unsuscribe
    }, [deleting, navigation])


    const removePhoto = (photo: Photo) => {
        setDeleting(true)
        removeEventPhoto(photo)
        .then(_ => {
            setDeleting(false)
            ToastAndroid.show('Se eliminó correctamente', ToastAndroid.SHORT)
        })
        .catch(e => {
            setDeleting(false)
            ToastAndroid.show('No se pudo eliminar la imagen', ToastAndroid.SHORT)
        })
    }

    return (
        <Content styles={container} cart={!isPhotographer} auth>
            <ModalLoading visible={deleting}/>
            <Center>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

                <View style={styles.flex}>
                    <Text style={[styles.title, {fontSize: 18}]}>
                        { !isPhotographer && `Fotos en las que Apareces: ${0}`}
                    </Text>
                    {
                        isPhotographer && 
                        <RoundedButton 
                            onPress={() => navigation.navigate('EditEvent', route.params)}
                            icon={<MaterialIcons name='edit' size={30}/>}
                        />   
                    }
                </View>
                
                <Text style={globalTitle}>Fotos del Evento</Text>
                <ConditionalRender
                    condition={!fetching}
                    fallback={<Loading />}
                >
                    <ConditionalRender condition={eventPhotos.length > 0}
                        fallback={<Fallback message='Aún no hay fotos en este evento'/>}
                    >
                        <ScrollView contentContainerStyle={styles.imagesContainer} 
                        style={{marginVertical: 15}}>  
                            {
                                eventPhotos.map((photo, index) => 
                                    <ImageModal 
                                        key={index}
                                        uri={photo.uri!}
                                        style={styles.imageContainer}
                                        preview={!isOwner && !isPhotographer}
                                        deleteIcon={isOwner || isPhotographer}
                                        onDelete={() => removePhoto(photo)}
                                    />
                                )
                            }
                        </ScrollView>
                    </ConditionalRender>
                </ConditionalRender>

                { !isPhotographer && <Button 
                    title="Comprar Todas"
                    onPress={() => {}}
                    textColor="white"
                />}
            </Center>
        </Content>
    )
}

export default Event

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    description: {  
        color: colors.secondaryLight,
        fontSize: 20
    }, 
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    imageContainer: {
        height: 120,
        width: 120,
        margin: 7
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    }
})
