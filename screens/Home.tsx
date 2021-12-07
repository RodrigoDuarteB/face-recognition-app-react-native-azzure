import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { auth } from '../firebase.config'

const Home = ({ navigation }: any) => {

    const signOut = () => {
        auth.signOut(auth.getAuth()) 
        .then(() => {
            navigation.navigate('Login')
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text>Home: {auth.getAuth().currentUser?.email}</Text>
            <TouchableOpacity style={styles.button}
                onPress={signOut}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0782f9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
});
