import {generateId} from '../modules/product/helper'

export const ProductReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT' : 
            action.product.id = generateId()
            return [...state, action.product]
        case 'UPDATE_PRODUCT' :
            return state.map(product => {
                if (product.id == action.product.id)
                    return action.product;
                else
                    return product;    
            })
        case 'REMOVE_PRODUCT' :
            return state.filter(product => product.id !== action.id)
        default :
            return state
    }
}