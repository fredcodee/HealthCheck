import React from 'react'
import Navbar from '../components/Navbar'

const CancelPage = () => {
  return (
    <div>
      <Navbar />
      <div className='container text-center'>
        <h1 className='text-danger'>Payment Cancelled</h1>
        <p>Please try again</p>
        <a href="/dashboard"> Back to Home</a>
      </div>
    </div>
  )
}

export default CancelPage