export const ProductReducer = (state, action) => {
    switch(action.type) {
        case 'REMOVE_PRODUCT' :
            return state.filter(product => product.id !== action.id)
        default :
            return state
    }
}