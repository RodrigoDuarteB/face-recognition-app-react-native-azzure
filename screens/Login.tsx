import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Center from '../components/Center'
import Content from '../components/Content'
import Logo from '../components/Logo'
import { colors, container } from '../global.styles'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import { useForm } from 'react-hook-form'
import InputLabel from '../components/InputLabel'
import Button from '../components/Button'
import { login as loginService, onAuthStateChanges } from '../services/AuthService'
import ConditionalRender from '../components/ConditionalRender'

const Login = ({ navigation }: any) => {
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm()

    useEffect(() => {
        const unsubscribe = onAuthStateChanges(user => {
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

    const login = ({ email, password }: {email: string, password: string}) => {
        setLoading(true)
        loginService(email, password)
        .catch(e => {
            setLoading(false)
            alert(e)
        })
    }

    return (
        <ConditionalRender condition={ready} fallback={<Loading />}>
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
                        required
                        email
                    />

                    <InputLabel
                        name='password'
                        label='Contraseña'
                        control={control}
                        styles={{marginTop: 15}}
                        password
                        required
                    />

                    <Button 
                        title="Login"
                        onPress={handleSubmit(login)}
                        textColor="white"
                        styles={{marginTop: 50, marginBottom: 20}}
                    />

                    <Text style={styles.question}>¿No estás registrado?</Text>

                    <Button 
                        title="Registrarse"
                        onPress={register}
                        textColor="black"
                        color={colors.primaryDark}
                        styles={{marginTop: 20}}
                    />
                </Center>
            </Content>
        </ConditionalRender>
    ) 
}

export default Login

const styles = StyleSheet.create({
    question: {
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        alignItems: 'center',
        marginTop: 50
    }
})
