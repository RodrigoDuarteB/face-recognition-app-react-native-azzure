import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import { container } from '../global.styles'
import { User } from '../models/User'
import { logout as logoutService } from '../services/AuthService'
import { getUser } from '../services/UserService'

const Profile = ({ navigation }: any) => {
    const [authUser] = useAuthState(getAuth())
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const { control } = useForm({
        defaultValues: {
            name: user ? user.name : ''
        }
    })

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
                    <Text>Perfil</Text>
                    <ScrollView horizontal>
                        {
                            user && user.photos.map(photo => 
                                <Image source={{uri: photo}} style={styles.image}/>
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
