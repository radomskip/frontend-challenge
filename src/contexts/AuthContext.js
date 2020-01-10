import React, { createContext, useReducer, useEffect } from 'react';
import {AuthReducer} from 'reducers';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
 
    const [auth, dispatch] = useReducer(AuthReducer,{},()=>{
        const localData = localStorage.getItem('auth');
        return localData ? JSON.parse(localData) :{};
    })
    debugger
    useEffect(() => {
        debugger
        localStorage.setItem('auth', JSON.stringify(auth));
    }) 

    return (
        <AuthContext.Provider value={{auth, dispatch}}>
            {props.children}
        </AuthContext.Provider >
    );

}
 
export {AuthContext, AuthContextProvider};