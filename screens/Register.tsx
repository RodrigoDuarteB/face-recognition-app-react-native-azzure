import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Switch, Alert } from 'react-native'
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
import { onAuthStateChanges, register } from '../services/AuthService'
import Loading from '../components/Loading'
import ImageModal from '../components/ImageModal'
import { usePermissions } from 'expo-media-library'
import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker'

const Register = ({ navigation }: any) => {
    const [status, requestPermissions] = usePermissions()
    const [ready, setReady] = useState(false)
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

    useEffect(() => {
        setReady(true)
        const unsuscribe = onAuthStateChanges(user => {
            if(user){
                navigation.replace('Home')
            }
        })
        setReady(false)
        return unsuscribe
    }, [])

    const updatePhotos = () => {
        setSelectMedia(false)
        const controllerPhotos = getValues('photos')
        const filtered = controllerPhotos.filter((photo, index) => 
        controllerPhotos.indexOf(photo) === index)
        setPhotos(filtered)
    }

    const save = (data: any) => {
        if(photos.length >= 2){
            setSaving(true)
            register({
                name: data.name,
                email: data.email,
                password: data.password,
                photos,
                photographer: data.photographer ? {
                    contractCost: data.contractCost,
                    digitalCost: data.digitalCost,
                    printedCost: data.printedCost
                } : undefined
            })
            .catch(e => {
                setSaving(false)
                Alert.alert('Errores', e)
            })
        }else{
            Alert.alert('Fotos', 'Debes subir dos fotos de perfil donde se vea bien tu rostro')
        }
    }

    return (
        <ConditionalRender condition={!ready} fallback={<Loading />}>
            <Content>
                <ModalLoading visible={saving}/>
                <ModalMediaSelector 
                    control={control} 
                    visible={selectMedia}
                    onCancel={updatePhotos}
                    onAccept={updatePhotos}
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
                            name='name'
                            label="Nombre"
                            control={control}
                            required
                        />   
                        
                        <InputLabel 
                            name='email'
                            label="Email"
                            control={control}
                            styles={{marginTop: 15}}
                            required
                            email
                        />   
                        
                        <InputLabel 
                            name='password'
                            label="Contraseña"
                            control={control}
                            styles={{marginTop: 15}}
                            password
                            required
                        />   

                        <Text style={[styles.label, {width: '100%', marginTop: 15}]}>Fotos</Text>

                        <ConditionalRender condition={photos.length == 0}>
                            <View style={{width: '100%'}}>            
                                <TouchableOpacity
                                    style={styles.buttonImage}
                                    onPress={() => setSelectMedia(true)}
                                >
                                    <Center>
                                        <MaterialIcons name='add' size={30} color={colors.secondaryLight}/>
                                    </Center>
                                </TouchableOpacity>
                            </View>  
                        </ConditionalRender>

                        <ConditionalRender condition={photos.length > 0}>
                            <ScrollView horizontal style={{marginVertical: 10}}>
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
                            <Button 
                                title='Añadir Más'
                                onPress={() => setSelectMedia(true)}
                                styles={{marginBottom: 10}}
                            />
                        </ConditionalRender>

                        <Text style={styles.photoText}>
                            *Añade al menos dos fotos donde tu rostro se vea bien
                        </Text>
                        
                        
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
                                name='contractCost'
                                label="Costo por Contrato"
                                control={control}
                                styles={{marginTop: 15}}
                                required
                                numeric
                            />

                            <InputLabel 
                                name='digitalCost'
                                label="Costo Digital por Foto"
                                control={control}
                                styles={{marginTop: 15}}
                                required
                                numeric
                            />

                            <InputLabel 
                                name='printedCost'
                                label="Costo Impreso por Foto"
                                control={control}
                                styles={{marginVertical: 15}}
                                required
                                numeric
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
        </ConditionalRender>
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
    },
    imageContainer: {
        width: 120, 
        height: 120,
        margin: 10
    }
})
