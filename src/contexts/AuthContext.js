import React, { createContext, useReducer, useEffect } from 'react';
import {AuthReducer} from 'reducers';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
 
    const [auth, dispatch] = useReducer(AuthReducer,{},()=>{
        const localData = localStorage.getItem('auth');
        return localData ? JSON.parse(localData) : { user: {}};
    })
    useEffect(() => {
        console.log('aaaaaaa')
        localStorage.setItem('auth', JSON.stringify(auth));
    }) 

    return (
        <AuthContext.Provider value={{auth, dispatch}}>
            {props.children}
        </AuthContext.Provider >
    );

}
 
export default AuthContextProvider;