import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyleSheet, Text } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import { User } from '../models/User'
import { logout as logoutService } from '../services/AuthService'
import { getUser } from '../services/UserService'

const Profile = ({ navigation }: any) => {
    const [authUser] = useAuthState(getAuth())
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        console.log(authUser)
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
            <Content auth>
                <ModalLoading visible={loading}/>
                <Center>
                    <Text>{user?.name}</Text>
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

const styles = StyleSheet.create({})
