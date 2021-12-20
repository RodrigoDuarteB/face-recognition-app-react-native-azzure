import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageStyle, TouchableOpacity, Modal } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { colors, title } from '../global.styles';

interface Props {
    uri: string
    style?: ImageStyle,
    deleteIcon?: boolean
    onDelete?: (...params: any[]) => any 
    preview?: boolean
}

const ImageModal = ({ uri, style, deleteIcon, onDelete, preview }: Props) => {
    const [zooming, setZooming] = useState(false)
    const [count, setCount] = useState(15)

    useEffect(() => {
        if (preview && zooming){
            if(count > 0){
                setTimeout(() => {
                    setCount(count - 1)
                }, 1000)
            }else{
                setZooming(false)
                setCount(15)
            }
        }
    }, [zooming, count])

    return (
        <View style={styles.container}>
            <Modal
                visible={zooming}
                transparent={true}
                onRequestClose={() => setZooming(false)}
                animationType='slide'
            >   
                <View style={styles.modalImageContainer}>
                    { preview && 
                        <Text style={[title, {alignSelf: 'center', backgroundColor: colors.secondary, padding: 5}]}>
                            Previsualizando: {count}
                        </Text>
                    }
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
                    style={{alignSelf: 'flex-end'}}
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
        
    }
})
