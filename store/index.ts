import { createStore } from 'redux'
import cartItems from '../reducers/CartItem'

const store = createStore(cartItems)

export default store