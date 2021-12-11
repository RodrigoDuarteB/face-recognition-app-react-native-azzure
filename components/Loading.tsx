import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'
import Center from './Center'
import Content from './Content'
import { colors } from '../global.styles'

const Loading = ({safe}: any) => {
    return safe ? (
        <Content safe>
            <Center>
                <ActivityIndicator size={60} color={colors.primary}/>
            </Center>
        </Content>
    ) : (
        <Content>
            <Center>
                <ActivityIndicator size={60} color={colors.primary}/>
            </Center>
        </Content>
    )
}

export default Loading
