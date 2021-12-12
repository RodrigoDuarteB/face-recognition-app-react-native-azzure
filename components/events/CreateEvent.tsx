import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { container } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import Content from '../Content'
import InputLabel from '../InputLabel'
import PhotographerBadge from './PhotographerBadge'

const CreateEvent = ({ route, navigation }: any) => {
    const params: any = route.params
    const { control } = useForm()

    return (
        <Content auth styles={container}>
            <Text>{ params && params.edit ? 'Editar Evento' : 'Crear Evento'}</Text>
            <Center>
                <InputLabel 
                    name='name'
                    label='Nombre'
                    control={control}
                />
                <InputLabel 
                    name='description'
                    label='Descripcion'
                    control={control}
                />

                <Text>Fotografos</Text>
                
                <ScrollView style={{width: '100%', marginVertical: 15}}>
                    <PhotographerBadge />
                    <PhotographerBadge />
                    <PhotographerBadge />
                    <PhotographerBadge />
                    <PhotographerBadge />
                    <PhotographerBadge />
                    <PhotographerBadge />
                    <PhotographerBadge />
                </ScrollView>

                <Button 
                    title={ params && params.edit ? 'Editar Evento' : 'Crear Evento'}
                    onPress={() => {}}
                />
            </Center>
        </Content>
    )
}

export default CreateEvent

const styles = StyleSheet.create({})
