import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { colors, container } from '../../global.styles'
import Button from '../Button'
import Center from '../Center'
import Content from '../Content'

const Event = ({ route, navigation }: any) => {
    const { title, date, photos, appears, description } = route.params
    
    return (
        <Content styles={container}>
            <Center>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={[styles.title, {fontSize: 18}]}>
                    Fotos en las que Apareces: {appears}
                </Text>
                
                <ScrollView contentContainerStyle={styles.imagesContainer} 
                style={{marginVertical: 15}}>  
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
                    <View style={styles.imageContainer}></View>
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
        height: 100,
        width: 100,
        margin: 10
    }
})
