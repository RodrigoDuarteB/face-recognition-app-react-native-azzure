import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import StaticInputLabel from '../components/StaticInputLabel'
import { container, title } from '../global.styles'
import { User } from '../models/User'
import { logout as logoutService } from '../services/AuthService'
import { getUser } from '../services/UserService'

const Profile = ({ navigation }: any) => {
    const [authUser] = useAuthState(getAuth())
    const [user, setUser] = useState<User | null>()
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
            });
        })
        .catch(e => {
            setLoading(false)
            alert(e.message)
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

                    <ScrollView horizontal>
                        {
                            user && user.photos.map((photo, index) => 
                                <Image key={index} source={{uri: photo}} style={styles.image}/>
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
