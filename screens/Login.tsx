import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Center from '../components/Center'
import Content from '../components/Content'
import Logo from '../components/Logo'
import { auth } from '../firebase.config'
import { colors, container } from '../global.styles'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import { useForm } from 'react-hook-form'
import InputLabel from '../components/InputLabel'

const Login = ({ navigation }: any) => {
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(auth.getAuth(), user => {
            if(user){
                navigation.replace('Home')
            }
            setReady(true)
        })
        return unsubscribe
    }, [])

    const register = () => {
        navigation.navigate('Register')
    }

    const login = ({ email, contraseña }: {email: string, contraseña: string}) => {
        setLoading(true)
        auth.signInWithEmailAndPassword(auth.getAuth(), email, contraseña)
        .then(user => {
            console.log(user.user.email)
        })
        .catch(e => {
            setLoading(false)
            alert(e)
        }) 

    }

    return ready ? (
        <Content>
            <ModalLoading visible={loading}/>
            {/* logo */}
            <View style={styles.logo}>
                <Logo />
            </View>

            
            {/* form */}
            <Center horizontal styles={{...container, paddingHorizontal: 50}}>
                <InputLabel
                    name='email'
                    label='Email'
                    control={control}
                />

                <InputLabel
                    name='contraseña'
                    label='Contraseña'
                    control={control}
                    styles={{marginTop: 15}}
                    password
                />

                <TouchableOpacity
                    onPress={handleSubmit(login)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.question}>¿No estás registrado?</Text>

                <TouchableOpacity
                    onPress={register}
                    style={{...styles.button, backgroundColor: colors.primaryDark, marginTop: 25}}
                >
                    <Text style={{...styles.buttonText, color: 'black'}}>Registrarse</Text>
                </TouchableOpacity>
            </Center>
        </Content>
    ) : <Loading />
}

export default Login

const styles = StyleSheet.create({
    question: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 50
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        width: 150,
        marginTop: 50
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    logo: {
        alignItems: 'center',
        marginTop: 50
    }
});
