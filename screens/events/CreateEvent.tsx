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
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { connect } from 'react-redux'
import Fallback from '../../components/Fallback'
import ModalLoading from '../../components/ModalLoading'

const CreateEvent = ({ navigation, addItemToCart }: any) => {
    const [user] = useAuthState(getAuth())
    const [fetching, setFetching] = useState(false)
    const [photographers, setPhotographers] = useState<Photographer[]>([])
    const [date, setDate] = useState(new Date())
    const [picking, setPicking] = useState(false)
    const [saving, setSaving] = useState(false)
    const [choosed, setChoosed] = useState<string[]>([])
    const { control, handleSubmit, getValues } = useForm({
        defaultValues: {
            date,
            photographers: []
        }
    })

    useEffect(() => {
        setFetching(true)
        getPhotographers()
        .then(res => {
            setPhotographers(res.filter(ph => ph.user?.id != user?.uid))
            setFetching(false)
        })
    }, [])


    const addPhotographers = (id: string) => {
        if(choosed.includes(id)){
            setChoosed(choosed.filter((e) => e != id))
        }else{
            choosed.push(id)
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
                createdBy: user!.uid,
                photographers: choosed,
                photos: []
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
                                        onPress={(id) => {
                                            addPhotographers(id)
                                            addItemToCart(ph)
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItemToCart: (item: any) => dispatch({
            type: 'ADD',
            payload: item
        })
    }
}

export default connect(null, mapDispatchToProps)(CreateEvent)

const styles = StyleSheet.create({
    date: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    }
})