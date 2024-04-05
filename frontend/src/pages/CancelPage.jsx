import React from 'react'

const CancelPage = () => {
  return (
    <div className='container text-center'>
        <h1 className='text-danger'>Payment Cancelled</h1>
        <p>Please try again</p>
        <a href="/dashboard"> Back to Home</a>
    </div>
  )
}

export default CancelPage