import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
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

const Event = ({ route, navigation }: any): JSX.Element => {
    usePreventScreenCapture()
    const [user] = useAuthState(getAuth())
    const { title, photos, description, photographers }: ModelEvent = route.params
    
    const isPhotographer = photographers.includes(user!.uid) 

    return (
        <Content styles={container} cart={!isPhotographer} auth>
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
                <ConditionalRender condition={photos.length > 0}
                    fallback={<Fallback message='Aún no hay fotos en este evento'/>}
                >
                    <ScrollView contentContainerStyle={styles.imagesContainer} 
                    style={{marginVertical: 15}}>  
                        {
                            photos.map((photo, index) => 
                                <ImageModal 
                                    key={index}
                                    uri={photo}
                                    style={styles.imageContainer}
                                />
                            )
                        }
                    </ScrollView>
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
