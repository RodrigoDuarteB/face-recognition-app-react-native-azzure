import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Switch, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Logo from '../components/Logo'
import ModalLoading from '../components/ModalLoading'
import { colors, container } from '../global.styles'
import { useForm, Controller } from 'react-hook-form'
import InputLabel from '../components/InputLabel'
import { MaterialIcons } from '@expo/vector-icons'
import Button from '../components/Button'
import ModalMediaSelector from '../components/ModalMediaSelector'


const Register = ({ navigation }: any) => {
    const [selectMedia, setSelectMedia] = useState(false)
    const [photos, setPhotos] = useState([])
    const [saving, setSaving] = useState(false)
    const { control, handleSubmit, formState: { dirtyFields }, getValues } = useForm({
        defaultValues: {
            nombre: '',
            photographer: false,
            photos: []
        }
    })

    const save = (data: any) => {
        alert(JSON.stringify(data))
    }

    return (
        <Content>
            <ModalMediaSelector 
                control={control} 
                visible={selectMedia}
                onCancel={() => setSelectMedia(false)}
                onAccept={() => {
                    setSelectMedia(false)
                    setPhotos(getValues('photos'))
                }}
            />
            <ModalLoading visible={saving}/>
            
            {/* logo */}
            <View style={styles.logo}>
                <Logo />
            </View>

            
            {/* form */}
            <ScrollView style={[container, {marginTop: 5, paddingHorizontal: 50}]}>
                <Center horizontal>
                    <InputLabel 
                        name='nombre'
                        label="Name"
                        control={control}
                    />   
                    
                    <InputLabel 
                        name='email'
                        label="Email"
                        control={control}
                        styles={{marginTop: 15}}
                    />   
                    
                    <InputLabel 
                        name='contraseña'
                        label="Contraseña"
                        control={control}
                        styles={{marginTop: 15}}
                    />   

                     <View style={{marginTop: 15}}>
                        <Text style={styles.label}>Fotos</Text>
                        <TouchableOpacity
                            style={styles.buttonImage}
                            onPress={() => setSelectMedia(true)}
                        >
                            <Center>
                                <MaterialIcons name='add' size={30} color={colors.secondaryLight}/>
                            </Center>
                        </TouchableOpacity>
                        <Text style={styles.photoText}>
                            *Añade al menos dos fotos donde tu rostro se vea bien
                        </Text>
                    </View>  

                    <ConditionalRender condition={photos.length > 0}>
                        <ScrollView horizontal>
                            {
                                photos.map((photo, index) => 
                                    <Image key={index} source={{uri: photo}} width={100} height={100}/>
                                )
                            }   
                        </ScrollView>
                    </ConditionalRender>
                    
                    <View style={styles.switchContainer}>
                        <Controller
                            control={control}
                            name='photographer'
                            render={({ field: { onChange, onBlur, value } }) => 
                                <Switch 
                                    trackColor={{ false: colors.secondaryLight, true: colors.secondaryLight }}
                                    thumbColor={value ? colors.primaryDark : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={onChange}
                                    value={value}
                                />
                            }
                        />
                        
                        <Text style={styles.question}>Soy Fotógrafo</Text>
                    </View>

                    <ConditionalRender condition={dirtyFields.photographer!}>
                        <Text style={styles.photoText}>*Los eventos podrán contrarte</Text>
                        <InputLabel 
                            name='costo_por_contrato'
                            label="Costo por Contrato"
                            control={control}
                            styles={{marginTop: 15}}
                        />

                        <InputLabel 
                            name='costo_digital'
                            label="Costo Digital por Foto"
                            control={control}
                            styles={{marginTop: 15}}
                        />

                        <InputLabel 
                            name='costo_impreso'
                            label="Costo Impreso por Foto"
                            control={control}
                            styles={{marginVertical: 15}}
                        />
                    </ConditionalRender>

                    <Button 
                        title="Registrarse"
                        onPress={handleSubmit(save)}
                        textColor="black"
                        color={colors.primaryDark}
                        styles={{marginBottom: 30, marginTop: 20}}
                    />
                </Center>
            </ScrollView>
        </Content>
    )
}

export default Register

const styles = StyleSheet.create({
    question: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5
    },
    logo: {
        alignItems: 'center',
        marginTop: 50
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonImage: {
        height: 100,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 10,
        marginTop: 5
    },
    photoText: {
        color: colors.secondaryLight,
        fontSize: 14,
        fontWeight: 'bold'
    },
    imagesContainer: {
        flexDirection: 'row',
        height: 500
    }
})
