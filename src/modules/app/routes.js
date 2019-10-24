import { Login } from 'modules/user';
import { ProductList, ProductForm } from 'modules/product';

const Routes = [{
  private: false,
  path: '/products',
  title: 'Meus Produtos',
  layout: 'logged',
  component: ProductList
}, {
  private: false,
  path: '/products/new',
  title: 'Adicionar Produto',  
  layout: 'logged',
  component: ProductForm
}, {
  private: false,
  path: '/products/edit/:id',
  title: 'Editar Produto',  
  layout: 'logged',
  component: ProductForm
}];


export default Routes;
