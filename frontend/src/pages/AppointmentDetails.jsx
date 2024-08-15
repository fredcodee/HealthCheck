import React, { useState, useEffect } from 'react'
import Api from '../Api'
import { useParams } from 'react-router-dom'

const AppointmentDetails = () => {
    const { id } = useParams()
    const [appointment, setAppointment] = useState([])
    const [error, setError] = useState('')
    const [loading , setLoading] = useState(false)
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
    return (
        <div className='container'>

            {error && <p className="error">{error}</p>}
            {!error && appointment?.length == 0 && <p>Loading appointment details...</p>}
            {!error && loading && 
                <div>
                    <div className="text-center pt-3">
                        <h1>Appointment Details</h1>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <p>Doctor: <span style={{ color: 'black', fontWeight: 'bold' }}>{appointment?.doctor_id.name} </span></p>
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
                            <p>Status: <span style={{ color: 'orange' }}>{appointment?.status}</span></p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AppointmentDetails