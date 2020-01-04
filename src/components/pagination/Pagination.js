import React from 'react';
import { Button } from 'components/button';

const Pagination = (props) => {

    const pages = [];
    const { maxpage, page, changePage} = props;
    
    for (let i = 0; i <= maxpage; i++ ) {
      pages.push(<Button outline={page === i} onClick={() => changePage(i)} className="mr--md">{i + 1}</Button>);
    }

    if(pages.length === 1) {
      return null;
    }

    return pages;
  }

  export default Pagination;