import Pagination from './Pagination';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Pagination',
  component: Pagination,
};

const setCurrentPage = (pageNumber: number) => {
  console.log(pageNumber)
}

const pageNumber = 1

const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

export const Field = () => {
  return (
    <BrowserRouter>
    <>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
        <Pagination foodsPerPage={10} totalFoods={100} paginate={paginate}/>
    </div>
    </>
    </BrowserRouter>
  );
};

Field.story = {
  name: 'Pagination sizes',
};