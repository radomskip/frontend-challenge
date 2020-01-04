import React, { createContext, useState } from 'react';
 
export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const initProducts = [
        {
          id: '1',
          name: 'Babero',
          stock: '1',
          price: '2.20',
          promotionalPrice: '2.00',
          images: []
        },
        {
          id: '2',
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
          images: []
        },
        {
          id: '4',
          name: 'Medias',
          stock: '6',
          price: '12.70',
          promotionalPrice: '10.00',
          images: []
        },
        {
          id: '5',
          name: 'Gorra',
          stock: '1',
          price: '6.00',
          promotionalPrice: '4.00',
          images: []
        },  
        {
          id: '6',
          name: 'Oleo',
          stock: '6',
          price: '12.70',
          promotionalPrice: '10.01',
          images: []
        },
      ];

    const [products, setProducts] = useState(initProducts);   

    const deleteProduct = (id) => { 
        setProducts(products.filter( (p) => p.id !== id ))
    };
    
    return (
        <ProductContext.Provider value={{products: [...products], deleteProduct}}>
            {props.children}
        </ProductContext.Provider>
    );

}
 
export default ProductContextProvider;