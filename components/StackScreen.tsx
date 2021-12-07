import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase.config'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../screens/Loading'

const Stack = createNativeStackNavigator()

const StackScreen = (props: any) => {

    const [user, setUser] = useState<auth.User | null>()
    const [ready, setReady] = useState(false)
    

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(auth.getAuth(), user => {
            setUser(user)
            setReady(true)
        })
        return unsuscribe
    }, [])

    return ready ? (
        <Stack.Screen {...props}/>
    ) : <Loading />
}

export default StackScreen
