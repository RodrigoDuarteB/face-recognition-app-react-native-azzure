import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Fallback from '../components/Fallback'
import Loading from '../components/Loading'
import { useAuth } from '../context/Auth.context'
import { Purchase } from '../models/Purchase'
import { getUserPurchases } from '../services/PurchaseService'

const Purchases = () => {
    const [fetching, setFetching] = useState(false)
    const [purchases, setPurchases] = useState<Array<Purchase>>([])
    const { user } = useAuth()

    useEffect(() => {
        setFetching(true)
        getUserPurchases(user?.id!)
        .then(res => {
            setPurchases(res)
        })
        .finally(() => setFetching(false))
        
    }, [])

    return (
        <Content cart auth>
            <ConditionalRender condition={!fetching}
                fallback={<Loading />}
            >
                <ConditionalRender
                    condition={purchases.length > 0}
                    fallback={<Fallback message='Aun no tienes compras registradas'/>}
                >
                    {
                        purchases.map((purchase, index) =>
                            <></>
                        )
                    }
                </ConditionalRender>
            </ConditionalRender>
        </Content>
    )
}

export default Purchases

const styles = StyleSheet.create({})
