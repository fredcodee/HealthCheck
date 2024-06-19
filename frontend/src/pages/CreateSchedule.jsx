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
            setSchedules(schedules.data)
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
            console.error(error)
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
                <ScheduleForm  onSuccess={getSchedules} />
            </div>
            <hr />
            <div>
                <div>
                    <h3>Your current schedules</h3>
                </div>
                <div>
                    {schedules.map((schedule, index) => (
                        <div key={index}>
                            <div className="card w-50">
                                <div className="card-body">
                                    <h5 className="card-title">{new Date(schedule.date).toLocaleDateString('en-US')}</h5>
                                    <p className="card-text"><span>From</span> {new Date(schedule.startTime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })} <span>To</span>  {new Date(schedule.endTime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}</p>
                                    <a href="#" className="btn btn-danger" onClick={() => deleteSchedule(schedule._id)}>Delete</a>
                                </div>
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