import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, container, input, label, title } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import Content from '../Content'
import InputLabel from '../InputLabel'
import PhotographerBadge from './PhotographerBadge'
import DateTimePicker from '@react-native-community/datetimepicker'
import ConditionalRender from '../ConditionalRender'
import { saveEvent } from '../../services/EventService'
import { currentUser } from '../../services/AuthService'
import { getPhotographers } from '../../services/UserService'
import { Photographer } from '../../models/Photographer'
import Loading from '../Loading'

const CreateEvent = ({ route, navigation }: any) => {
    const [fetching, setFetching] = useState(false)
    const [photographers, setPhotographers] = useState<Photographer[]>([])
    const [date, setDate] = useState(new Date())
    const [picking, setPicking] = useState(false)
    const [saving, setSaving] = useState(false)
    const params: any = route.params
    const { control, handleSubmit } = useForm({
        defaultValues: {
            date,
            photographers: []
        }
    })

    useEffect(() => {
        setFetching(true)
        getPhotographers()
        .then(res => {
            setPhotographers(res)
            setFetching(false)
        })
    }, [])

    const onChangeDate = (event: any, date?: Date) => {
        setPicking(!picking)
        setDate(date!)
    }

    const save = (data: any) => {
        if(params && params.edit){
            //update
        }else{
            //register
            setSaving(true)
            saveEvent({
                title: data.title,
                description: data.description,
                date,
                createdBy: currentUser!.uid,
                photographers: data.photographers
            })
            .then(_ => {
                setSaving(false)
                navigation.replace('Events')
            })
            .catch(e => {
                setSaving(false)
                alert(e)
            })
            alert(JSON.stringify(data))
        }
    }

    return (
        <ConditionalRender condition={!fetching} fallback={<Loading />}>
            <Content auth styles={container}>
                <Text style={title}>{ params && params.edit ? 'Editar Evento' : 'Crear Evento'}</Text>
                <Center>
                    <InputLabel 
                        name='title'
                        label='Nombre'
                        control={control}
                        styles={{marginVertical: 15}}
                    />

                    <InputLabel 
                        name='description'
                        label='Descripcion'
                        control={control}
                        styles={{marginBottom: 15}}
                        multiline
                    />

                    <Text style={[label, {width: '100%'}]}>Fecha</Text>
                    <TouchableOpacity 
                        style={[input, {width: '100%', marginBottom: 15}]} 
                        onPress={() => setPicking(!picking)}
                    >
                        <Text style={styles.date}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    <ConditionalRender condition={picking}>
                        <DateTimePicker
                            value={date}
                            display="default"
                            onChange={onChangeDate} 
                        />
                    </ConditionalRender>

                    <Text style={[label, {fontSize: 20}]}>Fotógrafos</Text>
                    
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
                        onPress={handleSubmit(save)}
                    />
                </Center>
            </Content>
        </ConditionalRender>
    )
}

export default CreateEvent

const styles = StyleSheet.create({
    date: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    }
})
