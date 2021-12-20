import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Fallback from '../components/Fallback'
import Loading from '../components/Loading'

const Photos = () => {
    const [fetching, setFetching] = useState(false)
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <Content cart auth>
            <ConditionalRender
                condition={!fetching}
                fallback={<Loading />}
            >
                <ConditionalRender
                    condition={photos.length > 0}
                    fallback={<Fallback message='Aun no tienes fotos compradas'/>}
                >
                    
                </ConditionalRender>
            </ConditionalRender>
        </Content>
    )
}

export default Photos

const styles = StyleSheet.create({})
