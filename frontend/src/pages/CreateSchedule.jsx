import React, { useEffect } from 'react'
import Api from '../Api'
import ScheduleForm from '../components/ScheduleForm'

const CreateSchedule = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false
    const token = localStorage.getItem('token') || false

    useEffect(() => {
        if (accountType != 'Doctor') {
            window.location.href = '/dashboard'
        }
    }, [])



  return (
    <div className='container'>
         <div>
            <a href="/dashboard"  style={{color: 'green'}}>Back to Home</a>
        </div>
        <div className='text-center'>
            <h1>Create Your Schedule</h1>
            <ScheduleForm />
        </div>
        <hr />
        <div>
            <div>
                <h3>Your current schedules</h3>
            </div>
            <div>
                
            </div>
        </div>
        
    </div>
  )
}

export default CreateSchedule