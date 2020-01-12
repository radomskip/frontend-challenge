import React, { useState, useContext } from 'react';
import { AuthContext } from 'contexts';
import { InputGroup } from 'components/input';
import { Button } from 'components/button';
import isEmpty from 'lodash/isEmpty';

const LoginForm = (props) => {

    const [inputValidation, setInputValidation] = useState({
        name: false,
        pass: false
    });

    const [user, setUser] = useState({
        name: '',
        pass: ''
    });

    const {dispatch} = useContext(AuthContext);  

    const inputChange = e => {
        const { value, name } = e.target;
        onChange(name, value);
    }

    const onChange = (name, value) => {

        const invalid = (isEmpty(value));
    
        setUser(Object.assign({}, user, { [name]:value } ));
        setInputValidation(Object.assign({}, inputValidation, { [name]:invalid }));
    
    }

    const validateForm = () => {

        const state = Object.assign({}, inputValidation);
        let validate = true;
    
        for(var key in state) {
          if(state.hasOwnProperty(key)) {
            const invalid = (isEmpty(user[key]));
            state[key] = invalid;
            if(invalid) {
              validate = false
            }
          }
        }
    
        setInputValidation(state);
        return validate;
      }

    const goToProducts  = () => {
        props.history.push('/products') 
    }

    const simulateLogin = () => {
        if (!validateForm() ) {
            alert('Debe completar todos los datos');
        } else {
            const any = dispatch({type: 'DO_LOGIN', user});
            setTimeout(goToProducts, 500);
        }
    }
        
      
    return ( 
        
        <div>
            <InputGroup value={user.name} validate={inputValidation} onChange={(e) => inputChange(e)} label="Nombre" name="name" placeholder="Nombre"/>
            <InputGroup value={user.pass} validate={inputValidation} onChange={(e) => inputChange(e)} label="Contraseña" name="pass" placeholder="Contraseña"/>
            <Button size="small" onClick={simulateLogin}>Ingresar</Button>
        </div>

       
    );


}
 
export default LoginForm;