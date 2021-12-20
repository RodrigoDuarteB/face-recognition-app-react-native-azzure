import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ImageStyle, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    uri: string
    style?: ImageStyle,
    deleteIcon?: boolean
    onDelete?: (...params: any[]) => any
}

const ImageModal = ({ uri, style, deleteIcon, onDelete }: Props) => {
    const [zooming, setZooming] = useState(false)

    return (
        <View style={styles.container}>
            <Modal
                visible={zooming}
                transparent={true}
                onRequestClose={() => setZooming(false)}
                animationType='slide'
            >   
                <View style={styles.modalImageContainer}>
                    <Image 
                        source={{uri}}
                        style={{height: '100%', width: '100%'}}
                        resizeMode='contain'
                    />
                </View>
            </Modal>

            { deleteIcon && 
                <TouchableOpacity
                    onPress={onDelete}
                >
                    <MaterialIcons name='delete' size={30} color={'white'}/>
                </TouchableOpacity>
            }

            <TouchableOpacity
                onPress={() => setZooming(true)}
            >
                <Image
                    source={{uri}}
                    style={style ? style : {}}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ImageModal

const styles = StyleSheet.create({
    modalImageContainer: {
        padding: 20,
        backgroundColor: '#00000040'
    },
    container: {
        flexDirection: 'row'
    }
})
