import React, { useState, useEffect, useContext } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ProductContext } from 'contexts';
import { Grid } from 'components/grid';
import { Dropzone } from 'components/dropzone';
import { InputGroup, Editor, InputGroupCurrencyIcon } from 'components/input';
import { Button } from 'components/button';

const ProductForm = (props) => {

  const emptyState = {
    images: [],
    name: '',
    description: '',
    promotionalPrice: '',
    price: '',
    stock: ''
  };

  const [inputValidation, setInputValidation] = useState({
    name: false,
    description: false,
    price: false,
    stock: false,
    promotionalPrice: false
  });

  const [product, setProduct] = useState(emptyState);
  //const [inputValidation] = useState()
  const {products, dispatch} = useContext(ProductContext);  

  const inputChange = e => {
    const { value, name } = e.target;
    onChange(name, value);
  }

  const onChange = (name, value) => {

    const invalid = (isEmpty(value) || value === '<p></p>');

    setProduct(Object.assign({}, product, { [name]:value } ));
    setInputValidation(Object.assign({}, inputValidation, { [name]:invalid }));

  }

  const backToListing = () => {
    props.history.push('/products') 
  }

  const validateForm = () => {

    const state = Object.assign({}, inputValidation);
    let validate = true;

    for(var key in state) {
      if(state.hasOwnProperty(key)) {
        const invalid = (isEmpty(product[key]) || product[key] === '<p></p>');
        state[key] = invalid;
        if(invalid) {
          validate = false
        }
      }
    }

    setInputValidation(state);
    return validate;
  }

  const actionProduct = ( type, validation = true ) => {
    if (validation && !validateForm() ) {
      alert('Debe completar todos los datos');
    } else {
      dispatch({type, product});
      backToListing()
    }
  }
  
  const deleteProduct = () => {
      actionProduct('REMOVE_PRODUCT', false)
  }
  
  const renderActionButtons = () => {
    const { id } = product;
    if(id) {
      return (
        <React.Fragment>
          <Button size="small" onClick={()=> actionProduct('UPDATE_PRODUCT') }>SAVE UPDATES</Button>
          <Button size="small" onClick={deleteProduct} type="danger" className="ml--lg">REMOVE</Button>
          <Button size="small" onClick={()=> backToListing()} className="ml--lg" outline>CANCEL</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Button size="small" onClick={()=> actionProduct('ADD_PRODUCT') }>SAVE PRODUCT</Button>
          <Button size="small" onClick={()=> backToListing()} className="ml--lg" outline>CANCEL</Button>
        </React.Fragment>
      )
    }
  }
  
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      const product = products.filter((p)=>p.id==id)[0];
      setProduct(product);
    }
  },[]);

  const dropImage = (param) => {
      console.log(param);
  };

  const { id, description, name, price, stock, promotionalPrice, images } = product;

  return (
    <div>
      <Grid transparent className='image--selection'>
        <label>Fotos dos seus produtos</label>
        <div className='col-1-4'>
          <Dropzone value={images[0]} index={0} onDrop={(e) => dropImage(e)}/>
        </div>
        <div className='col-1-4'>
          <Dropzone value={images[1]} index={1} onDrop={(e) => dropImage(e)}/>
        </div>
        <div className='col-1-4'>
          <Dropzone value={images[2]} index={2} onDrop={(e) => dropImage(e)}/>
        </div>
        <div className='col-1-4'>
          <Dropzone value={images[3]} index={3} onDrop={(e) => dropImage(e)}/>
        </div>
      </Grid>

      <Grid block>
        <div>
          <InputGroup value={name} validate={inputValidation} onChange={(e) => inputChange(e)} label="Name" name="name" placeholder="Ex: Chaveiro de plástico de Budha"/>
          <Editor value={description} validate={inputValidation} onChange={(name, value) => onChange(name, value)} label="Description" name="description"/> 
        </div>

      </Grid>


      <Grid block>
      <div className="col-1-4">
          <InputGroupCurrencyIcon validate={inputValidation} value={price} onChange={(e) => inputChange(e)} name="price" label="Original Price" icon="$" placeholder="0,00"/>
        </div>

        <div className="col-1-4">
          <InputGroupCurrencyIcon validate={inputValidation} value={promotionalPrice} onChange={(e) => inputChange(e)} name="promotionalPrice" label="Promocional Price" icon="$" placeholder="0,00"/>
        </div>
        
        <div className="col-1-4">
          <InputGroup validate={inputValidation} value={stock} onChange={(e) => inputChange(e)} type="number" name="stock" label="Stock"/>
        </div>
      </Grid>

      <Grid transparent nopadding className="mt--lg">
        {renderActionButtons()}
      </Grid>
    </div>
  )

}

export default ProductForm;