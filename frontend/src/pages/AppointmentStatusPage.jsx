import React, { useEffect, useState } from 'react'
import Api from '../Api'
import '../assets/styles/css/appointmentStatusPage.css'

const AppointmentStatusPage = () => {
    const [account_type, setAccountType] = useState('')
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState(null)

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        try {
            await Api.get('api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setAccountType(response.data.account_type)
                    } else {
                        setError(response.data.message)
                    }
                })
        }
        catch (error) {
            setError(error.response.data.message)
        }
    }

    const getPendingAppointments = async () => {
        try {
            const type = account_type
            const params = 'pending'
            const response = await Api.get(`api/appointments/${type}/${params}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setPendingAppointments(response.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const getUpcomingAppointments = async () => {
        try {
            const type = account_type
            const params = 'accepted'
            const response = await Api.get(`api/appointments/${type}/${params}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setUpcomingAppointments(response.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const getPastAppointments = async () => {
        try {
            const type = account_type
            const params = 'completed'
            const response = await Api.get(`api/appointments/${type}/${params}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setPastAppointments(response.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <div className='container'>
            <div className='pt-3'>
                <a href="/dashboard" style={{ color: 'green' }}>Back to Home</a>
            </div>
            <div className='text-center'>
                <div>
                    <h3>Pending Appointments</h3>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => getPendingAppointments()}>
                            view all
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {pendingAppointments?.length == 0 ? <div className='text-center'><p>No pending appointments</p></div> :
                                <div>
                                    {
                                        pendingAppointments?.map((appointment, index) => {
                                            return (
                                                <a className="dropdown-item" key={index} href={`/appointment-details/${appointment._id}`}>
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
                                                    <hr className='mt-2' />
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <hr className='mt-2' />
                <div>
                    <h3>Upcoming Appointments</h3>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => getUpcomingAppointments()}>
                            view all
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {upcomingAppointments?.length > 0 ? (
                                <div>
                                    {
                                        upcomingAppointments?.map((appointment, index) => {
                                            return (
                                                <a className="dropdown-item" key={index}  href={`/appointment-details/${appointment._id}`}>
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
                                                        <p>Status: <span style={{ color: 'blue' }}>{appointment.status}</span></p>
                                                    </div>
                                                    <hr className='mt-2' />
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <p>No past appointments</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <hr className='mt-2' />
                <div>
                    <h3>Past Appointments</h3>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => getPastAppointments()}>
                            view all
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {pastAppointments?.length > 0 ? (
                                <div>
                                    {
                                        pastAppointments?.map((appointment, index) => {
                                            return (
                                                <a className="dropdown-item" key={index}  href={`/appointment-details/${appointment._id}`}>
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
                                                        <p>Status: <span style={{ color: 'grey' }}>{appointment.status}</span></p>
                                                    </div>
                                                    <hr className='mt-2' />
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <p>No History yet</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentStatusPage