import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyleSheet, Text, View } from 'react-native'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Fallback from '../components/Fallback'
import Loading from '../components/Loading'
import { Purchase } from '../models/Purchase'
import { getUserPurchases } from '../services/PurchaseService'

const Purchases = () => {
    const [user] = useAuthState(getAuth())
    const [fetching, setFetching] = useState(false)
    const [purchases, setPurchases] = useState<Array<Purchase>>([])

    useEffect(() => {
        setFetching(true)
        getUserPurchases(user!.uid)
        .then(res => {
            setPurchases(res)
            setFetching(false)
        })
        .catch(e => setFetching(false))
        
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
