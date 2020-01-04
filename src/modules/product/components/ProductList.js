import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from 'contexts'
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';


import { Grid } from 'components/grid';
import { Table } from 'components/table'; 
import { Checkbox } from 'components/input';
import { ButtonIcon } from 'components/button';
import { Image } from 'components/image';
import { Pagination } from 'components/pagination';



const ProductList = () => {

  const [pagination, setPagination] = useState( { page: 0,  maxItems: 3});
  const { page, maxItems } = pagination;
  const {products, deleteProduct} = useContext(ProductContext);

  const changePage = page => {
    setPagination(prevState => {
      return {...prevState, page};
    });
  }

  useEffect(() => {
    if((maxPages() !== page) && typeof products[page * maxItems] === 'undefined'){
      setPagination(prevState => {
        const ret = {...prevState, page: maxPages()}
        return ret;
      });
    }
  });

  const maxPages = () => {
    return products ? Math.ceil(products.length / (maxItems)) - 1 : 0;
  }

  const talbeRows = [];
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
            <button className='button button--sm' onClick={ ()=> deleteProduct(item.id)}>
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
        <Pagination maxpage={maxPages()} page={pagination.page} changePage={changePage} />        
      </div>
    </div>
  )

}

export default ProductList;