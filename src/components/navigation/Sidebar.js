import React, { useContext } from 'react';
import { AuthContext } from 'contexts';

import classname from 'classname';

import { ButtonIcon } from 'components/button';

const Sidebar = (props) => {

 const initUser = {
    sidebarOpen: true,
    userName: 'Pablo Radomski',
    storeName: 'Luca Store Baby',
    storeLink: 'teste-brasil.lojavirtual.seudominino.lojavirtual.com.br.compremania',
    storeLogo: 'https://image.ibb.co/dBScXd/Captura_de_Tela_2018_05_31_a_s_14_51_07.png',
    email: null,
    id: null
  }
  
  const {auth} = useContext(AuthContext); 
  const {user} = auth; 
  
  const { name } = user
  const sidebarOpen = true

  const storeName = 'Luca Store Baby'
  const storeLogo = 'https://image.ibb.co/dBScXd/Captura_de_Tela_2018_05_31_a_s_14_51_07.png'
  const storeLink = 'teste-brasil.lojavirtual.seudominino.lojavirtual.com.br.compremania'

  const classComponent = classname('sidebar', {
    'sidebar--closed': !sidebarOpen
  });

  return (
    <div className={classComponent}>
      <div className="sidebar--header">
        <div className="store--info">
          <img src={storeLogo} height="40"/>
          <div>
          <div className="title">{storeName}</div>
          <div className="user">{name}</div>
          </div>
        </div>
        <ButtonIcon clamp outline block icon='external' pos='right'>{storeLink}</ButtonIcon>
      </div>
      <div className="sidebar--content">
        {props.children}
      </div>
    </div>
  )
}

export default Sidebar;