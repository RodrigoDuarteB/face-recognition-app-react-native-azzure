import { CartItem } from '../models/Purchase'

const cartItems = (state: Array<CartItem> = [], action: any) => {
    switch (action.type){
        case 'ADD':
            return [...state, action.payload]
        case 'ADD_ALL':
            return [...state, ...action.payload]
        case 'REMOVE':
            return state.filter(item => item.photo.path !== action.payload.photo.path)
        case 'CLEAN': 
            return []
    }
    return state
}

export default cartItems