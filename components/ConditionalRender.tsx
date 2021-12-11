import React, { Fragment } from 'react'
import { View } from 'react-native'

const ConditionalRender = ({condition, children }: {condition: boolean, children: any}) => {
    return condition ? (
        children
    ) : <Fragment />
}

export default ConditionalRender

