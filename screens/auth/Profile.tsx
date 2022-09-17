import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native'
import Button from '../../components/Button'
import Center from '../../components/Center'
import Content from '../../components/Content'
import ImageModal from '../../components/ImageModal'
import ModalLoading from '../../components/ModalLoading'
import StaticInputLabel from '../../components/StaticInputLabel'
import { useAuth } from '../../context/Auth.context'
import { container, title } from '../../global.styles'
import { logout } from '../../services/AuthService'

const Profile = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useAuth()        

    const signOut = async () => {
        setLoading(true)    
        logout()
        .then(_ => {
            setUser(null)
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            })
        })
        .catch(e => {
            ToastAndroid.show('Ocurrió un error, intente mas tarde', ToastAndroid.SHORT)
        })     
        .finally(() => {
            setLoading(false)
        }) 
    }

    return (
        <Content auth styles={container}>
            <ModalLoading visible={loading}/>
            <Center>
                <Text style={title}>Mi Perfil</Text>

                <StaticInputLabel value={user ? user.name : ''} label='Nombre' styles={{marginVertical: 5}}/>
                <StaticInputLabel value={user ? user.email : ''} label='Email' styles={{marginVertical: 5}}/>

                <Text style={title}>Fotos de Perfil</Text>
                <ScrollView horizontal style={{marginTop: 5}}>
                    {
                        user && user.photos.map((photo, index) => 
                            <ImageModal 
                                key={index}
                                uri={photo}
                                style={styles.image}
                            />
                        )
                    }
                </ScrollView>
                
                <Button 
                    onPress={signOut}
                    title="Cerrar Sesion"
                />
            </Center>
        </Content>
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
