export const AuthReducer = (state, action) => {

    const {user} = action
   
    switch(action.type) {
        case 'DO_LOGIN' :
            const obj = Object.assign({}, state, {user})
            return obj
        case 'DO_LOGOUT' :
            return Object.assign({}, state,{'user':null}) // TODO erase directly name
        default :
            return {...state}
    }
}