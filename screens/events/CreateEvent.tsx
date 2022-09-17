import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { container, input, label, title } from '../../global.styles'
import Button from '../../components/Button'
import Center from '../../components/Center'
import Content from '../../components/Content'
import InputLabel from '../../components/InputLabel'
import PhotographerBadge from '../../components/events/PhotographerBadge'
import DateTimePicker from '@react-native-community/datetimepicker'
import ConditionalRender from '../../components/ConditionalRender'
import { saveEvent } from '../../services/EventService'
import { getPhotographers } from '../../services/UserService'
import { Photographer } from '../../models/Photographer'
import Loading from '../../components/Loading'
import Fallback from '../../components/Fallback'
import ModalLoading from '../../components/ModalLoading'
import { useAuth } from '../../context/Auth.context'

const CreateEvent = ({ navigation, addItemToCart }: any) => {
    const [fetching, setFetching] = useState(false)
    const [photographers, setPhotographers] = useState<Photographer[]>([])
    const [date, setDate] = useState(new Date())
    const [picking, setPicking] = useState(false)
    const [saving, setSaving] = useState(false)
    const [choosed, setChoosed] = useState<Photographer[]>([])
    const { control, handleSubmit, getValues } = useForm()
    const { user } = useAuth()
 
    useEffect(() => {
        setFetching(true)
        getPhotographers()
        .then(res => {
            setPhotographers(res.filter(ph => ph.user?.id !== user?.uid))
            setFetching(false)
        })
    }, [])


    const addPhotographers = (ph: Photographer) => {
        const alreadyExists = choosed.filter(pg => pg.user?.id == ph.user?.id).length > 0
        if(!alreadyExists) {
            choosed.push(ph)
        }
    }

    const onChangeDate = (event: any, date?: Date) => {
        if(date){
            setDate(date!)
        }
        setPicking(!picking)
    }

    const save = (data: any) => {
        if(choosed.length > 0){
            setSaving(true)
            saveEvent({
                title: data.title,
                description: data.description,
                date,
                createdBy: user?.id!,
                photographers: choosed
            })
            .then(_ => {
                setSaving(false)
                navigation.replace('Home')
            })
            .catch(e => {
                setSaving(false)
                alert(e)
            })
        }else{
            Alert.alert('Elegir fotógrafos', 'Debes contratar al menos a un fotógrafo para tu evento')
        }
        
    }

    return (
        <ConditionalRender condition={!fetching} fallback={<Loading />}>
            <Content auth cart styles={container}>
                <ModalLoading 
                    visible={saving}
                />
                <Text style={title}>Crear Evento</Text>
                <Center>
                    <InputLabel 
                        name='title'
                        label='Titulo'
                        control={control}
                        styles={{marginVertical: 15}}
                        required
                    />

                    <InputLabel 
                        name='description'
                        label='Descripcion'
                        control={control}
                        styles={{marginBottom: 15}}
                        multiline
                        required
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
                        <ConditionalRender condition={photographers.length > 0}
                            fallback={
                                <Fallback message='No hay fotógrafos disponibles'/>
                            }
                        >
                            {
                                photographers.sort((a, b) => a.contractCost - b.contractCost)
                                .map(ph => 
                                    <PhotographerBadge 
                                        key={ph.user!.id} 
                                        data={ph}
                                        onPress={() => {
                                            addPhotographers(ph)
                                        }}
                                    />
                                )
                            }
                        </ConditionalRender>
                    </ScrollView>

                    <Button 
                        title='Crear Evento'
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
