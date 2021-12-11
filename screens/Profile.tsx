import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import Content from '../components/Content'
import ModalLoading from '../components/ModalLoading'
import { auth } from '../firebase.config'

const Profile = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false)

    const logout = () => {
        setLoading(true)
        auth.signOut(auth.getAuth())
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
        <Content auth>
            <ModalLoading visible={loading}/>
            <Center>
                <Button 
                    onPress={logout}
                    title="Cerrar Sesion"
                />
            </Center>
        </Content>
    )
}

export default Profile

const styles = StyleSheet.create({})
