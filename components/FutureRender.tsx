import React, { useEffect, useState } from 'react'

interface Props {
    promise: Promise<any>
    loading: React.ReactNode
    receive: (params: any) => any
    children?: any
}

const FutureRender = ({ promise, loading, receive, children }: Props) => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        promise.then( async res => {
            const data = await res.json()
            receive(data)
            setReady(true)
        })
    }, [])

    return ready ? children : loading
}

export default FutureRender

