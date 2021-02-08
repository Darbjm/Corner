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

export const Field = () => {
  return (
    <BrowserRouter>
    <>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
        {/* <Pagination foodsPerPage={10} totalFoods={100} setCurrentPage={setCurrentPage}/> */}
    </div>
    </>
    </BrowserRouter>
  );
};

Field.story = {
  name: 'Pagination list',
};