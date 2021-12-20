import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import ImageModal from '../components/ImageModal'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import StaticInputLabel from '../components/StaticInputLabel'
import { container, title } from '../global.styles'
import { Image } from '../models/Photo'
import { User } from '../models/User'
import { logout as logoutService } from '../services/AuthService'
import { getUser, removeUserImage } from '../services/UserService'

const Profile = ({ navigation }: any) => {
    const [authUser] = useAuthState(getAuth())
    const [user, setUser] = useState<User | null>()
    const [userPhotos, setUserPhotos] = useState<Array<Image>>([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        setFetching(true)
        getUser(authUser!.uid)
        .then(res => {
            setUser(res)
            setFetching(false)
        })
        .catch(e => {
            setFetching(false)
        })
    }, [])
        

    const logout = async () => {
        setLoading(true)    
        logoutService()
        .then(_ => {
            setLoading(false)
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            })
        })
        .catch(e => {
            setLoading(false)
            ToastAndroid.show('Ocurrió un error, intente mas tarde', ToastAndroid.SHORT)
        })      
    }


    const removeImage = (image: Image) => {
        setLoading(true)
        removeUserImage(user!.id!, image.path)
        .then(_ => {
            setLoading(false)
            ToastAndroid.show('Se eliminó correctamente', ToastAndroid.SHORT)
        })
        .catch(e => {
            setLoading(true)
            ToastAndroid.show('No se pudo eliminar, intente mas tarde', ToastAndroid.SHORT)
        })
    }

    return (
        <ConditionalRender condition={!fetching} fallback={<Loading />}>
            <Content auth styles={container}>
                <ModalLoading visible={loading}/>
                <Center>
                    <Text style={title}>Mi Perfil</Text>

                    <StaticInputLabel value={user ? user.name : ''} label='Nombre' styles={{marginVertical: 5}}/>
                    <StaticInputLabel value={user ? user.email : ''} label='Email' styles={{marginVertical: 5}}/>

                    <Text style={title}>Fotos de Perfil</Text>
                    <ScrollView horizontal style={{marginTop: 5}}>
                        {
                            userPhotos.map((photo, index) => 
                                <ImageModal 
                                    key={index}
                                    uri={photo.uri}
                                    style={styles.image}
                                    deleteIcon
                                    onDelete={() => removeImage(photo)}
                                />
                            )
                        }
                    </ScrollView>
                    
                    <Button 
                        onPress={logout}
                        title="Cerrar Sesion"
                    />
                </Center>
            </Content>
        </ConditionalRender>
    )
}

export default Profile

const styles = StyleSheet.create({
    image: {
        width: 120, 
        height: 120,
        margin: 10
    }
})
