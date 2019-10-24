import React, { Component } from 'react';

import { Header, Sidebar } from 'components/navigation';
import { ListItemLink } from 'components/list';

class Logged extends Component {
  render() {
    return (
      <div className="container">
        <Sidebar>
          <ul>
            <ListItemLink to="/products" icon="list">Listagem de Produtos</ListItemLink>
            <ListItemLink to="/products/new" icon="add">Adicionar um novo produto</ListItemLink>
          </ul>
        </Sidebar>
        
        <div className="main">
          <Header />
          <div className="content">
            {React.cloneElement({ ...this.props }.children, { ...this.props })}
          </div>
        </div>
      </div>
    )
  }
}

export default Logged;