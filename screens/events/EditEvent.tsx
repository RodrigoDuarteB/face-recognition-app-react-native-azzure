import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, Text } from 'react-native'
import AddPhotosButton from '../../components/AddPhotosButton'
import Button from '../../components/Button'
import Center from '../../components/Center'
import ConditionalRender from '../../components/ConditionalRender'
import Content from '../../components/Content'
import ImageModal from '../../components/ImageModal'
import ModalLoading from '../../components/ModalLoading'
import ModalMediaSelector from '../../components/ModalMediaSelector'
import StaticInputLabel from '../../components/StaticInputLabel'
import { useAuth } from '../../context/Auth.context'
import { container, title as globalTitle } from '../../global.styles'
import { Event } from '../../models/Event'
import { saveEventPhotos } from '../../services/EventService'

const EditEvent = ({ route, navigation }: any) => {
    const { id, title, date, description, createdBy, photographers }: Event = route.params
    const [photos, setPhotos] = useState([])
    const [selecting, setSelecting] = useState(false)
    const [saving, setSaving] = useState(false)
    const { user } = useAuth()
    const { control, getValues } = useForm({
        defaultValues: {
            photos: []
        }
    }) 

    const photographer = photographers.filter(ph => ph.user?.id === user?.id)[0]

    const save = () => {
        if(photos.length > 0){
            setSaving(true)
            saveEventPhotos(id!, photographer, photos)
            .then(_ => {
                setSaving(false)
                navigation.goBack()
            })
            .catch(e => {
                setSaving(false)
                console.log(e)
            })
        }else{
            Alert.alert('Errores', 'Debe subir al menos una foto al evento')
        }
    }

    const updatePhotos = () => {
        setSelecting(false)
        const controllerPhotos = getValues('photos')
        const filtered = controllerPhotos.filter((photo, index) => 
        controllerPhotos.indexOf(photo) === index)
        setPhotos(filtered)
    }

    return (
        <Content auth styles={container}>
            <ModalLoading 
                visible={saving}
            />
            <ModalMediaSelector 
                visible={selecting}
                control={control}
                onAccept={updatePhotos}
                onCancel={updatePhotos}
                maxSelection={50}
            />
            <Center>
                <Text style={globalTitle}>Editar Evento</Text>

                <StaticInputLabel 
                    label='Titulo'
                    value={title}
                />

                <StaticInputLabel 
                    label='Descripción'
                    value={description}
                    lines={3}
                />

                <StaticInputLabel 
                    label='Fecha'
                    value={date.toLocaleDateString()}
                />

                <Text style={globalTitle}>Subir Fotos</Text>

                <ConditionalRender condition={photos.length > 0}>
                    <Button 
                        title='Añadir Más'
                        onPress={() => setSelecting(true)}
                    />
                </ConditionalRender>

                <ScrollView contentContainerStyle={styles.imagesContainer}
                    style={{marginVertical: 10}}
                >
                    <ConditionalRender condition={photos.length > 0}
                        fallback={<AddPhotosButton onPress={() => setSelecting(true)}/>}
                    >
                        {
                            photos.map((photo, index) =>
                                <ImageModal 
                                    key={index}
                                    uri={photo}
                                    style={{height: 120, width: 120, margin: 7}}
                                />
                            )
                        }
                            
                    </ConditionalRender>
                </ScrollView>
                <Button 
                    title='Guardar'
                    onPress={save}
                />
            </Center>
        </Content>
    )
}

export default EditEvent

const styles = StyleSheet.create({
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
})
