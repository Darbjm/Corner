import React from 'react'
import Button from '../button'
import { PaginationContainter } from './Pagination.style'
export interface Props {
    foodsPerPage: number;
    totalFoods: number;
    pageNumber: number;
    setCurrentPage: (number: number) => void;
    setSearch: (search: string) => void
}

const Pagination = ({ foodsPerPage, totalFoods, setCurrentPage, setSearch, pageNumber }: Props) => {
    const pageNumbers = []

    const paginate = (event: React.ChangeEvent<HTMLButtonElement>, pageNumber: number) => {
        setCurrentPage(pageNumber)
        setSearch('')
      }

    for (let i = 1; i <= Math.ceil(totalFoods / foodsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
            <PaginationContainter>
                {pageNumbers.map((number: number) => (
                    pageNumber === number 
                        ? <Button style={{width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px'}} font='primary' key={number} isFullWidth={false} color='primary' buttonSize='small' handleClick={(event: React.ChangeEvent<HTMLButtonElement>) => paginate(event, number)}>{number}</Button> 
                        : <Button style={{width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px'}} font='primary' key={number} isFullWidth={false} color='secondary' buttonSize='small' handleClick={(event: React.ChangeEvent<HTMLButtonElement>) => paginate(event, number)}>{number}</Button>
                        ))}
            </PaginationContainter>
    )
}

export default Pagination
