import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Fallback from '../components/Fallback'
import Loading from '../components/Loading'

const Notifications = () => {
    const [fetching, setFetching] = useState(false)
    const [notifications, setNotifications] = useState([])

    return (
        <Content cart auth>
            <ConditionalRender
                condition={!fetching}
                fallback={<Loading />}
            >
                <ConditionalRender
                    condition={notifications.length > 0}
                    fallback={<Fallback message='No tienes notificaciones'/>}
                >

                </ConditionalRender>
            </ConditionalRender>
        </Content>
    )
}

export default Notifications

const styles = StyleSheet.create({})
