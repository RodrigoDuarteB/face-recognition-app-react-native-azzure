import React, { useEffect, useState } from 'react'

interface Props {
    promise: Promise<any>
    onLoading: React.ReactNode
    receive: (params: any) => any
    children?: any
}

const FutureRender = ({ promise, onLoading, receive, children }: Props) => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        promise.then(res => {
            receive(res)
            setReady(true)
        })
    }, [])

    return ready ? children : onLoading
}

export default FutureRender

