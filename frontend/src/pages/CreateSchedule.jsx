import React, { useEffect, useState } from 'react'
import Api from '../Api'
import ScheduleForm from '../components/ScheduleForm'

const CreateSchedule = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        if (accountType != 'Doctor') {
            window.location.href = '/dashboard'
        }
        getSchedules()
    }, [])

    const getSchedules = async () => {
        try {
            const schedules = await Api.get('api/get-schedules', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setSchedules(Object.entries(schedules.data))
        } catch (error) {
            setError(`An error occured while trying to get schedules`)
        }
    }

    const deleteSchedule = async (id) => {
        try {
            await Api.delete(`api/delete-schedule/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            getSchedules()
            setSuccess(`Schedule deleted successfully`)
        } catch (error) {
            setError(`An error occured while trying to delete schedule`)
        }
    }



    return (
        <div className='container'>
            <div>
                <a href="/dashboard" style={{ color: 'green' }}>Back to Home</a>
            </div>
            <div>
                {error ? <div className='alert alert-danger'>{error}</div> : null}
                {success ? <div className='alert alert-success'>{success}</div> : null}
            </div>
            <div className='text-center'>
                <h1>Create Your Schedule</h1>
                <ScheduleForm onSuccess={getSchedules} />
            </div>
            <hr />
            <div>
                <div>
                    <h3>Your current schedules</h3>
                </div>
                <div>
                    {schedules.map(([date, events], index) => (
                        <div key={index} className="card w-50">
                            <div className="card-body">
                                <h4 className="card-title">{date}</h4>
                                {events.map(event => (
                                    <div key={event._id}>
                                            <p className="card-text">
                                                <span>From</span> {new Date(event.startTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })} <span>To</span> {new Date(event.endTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })} <span className='pl-3'><a href="#" className="btn btn-danger" onClick={() => deleteSchedule(event._id)}>Delete</a></span>
                                            </p>
                                            <p><span style={{ color: 'green' }}>status:</span> {event.taken ? 'Taken' : 'Available'}</p>
                                            
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default CreateSchedule