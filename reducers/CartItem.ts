import { CartItem } from '../models/Purchase'

const initial: CartItem = {
    photo: {
        uri: '',
        path: '',
        event: {
            createdBy: '',
            date: new Date(),
            description: '',
            title: 'Evento Prueba',
            photos: [],
            photographers: []
        },
        photographer: {
            contractCost: 350,
            digitalCost: 20,
            printedCost: 50
        }
    }
}

const initial2: CartItem = {
    photo: {
        uri: '',
        path: '',
        event: {
            createdBy: '',
            date: new Date(),
            description: '',
            title: 'Evento Prueba',
            photos: [],
            photographers: []
        },
        photographer: {
            contractCost: 350,
            digitalCost: 20,
            printedCost: 50
        }
    }
}

const cartItems = (state: Array<CartItem> = [initial], action: any) => {
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