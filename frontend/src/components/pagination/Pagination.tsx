import React from 'react'
import Typography from "../typography"
import { UL, LI } from './Pagination.style'
export interface Props {
    foodsPerPage: number;
    totalFoods: number;
    paginate: (number: number) => void;
}

const Pagination = ({ foodsPerPage, totalFoods, paginate }: Props) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalFoods / foodsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
            <UL>
                {pageNumbers.map((number: number) => (
                    <LI key={number} style={{listStyle: 'none'}}>
                        <Typography style={{ textDecoration: 'none' }} variant='internalLink' handleClick={() => paginate(number)}>{number}</Typography>
                    </LI>
                ))}
            </UL>
    )
}

export default Pagination
