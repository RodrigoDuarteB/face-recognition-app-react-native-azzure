import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Center from '../components/Center'
import Content from '../components/Content'
import ModalLoading from '../components/ModalLoading'
import { auth } from '../firebase.config'
import { colors } from '../global.styles'

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
        <Content>
            <ModalLoading visible={loading}/>
            <Center>
                <TouchableOpacity
                        onPress={logout}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </Center>
        </Content>
    )
}

export default Profile

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        width: 150
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})
