import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ProductList, ProductForm } from 'modules/product';
import { Logged, External } from 'components/layout';
import { ProductContextProvider, AuthContextProvider } from 'contexts';
import { LoginForm } from 'modules/app';

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

    <Route exact path={'/login'} render={routerProps => (
      <External>
        <AuthContextProvider>
          <LoginForm {...routerProps} />
        </AuthContextProvider>
      </External>
    )} />

    <Redirect to={"/login"} />
  </Switch>
)

export default Routing;