import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import Button from '../components/Button'
import Center from '../components/Center'
import ConditionalRender from '../components/ConditionalRender'
import Content from '../components/Content'
import Fallback from '../components/Fallback'
import CartItemBadge from '../components/purchases/CartItemBadge'
import { container, title } from '../global.styles'
import { CartItem } from '../models/Purchase'

interface Props {
    cartItems: Array<CartItem>
    removeItemFromCart: (item: CartItem) => any
    cleanCart: () => any
}

const Cart = ({ cartItems, cleanCart, removeItemFromCart }: Props) => {
    return (
        <Content auth styles={container}>
            <Center>
                <Text style={title}>Carrito</Text>
                <ScrollView style={{width: '100%'}}>
                    <ConditionalRender condition={cartItems.length > 0}
                        fallback={<Fallback message='No hay items en el carrito'/>}
                    >
                        {
                            cartItems.map((item, index) => 
                                <CartItemBadge 
                                    key={index}
                                    data={item}
                                    onPress={() => removeItemFromCart(item)}
                                />
                            )
                        }
                        
                    </ConditionalRender>
                </ScrollView>
                <Button 
                    title='Limpiar Carro'
                    onPress={() => cleanCart()}
                    styles={{ marginVertical: 10 }}
                />
            </Center>
        </Content>
    )
}

const mapStateToProps = (state: Array<CartItem>) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeItemFromCart: (item: CartItem) => dispatch({
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
