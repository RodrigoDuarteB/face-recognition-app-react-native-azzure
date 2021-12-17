import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Center from './Center'
import { colors } from '../global.styles'
import { connect } from 'react-redux';

interface Props {
    cartItems: Array<any>
}

const CartButton = ({ cartItems }: Props) => {
    const navigation: any = useNavigation()

    return (
        <TouchableOpacity 
            style={styles.floatButton}
            onPress={() => navigation.navigate('Cart')}
        >
            <Center>
                <Text>{cartItems.length}</Text>
                <MaterialIcons name="shopping-cart" size={30} color='black'/>
            </Center>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state: any[]) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps)(CartButton)

const styles = StyleSheet.create({
    floatButton: {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: colors.primaryDark,                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        shadowColor: colors.secondaryLight,
        shadowOpacity: 0.8,
        elevation: 7,
        shadowRadius: 15 ,
        shadowOffset : { width: 56, height: 13},
        borderWidth:0,
    }
})
