import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, container } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import Content from '../Content'
import ModalContent from '../ModalContent'
import ModalImageEvent from './ModalImageEvent'

const Event = ({ route, navigation }: any) => {
    const { title, date, photos, appears, description } = route.params
    const [viewing, setViewing] = useState(false)

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
                <Text style={[styles.title, {fontSize: 18}]}>
                    Fotos en las que Apareces: {appears}
                </Text>
                
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

                <Button 
                    title="Comprar Todas"
                    onPress={() => null}
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
    }
})
