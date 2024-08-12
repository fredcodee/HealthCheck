import React, { useEffect , useState} from 'react'
import Api from '../Api'

const AppointmentStatusPage = () => {
    const [account_type, setAccountType] = useState('')
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    const token = localStorage.getItem('token') || false

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
            console.log(response.data)
        } catch (error) {
            console.error(error)
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
            console.error(error)
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
            console.error(error)
        }
    }
    return (
        <div>AppointmentStatusPage
            <div>
                <h3>pending Appointments</h3>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => getPendingAppointments()}>
                       view all
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                            pendingAppointments?.map((appointment, index) => {
                                return (
                                    <a className="dropdown-item" key={index}>
                                        <div>
                                            <p>Doctor: {appointment.doctor_id.name} </p>
                                            <p>Patient: {appointment.user_id.name}</p>
                                            <p>Date: {appointment.schedule_id.date}</p>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <h3>Upcoming Appointments</h3>
            </div>
            <div>
                <h3>Past Appointments</h3>
            </div>

        </div>
    )
}

export default AppointmentStatusPage