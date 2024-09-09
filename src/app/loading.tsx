import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'><CircularProgress /></div>
  )
}
