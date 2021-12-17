const cartItems = (state: any[] = [], action: any) => {
    switch (action.type){
        case 'ADD':
            return [...state, action.payload]
        case 'REMOVE':
            return state.filter(item => item.id !== action.payload.id)
        case 'CLEAN': 
            return []
    }
    return state
}

export default cartItems