import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ProductList, ProductForm } from 'modules/product';
import { Logged, External } from 'components/layout';
import { ProductContextProvider } from 'contexts'

const Routing = () => (
  <Switch>   
    <Route exact path={'/products'} render={routerProps => (
      <Logged>
        <ProductContextProvider>
          <ProductList {...routerProps} />
        </ProductContextProvider>
      </Logged>
    )} />

    <Route exact path={'/products/new'} render={routerProps => (
      <Logged>
        <ProductContextProvider>
          <ProductForm {...routerProps} />
        </ProductContextProvider>
      </Logged>
    )} />

    <Route exact path={'/products/edit/:id'} render={routerProps => (
      <Logged>
        <ProductContextProvider>
          <ProductForm {...routerProps} />
        </ProductContextProvider>
      </Logged>
    )} />

    <Redirect to={"/products"} />
  </Switch>
)

export default Routing;