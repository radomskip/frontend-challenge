import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';


import { Grid } from 'components/grid';
import { Table } from 'components/table'; 
import { Checkbox } from 'components/input';
import { Button, ButtonIcon } from 'components/button';
import { Image } from 'components/image';

const ProductList = () => {
  const initProducts = {
    page: 0,
    maxItems: 3,
    products: [
      {id: '1',
      name: 'Babero',
      stock: '1',
      price: '2.20',
      promotionalPrice: '2.00',
      images: []},
      {id: '2',
      name: 'Pantalon',
      stock: '6',
      price: '12.70',
      promotionalPrice: '10.00',
      images: []},
      {id: '3',
      name: 'Mamadera',
      stock: '1',
      price: '2.20',
      promotionalPrice: '2.00',
      images: []},
      {id: '4',
      name: 'Medias',
      stock: '6',
      price: '12.70',
      promotionalPrice: '10.00',
      images: []},
      {id: '5',
      name: 'Gorra',
      stock: '1',
      price: '6.00',
      promotionalPrice: '4.00',
      images: []},
      {id: '6',
      name: 'Oleo',
      stock: '6',
      price: '12.70',
      promotionalPrice: '10.00',
      images: []},      
  ]
  }

  const [productsState, setProducts] = useState(initProducts);

  const changePage = page => {
    setProducts(prevState => {
      return {...prevState, page};
    });
  }

  useEffect(() => {
    const maxPages = productsState.maxPages;
    const { products, page, maxItems } = productsState;    

    if((maxPages !== page) && typeof products[page * maxItems] === 'undefined'){
      setProducts(prevState => {
        const ret = {...prevState, page: maxPages}
        return ret;
      });
    }
  });

  const maxPages = () => {
    const { products, maxItems } = productsState;    
    return Math.ceil(products.length / (maxItems)) - 1;
  }

  const paginationRender = () => {
    debugger;
    const numPages = maxPages();
    const pages = [];
    const { page } = productsState;
    
    for (let i = 0; i <= numPages; i++ ) {
      pages.push(<Button outline={page === i} onClick={() => changePage(i)} className="mr--md">{i + 1}</Button>);
    }

    if(pages.length === 1) {
      return null;
    }

    return pages;
  }

  const { products, page, maxItems } = productsState;
  const talbeRows = []

  if(isEmpty(products)){
    return (
      <div className="empty-list">
        Você ainda não possui nenhum produto cadastrado, 
        crie um <Link to="/products/new">novo produto</Link> primeiro
      </div>
    );
  }

  for(let i = 0; i < maxItems; i++) {
    const index = (page * maxItems) + i;
    const item = products[index];
    const image = (item && item.images) ? item.images[0] : null;
    
    if(item) {
      const row = (
        <tr key={index}>
          <td>
            <label htmlFor={`select-product-${index}`} className='check--container'> 
              <input type="checkbox" id={`select-product-${index}`}/>
              <span className="check"/>
            </label>
          </td>
          <td>
            <div className="product--detail">
              <Image bg={image}/>
              <Link to={`/products/edit/${item.id}`}>{item.name}</Link>
            </div>
          </td>
          <td>{item.stock}</td>
          <td>$ {item.price}</td>
          <td>$ {item.promotionalPrice}</td>
          <td>{item.price}</td>
          <td>
            <Link to={`/products/edit/${item.id}`}><ButtonIcon size="small" transparent icon='edit'>Edit</ButtonIcon></Link>
            <button className='button button--sm'>
              <div className='text'>Remove</div>
            </button>
          </td>
        </tr>
      );

      talbeRows.push(row);
    }
  }

  return (
    <div>
      <Grid nopadding>
        <Table>
          <thead>
            <tr>
              <th width={40} className="all">
                <Checkbox name="select-all"/>
              </th>
              <th width={300}>Produto</th>
              <th>Stock</th>
              <th>Original price</th>
              <th>Promocional price</th>
              <th>Variations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {talbeRows}
          </tbody>
        </Table>
      </Grid>

      <div className="table--pagination">
        {paginationRender()}
      </div>
    </div>
  )

}

export default ProductList;