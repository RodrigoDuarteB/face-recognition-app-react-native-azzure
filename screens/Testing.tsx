import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import Content from '../components/Content'
import { test } from '../services/FaceRecognitionService'

const Testing = () => {
    const [ready, setReady] = useState('')

    useEffect(() => {
        test()
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <Content>
            <Center>
                <Text>{ready}</Text>
                <Button 
                    title="DO"
                    onPress={() => {}} 
                />
            </Center>
        </Content>
    )
}

export default Testing
