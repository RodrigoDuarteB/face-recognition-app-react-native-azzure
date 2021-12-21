import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Button from '../components/Button'
import Center from '../components/Center'
import Content from '../components/Content'
import { detect } from '../services/FaceRecognitionService'

const Testing = () => {
    const [ready, setReady] = useState('')

    useEffect(() => {
        detect('https://firebasestorage.googleapis.com/v0/b/events-photos-574f5.appspot.com/o/user-images%2Fpo7gGdTFqrTizjTBNQjETXBdemL2%2FScreenshot_20211218_225806_com.instagram.android.jpg?alt=media&token=7ae6ba24-ebd7-42bd-99df-f0338e2ee50e')
        .then(res => console.log(res))
        .catch(e => console.log(e))
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
