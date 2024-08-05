import React ,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Api from '../Api'
import '../assets/styles/css/profilePage.css'
import bg from '../assets/img/bg1.jpg'
import userImg from '../assets/img/user.jpg'

function DoctorPageAppointment() {
    const { id } = useParams();
    const token = localStorage.getItem('token') || false
    const [doctorDetails, setDoctorDetails] = useState([])
    const [freeSchedules, setFreeSchedules] = useState([])
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const [error, setError] = useState('')

    useEffect(() => {
        getDoctorProfile()
    }, [])

    const getDoctorProfile = async () => {
        try {
            const data = {
                doctorId: id
            }
            await Api.post('api/get-doctor-profile', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setDoctorDetails(response.data.doctorDetails)
                        setFreeSchedules(Object.entries(response.data.freeSchedules))
                    } else {
                        setError("error occured, please try again")
                    }
                })
        }
        catch (error) {
            setError("error occured, please try again")
            console.error(error)
        }
    }

    const bookAppointment = async (scheduleId) => {
        try {
            const data = {
                scheduleId: scheduleId
            }
            await Api.post('api/book-appointment', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setError("Appointment booked successfully")
                    } else {
                        setError("error occured, please try again")
                    }
                })
        }
        catch (error) {
            setError("error occured, please try again")
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <div className='pt-3'>
                <a href="/dashboard" style={{ color: 'green' }}>Back to Home</a>
            </div>
            <div className='pt-3'>
                {error ? <div className='alert alert-danger'>{error}</div> : null}
            </div>

            <div className='text-center'>
                <h1>Book An Appointment with {doctorDetails.name}</h1>
            </div>

            <div>
            <div className="content-profile-page">
                    <div className="profile-user-page card">
                        <div className="img-user-profile">
                            <img className="profile-bgHome" src={bg} />
                            <img className="avatar" src={ doctorDetails.profile_image_name != null ? `${imageSrc}/images/${doctorDetails.profile_image_name}` 
                                : userImg} alt="jofpin" />
                        </div>
                        <div className="user-profile-data">
                            <h1>{doctorDetails.name}</h1>
                            <p className='account-type-text'>{doctorDetails.account_type}</p>
                        </div>
                        <div className="description-profile" style={{ paddingBottom: '2rem', fontSize: '15px' }}>{doctorDetails.bio}</div>
                        <div className="description-profile">
                            <p>Country: {doctorDetails.country}</p>
                            <p>City: {doctorDetails.city}</p>
                            <p>Age: {doctorDetails.age}</p>
                            <p>Phone: {doctorDetails.phone}</p>
                            <p>Gender: {doctorDetails.gender}</p>
                        </div>
                        <ul className="data-user">
                            <li><a><strong>339</strong><span>Appointments</span></a></li>
                            <li><a><strong>9/10</strong><span>Ratings</span></a></li>
                            <li><a><strong>444</strong><span>Reviews</span></a></li>

                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div className='text-center'>
                    <h3>Available Schedules</h3>
                </div>
                <div className='text-center'>
                    {Object.keys(freeSchedules).length> 0 ? 
                        freeSchedules?.map(([date, events], index) => (
                            <div key={index} className="card w-50 m-auto">
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
                                                    })} <span className='mr-4'><a href="#" className="btn btn-primary" onClick={() => bookAppointment(event._id)}>Book This time</a></span>
                                                </p>
                                                
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )) :  <p>No available schedules</p>}
                    
                </div>
            </div>

        </div>
    )
}

export default DoctorPageAppointment
