import React,{useEffect, useState} from 'react'
import Api from '../Api'
import Navbar from '../components/Navbar'


const DashBoard = () => {
  const token = localStorage.getItem('token') || false
  const type =  localStorage.getItem('type') || false
  const accountType = localStorage.getItem('AccountType') ? localStorage.getItem('AccountType').replace(/"/g, '') : null;
  const [user, setUser] = useState('')
  const [error, setError] = useState('')

  useEffect(()=>{
    getProfile()
  }, [])


  const getProfile = async ()=>{
    try{
      await Api.get('api/user/profile', {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      }).then((response)=>{
        if(response.status == 200){
          setUser(response.data)
        }
      })
    }
    catch(error){
      setError("An error occured while trying to get profile details")
    }

  }

  return (
    <div>
      <Navbar />
      <div className='container'>
      <div>
        { type ?(
          type.replace(/"/g, '') == 'Free' ?
          <div className='text-center' style={{ color: 'black' , fontFamily: 'cursive'}}>You currently using a free trial, <span style={{ color: 'green' }}> <a href="/pricing">Upgrade your plan to have no restriction</a></span></div> :
          <div></div>
        ):(
          <div></div>
        )
        }
      </div>
      <div className="text-center pt-3">
        <h1>Dashboard</h1>
      </div>
      {accountType == 'Doctor' ? 
        (
          <div>
            <div>
              <div className='card'>
                <a href= "/create-schedule">
                  <div className='card-body'>
                    Create your Schedule
                  </div>
                </a>
              </div>
              
              <div className='card'>
                <a href="/appointments/status">
                  <div className='card-body'>
                  Appointments and status
                  </div>
                </a>
              </div>

              <div className='card'>
                <a href={`/doctor-reviews/${user._id}`}>
                  <div className='card-body'>
                  Reports, Reviews and comments
                  </div>
                </a>
              </div>
              <div className='card'>
                <a href="/upcoming-appointments">
                  <div  className='card-body'>
                    Upcoming Appointments
                  </div></a>
              </div>
              <hr />
              

            </div>
          </div>
        ) 
          : 
        (
          <div>
            <div>
              <div className='card'>
                <a href="/appointment">
                  <div className='card-body'>
                  Book an Appointment
                  </div>
                </a>
              </div>
              
              <div className='card'>
                <a href="/appointments/status">
                  <div className='card-body'>
                  View your Appointments and status
                  </div>
                </a>
              </div>

              <div className='card'>
                <a href='/reviews'>
                  <div className='card-body'>
                  View your Reviews and comments
                  </div>
                </a>
              </div>
              <div className='card'>
                <a href="/upcoming-appointments">
                  <div  className='card-body'>
                  Upcoming Appointments
                  </div></a>
              </div>
              <hr />
              

            </div>
          </div>
        ) }
    </div>
    </div>
    
  )
}

export default DashBoard