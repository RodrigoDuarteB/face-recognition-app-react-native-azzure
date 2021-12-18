import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, container } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import Content from '../Content'
import ModalImageEvent from './ModalImageEvent'
import { MaterialIcons } from '@expo/vector-icons'
import RoundedButton from '../RoundedButton'
import { usePreventScreenCapture } from 'expo-screen-capture'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Event as ModelEvent } from '../../models/Event'
import ConditionalRender from '../ConditionalRender'
import Fallback from '../Fallback'

const Event = ({ route, navigation }: any): JSX.Element => {
    usePreventScreenCapture()
    const { title, date, photos, description, createdBy }: ModelEvent = route.params
    console.log(route.params)
    const [user] = useAuthState(getAuth())
    const [viewing, setViewing] = useState(false)
    
    const isCreator = user!.uid == createdBy

    return (
        <Content styles={container} cart auth>
            <ModalImageEvent 
                visible={viewing}	
                onRequestClose={() => setViewing(false)}
                data={route.params}
            />
            <Center>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

                <View style={styles.flex}>
                    <Text style={[styles.title, {fontSize: 18}]}>
                        Fotos en las que Apareces: {0}
                    </Text>
                    {
                        isCreator && <RoundedButton 
                            onPress={() => navigation.navigate('CreateEvent', {
                                edit: true
                            })}
                            icon={<MaterialIcons name='edit' size={30}/>}
                        />   
                    }
                </View>
                
                <ConditionalRender condition={photos && photos.length > 0}
                    fallback={<Fallback message='Aún no hay fotos en este evento'/>}
                >
                    <ScrollView contentContainerStyle={styles.imagesContainer} 
                    style={{marginVertical: 15}}>  
                        <TouchableOpacity style={styles.imageContainer}
                            onPress={() => setViewing(true)}
                        ></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}></TouchableOpacity>
                    </ScrollView>
                </ConditionalRender>

                <Button 
                    title="Comprar Todas"
                    onPress={() => {}}
                    textColor="white"
                />
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
        backgroundColor: colors.secondaryLight,
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
