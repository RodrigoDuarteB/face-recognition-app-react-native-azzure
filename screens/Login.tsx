import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase.config'
import Loading from './Loading'

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ready, setReady] = useState(false)

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
        auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
        .then(user => {
            console.log(user.user.email)
        })
        .catch(e => alert(e))
    }

    const login = () => {
        auth.signInWithEmailAndPassword(auth.getAuth(), email, password)
        .then(user => {
            console.log(user.user.email)
        })
        .catch(e => alert(e))
    }

    return ready ? (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={pass => setPassword(pass)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={login}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={register}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity> 
            </View>
        </KeyboardAvoidingView>
    ) : <Loading />
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16
    }
});
