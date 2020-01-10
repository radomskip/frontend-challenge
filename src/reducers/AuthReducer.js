import {generateId} from '../modules/product/helper'

export const AuthReducer = (state, action) => {
   
    switch(action.type) {
        case 'DO_LOGIN' :
            debugger
            const obj = Object.assign({}, state,{'name':action.value.name})
            return obj
        case 'DO_LOGOUT' :
            return Object.assign({}, state,{'name':null}) // TODO erase directly name
        default :
            return state
    }
}