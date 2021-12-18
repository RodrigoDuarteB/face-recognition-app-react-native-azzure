import { getAuth } from 'firebase/auth'
import { where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { View, Text } from 'react-native'
import { getAllDataFromCollection, getDataFromCollectionWithQueries } from '../services/Service'
import { getUser } from '../services/UserService'

const Testing = () => {
    const [user] = useAuthState(getAuth())

    useEffect(() => {
        alert(JSON.stringify(user!.uid))
        getUser(user!.uid)
        .then(res => {
            //alert(res.length)
            alert(JSON.stringify(res))
        })
        .catch(e => alert(e))
    }, [])

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Testing
