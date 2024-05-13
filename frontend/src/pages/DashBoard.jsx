import React from 'react'

const DashBoard = () => {
  const token = localStorage.getItem('token') || false
  const type =  localStorage.getItem('type') || false

  return (
    <div>
      <div>
        {
          type.replace(/"/g, '') == 'Free' ?
            <div className='text-center' style={{ color: 'black' , fontFamily: 'cursive'}}>You currently using a free trial, <span style={{ color: 'green' }}> <a href="/pricing">Upgrade your plan to have no restriction</a></span></div> :
            <div></div>
        }
      </div>

      <h1>Dashboard</h1>
    </div>
  )
}

export default DashBoard