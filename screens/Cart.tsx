import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Button from '../components/Button'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'

interface Props {
    cartItems: any[]
    removeItemFromCart: (item: any) => any
    cleanCart: () => any
}

const Cart = ({ cartItems, cleanCart, removeItemFromCart }: Props) => {
    return (
        <Content auth>
            <Center>
                <ConditionalRender condition={cartItems.length > 0}>
                    
                        {
                            cartItems.map(e => 
                                <TouchableOpacity style={{padding: 10}} onPress={() => removeItemFromCart(e)}>
                                    <Text>{e.user.id}</Text>
                                </TouchableOpacity>
                            )
                        }
                    
                </ConditionalRender>
                <Button 
                    title='Limpiar Carro'
                    onPress={() => cleanCart()}
                />
            </Center>
        </Content>
    )
}

const mapStateToProps = (state: any[]) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeItemFromCart: (item: any) => dispatch({
            type: 'REMOVE',
            payload: item
        }),
        cleanCart: () => dispatch({
            type: 'CLEAN'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

const styles = StyleSheet.create({})
