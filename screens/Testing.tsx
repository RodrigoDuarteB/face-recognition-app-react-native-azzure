import { getAuth } from 'firebase/auth'
import { where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { View, Text } from 'react-native'
import { getAllDataFromCollection, getDataFromCollectionWithQueries, getImageUrl } from '../services/Service'
import { getUser } from '../services/UserService'

const Testing = () => {
    const [user] = useAuthState(getAuth())

    useEffect(() => {
        getImageUrl('event-images', 'WIvojsiTYvg3cRXuN1QF/1.PNG')
        .then(res => {
            //alert(res.length)
            alert(res)
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
