import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Center from '../components/Center'

const Loading = () => {
    return (
        <Center>
            <ActivityIndicator size="large" color="#00ff00"/>
        </Center>
    )
}

export default Loading

const styles = StyleSheet.create({})
