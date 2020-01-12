import React from 'react';
import { AuthContextProvider } from 'contexts';
import { Header, Sidebar } from 'components/navigation';
import { ListItemLink } from 'components/list';

const Logged = (props) => {
  return (
    <div className="container">
      <AuthContextProvider>
      <Sidebar >
          <ul>
            <ListItemLink to="/products" icon="list">Products listing</ListItemLink>
            <ListItemLink to="/products/new" icon="add">Prodct add</ListItemLink>
          </ul>
        </Sidebar>
      </AuthContextProvider>
      
      <div className="main">
        <Header />
        <div className="content">
          {React.cloneElement(props.children, props)}
        </div>
      </div>
    </div>
  )
}

export default Logged;