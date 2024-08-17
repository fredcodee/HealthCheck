import React, { useState, useEffect } from 'react'
import Api from '../Api'
import { useParams } from 'react-router-dom'

const AppointmentDetails = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false
    const { id } = useParams()
    const [appointment, setAppointment] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const token = localStorage.getItem('token') || false

    useEffect(() => {
        getAppointmentDetail();
    }, [])

    const getAppointmentDetail = async () => {
        try {
            await Api.get(`api/get-appointment-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setAppointment(response.data);
                    setLoading(true);
                } else {
                    setError("An error occured while trying to get appointment details");
                }
            })
        } catch (error) {
            setError(`An error occured while trying to get appointment details`)
        }
    }

    const updateAppointmentStatus = async (appointmentId, scheduleId, status) => {
        try {
            const data = {
                appointmentId: appointmentId,
                scheduleId: scheduleId,
                status: status
            }

            await Api.post('api/update-appointment', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setError(false);
                    getAppointmentDetail();
                    setSuccess('Appointment status updated successfully');
                } else {
                    setError('An error occured while trying to update appointment status');
                }
            })

        } catch (error) {
            setError(`An error occured while trying to update appointment status`)
        }
    }

    return (
        <div className='container'>
            <div className='pt-3'>
                <a href="/appointments/status" style={{ color: 'green' }}>Back to Appointment page</a>
            </div>

            {error && <div className='alert alert-danger'>{error}</div>}
            {!error && success && <div className="alert alert-success">{success}</div>}
            {!error && appointment?.length == 0 && <p>Loading appointment details...</p>}
            {!error && loading &&
                <div>
                    <div className="text-center pt-3">
                        <h1>Appointment Details</h1>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <p>Doctor: <span style={{ color: 'black', fontWeight: 'bold' }}><a href={`/doctor-appointment/${appointment?.doctor_id._id}`}>{appointment?.doctor_id.name} </a></span></p>
                            <p>Patient: <span style={{ color: 'black', fontWeight: 'bold' }}>{appointment?.user_id.name}</span></p>
                            <p>Date: {new Date(appointment?.schedule_id.date).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}</p>
                            <p>Time: {new Date(appointment?.schedule_id.startTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })} <span>To</span> {new Date(appointment?.schedule_id.endTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                            </p>
                            <p>Reason: <span style={{ color: 'black', fontWeight: 'bold' }}>{appointment?.reason}</span></p>
                            <p>Status: <span style={{ color: 'orange' }}>{appointment?.status}</span></p>

                            {accountType == 'Doctor' &&
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Update Status
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div>
                                            <a className="dropdown-item" onClick={(e) => updateAppointmentStatus(appointment?._id, appointment?.schedule_id, 'accepted')}>
                                                <div>
                                                    <p>Accept</p>
                                                </div>
                                                <hr className='mt-2' />
                                            </a>
                                            <a className="dropdown-item" onClick={(e) => updateAppointmentStatus(appointment?._id, appointment?.schedule_id, 'cancelled')}>
                                                <div>
                                                    <p>Cancel</p>
                                                </div>
                                                <hr className='mt-2' />
                                            </a>
                                            <a className="dropdown-item" onClick={(e) => updateAppointmentStatus(appointment?._id, appointment?.schedule_id, 'completed')}>
                                                <div>
                                                    <p>Completed</p>
                                                </div>
                                                <hr className='mt-2' />
                                            </a>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AppointmentDetails