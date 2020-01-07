import React, { useState, useEffect, useContext } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ProductContext } from 'contexts';
import { Grid } from 'components/grid';
import { Dropzone } from 'components/dropzone';
import { InputGroup, Editor, InputGroupCurrencyIcon } from 'components/input';
import { Button } from 'components/button';

const ProductForm = (props) => {

  const emptyState = {
    inputValidation: {
      name: false,
      description: false,
      price: false,
      stock: false
    },
    images: [],
    name: '',
    description: '',
    promotionalPrice: '',
    price: '',
    stock: ''
  };

  const [product, setProduct] = useState(emptyState);
  const {products, dispatch} = useContext(ProductContext);  

  const inputChange = e => {
    const { value, name } = e.target;
    onChange(name, value);
  }

  const onChange = (name, value) => {
    product[name] = value;
    setProduct(Object.assign({}, product));
  }

  const backToListing = () => {
    props.history.push('/products') 
  }

  const validateForm = () => {

    const state = product;
    let validate = true;

    for(var key in state.inputValidation) {
      if(state.inputValidation.hasOwnProperty(key)) {
        const invalid = (isEmpty(state[key]) || state[key] === '<p></p>');
    
        state.inputValidation[key] = invalid;

        if(invalid) {
          validate = false
        }
      }
    }

    setProduct(state);
    return validate;
  }

  const renderActionButtons = () => {
    const { id } = product;
    if(id) {
      return (
        <React.Fragment>
          <Button size="small">SAVE UPDATES</Button>
          <Button size="small" type="danger" className="ml--lg">REMOVE</Button>
          <Button size="small" onClick={()=>backToListing()} className="ml--lg" outline>CANCEL</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Button size="small" onClick={()=>console.log(product)} >SAVE PRODUCT</Button>
          <Button size="small" onClick={()=>backToListing()} className="ml--lg" outline>CANCEL</Button>
        </React.Fragment>
      )
    }
  }
  
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      debugger;
      const product = products.filter((p)=>p.id==id)[0];
      setProduct(product);
    }
    
  },[]);

  const dropImage = (param) => {
      console.log(param);
  };

  const { id, description, name, price, stock, promotionalPrice, images, inputValidation } = product;

  return (
    <div>
      <Grid transparent className='image--selection'>
        <label>Fotos dos seus produtos</label>
        {images.map((image, i) => (
        <div className='col-1-4'>
          <Dropzone value={image} index={i} onDrop={(e) => dropImage(e)}/>
        </div>
        ))}
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