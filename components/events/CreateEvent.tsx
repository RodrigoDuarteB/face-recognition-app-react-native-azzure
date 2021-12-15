import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { container } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import Content from '../Content'
import InputLabel from '../InputLabel'
import PhotographerBadge from './PhotographerBadge'
import DateTimePicker from '@react-native-community/datetimepicker'
import ConditionalRender from '../ConditionalRender'

const CreateEvent = ({ route, navigation }: any) => {
    const [date, setDate] = useState(new Date())
    const [picking, setPicking] = useState(false)
    const params: any = route.params
    const { control } = useForm()

    return (
        <Content auth styles={container}>
            <Text>{ params && params.edit ? 'Editar Evento' : 'Crear Evento'}</Text>
            <Center>
                <InputLabel 
                    name='title'
                    label='Nombre'
                    control={control}
                />
                <InputLabel 
                    name='description'
                    label='Descripcion'
                    control={control}
                />

                    <Button 
                        title="Fecha"
                        onPress={() => setPicking(!picking)}
                    />
                <ConditionalRender condition={picking}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        is24Hour={true}
                        display="default"
                        onChange={() => {}} 
                    />
                </ConditionalRender>

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
