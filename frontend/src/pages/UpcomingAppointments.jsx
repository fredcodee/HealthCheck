import React, { useState, useEffect } from 'react'
import Api from '../Api'

const UpcomingAppointments = () => {
  const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token') || false

  useEffect(() => {
    getUpcomingAppointments()
  }, [])

  const getUpcomingAppointments = async () => {
    try {
      let apiEndpoint = ""
      if (accountType == 'Patient') {
        apiEndpoint = "api/get-upcoming-appointments-patient"
      }
      if (accountType == 'Doctor') {
        apiEndpoint = "api/get-upcoming-appointments-doctor"
      }
      await Api.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      }).then((response) => {
        if (response.status == 200) {
          setUpcomingAppointments(response.data)
        }
      })
    }
    catch (error) {
      setError("error occured, please try again")
    }
  }



  return (
    <div className='container'>
      <div className='pt-3'>
        <a href="/dashboard" style={{ color: 'green' }}>Back to Dashboard</a>
      </div>
      {error && <div className='alert alert-danger'>
        {error == "unauthorized user" ? <p>Please upgrade your account to use this feature <span><a href="/pricing">Upgrade</a></span></p> : error}
      </div>}

      <div className='pt-3 text-center'>
        <h3>Upcoming Appointments</h3>
      </div>

      <div>
        <div>
          <ul className="list-group">
            {upcomingAppointments.length > 0 ? <>{
              upcomingAppointments.map((appointment, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    <div>
                      <p>Doctor: <span style={{ color: 'black', fontWeight: 'bold' }}>{appointment.doctor_id.name} </span></p>
                      <p>Patient: <span style={{ color: 'black', fontWeight: 'bold' }}>{appointment.user_id.name}</span></p>
                      <p>Date: {new Date(appointment.schedule_id.date).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}</p>
                      <p>Time: {new Date(appointment.schedule_id.startTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })} <span>To</span> {new Date(appointment.schedule_id.endTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                      </p>
                      <p>Status: <span style={{ color: 'orange' }}>{appointment.status}</span></p>
                    </div>
                  </li>
                )
              })
            }</> : <li className="list-group-item">No upcoming appointments at the moment</li>}
          </ul>
        </div>

      </div>


    </div>

  )
}

export default UpcomingAppointments