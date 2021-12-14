import React, { Fragment } from 'react'

interface Props {
    condition: boolean
    children?: any
    fallback?: React.ReactNode
}

const ConditionalRender = ({condition, children, fallback }: Props) => {
    return condition ? (
        children
    ) : fallback ? fallback : <Fragment />
}

export default ConditionalRender

