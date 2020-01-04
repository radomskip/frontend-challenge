import React from 'react';
import classname from 'classname';
import { Link } from 'react-router-dom';

const Breadcumbs = ({ className }) => {

  const classComponent = classname('breadcumbs', className);

  const CurrentBreadcumb = () => {
    return window.location.pathname.includes('edit')
    ? <a href="#">Edit Product</a>
    : <a href="#">Add Product</a>;
  }

  return (
    <ul className={classComponent}>
      <li><Link to={'/products'}>My Products</Link></li>
      <li><CurrentBreadcumb/></li>
    </ul>
  )

};

export default Breadcumbs;