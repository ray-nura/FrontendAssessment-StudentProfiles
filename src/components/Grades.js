import { Typography } from '@mui/material'
import React from 'react'

export default function Grades({ grade }) {
    return (
        <>
            {grade?.map((grade, index) => <Typography > Test{index + 1}:  {grade}%</Typography>)}
        </>
    )
}

