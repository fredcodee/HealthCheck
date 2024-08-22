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
    const [rating , setRating] = useState('')
    const [review, setReview] = useState('')
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
                } 
                 else {
                        setError('An error occured while trying to update appointment status, try again later :)');
                    }
            })

        } catch (error) {
            if (error.response.status == 401) {
                setError('unauthorized user');
            }
            else{
            setError(`An error occured while trying to update appointment status, try again later :)`)}
        }
    }

    const submitReview= async () => {
        try {
            const data = {
                doctorId: appointment.doctor_id,
                comments: review
            }

            await Api.post('api/review-doctor', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setError(false);
                    getAppointmentDetail();
                    setSuccess('Review added successfully');
                } 
                 else {
                        setError('An error occured while trying to add review, try again later :)');
                    }
            })

        } catch (error) {
            if (error.response.status == 401) {
                setError('unauthorized user');
            }
            else{
            setError(`An error occured while trying to add review, try again later :)`)}
        }
    }

    const submitRating = async()=>{
        try{
            const data = {
                appointmentId: appointment._id,
                rating: rating
            }

            await Api.post('api/rate-appointment', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setError(false);
                    getAppointmentDetail();
                    setSuccess('Rating added successfully');
                }
                 else {
                        setError('An error occured while trying to add rating, try again later :)');
                    }
            })
        }catch(error){
            if (error.response.status == 401) {
                setError('unauthorized user');
            }
            else{
            setError(`An error occured while trying to add rating, try again later :)`)}
        }
    }
    return (
        <div className='container'>
            <div className='pt-3'>
                <a href="/appointments/status" style={{ color: 'green' }}>Back to Appointment page</a>
            </div>

            {error && <div className='alert alert-danger'>
                {error == "unauthorized user" ? <p>Please upgrade your account to use this feature <span><a href="/pricing">Upgrade</a></span></p> : error}
                </div>}
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
                            {appointment?.rating && <p>Rating: <span style={{ color: 'black', fontWeight: 'bold' }}>{appointment?.rating}</span></p>}

                            {accountType == 'Doctor' && appointment?.status != 'completed' &&
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
                    <hr />
                    <div className='text-center'>
                        {accountType == 'Patient' && appointment?.status == 'completed' && appointment?.rating == null &&
                            <div>
                                <h3> Rate your Session with {appointment?.doctor_id.name}</h3>
                                <div>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setRating(e.target.value)}>
                                        <option value="0">select rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className='pt-2'>
                                    <button className="btn btn-primary" onClick={submitRating}>Submit Rating</button>
                                </div>
                            </div>
                        }
                        {accountType == 'Patient' && appointment?.status == 'completed' && !appointment?.has_review  &&
                            <div className='mt-5'>
                                <h3> Write a review about {appointment?.doctor_id.name}</h3>
                                <div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setReview(e.target.value)}></textarea>
                                </div>
                                <div className='pt-2'>
                                    <button className="btn btn-primary" onClick={submitReview}>Submit Review</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default AppointmentDetails