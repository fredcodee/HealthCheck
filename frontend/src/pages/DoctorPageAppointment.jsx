import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Api from '../Api'
import '../assets/styles/css/profilePage.css'
import bg from '../assets/img/bg1.jpg'
import userImg from '../assets/img/user.jpg'
import PopUp from '../components/Popup'

function DoctorPageAppointment() {
    const { id } = useParams();
    const token = localStorage.getItem('token') || false
    const [doctorDetails, setDoctorDetails] = useState([])
    const [freeSchedules, setFreeSchedules] = useState([])
    const [showPopUpForBookAppointment, setShowPopUpForBookAppointment] = useState(false)
    const [scheduleId, setScheduleId] = useState('')
    const [scheduleTime, setScheduleTime] = useState('')
    const [reason , setReason] = useState('')
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const [error, setError] = useState('')
    const history = useNavigate();

    useEffect(() => {
        getDoctorProfile()
    }, [])


    const togglePopUpForBookAppointment = () => {
        setShowPopUpForBookAppointment(!showPopUpForBookAppointment)
    }

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

    const bookAppointment = async (doctorId, scheduleId, reason) => {
        try {
            const data = {
                doctorId: doctorId,
                scheduleId: scheduleId,
                reason: reason
            }
            await Api.post('api/book-appointment', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        togglePopUpForBookAppointment()
                        history('/appointments/status')
                    } else {
                        setError("error occured, please try again")
                    }
                })
        }
        catch (error) {
            if (error.response.status == 401) {
                setError('unauthorized user');
            }
            else{
            setError(`An error occured while trying to update appointment status, try again later :)`)}
        }
    }

    return (
        <div className='container'>
            <div className='pt-3'>
                <a href="/dashboard" style={{ color: 'green' }}>Back to Home</a>
            </div>
            <div className='pt-3'>
                {error && <div className='alert alert-danger'>
                    {error == "unauthorized user" ? <p>Please upgrade your account to use this feature <span><a href="/pricing">Upgrade</a></span></p> : error}
                    </div>}
            </div>

            <div className='text-center'>
                <h1>Book An Appointment with {doctorDetails.name}</h1>
            </div>

            <div>
                    {/* for popup for booking appointment */}
                    {showPopUpForBookAppointment && <PopUp
                        content={<>
                            <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" , backgroundColor: "white"}}>
                                    <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700 ">
                                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 text-center">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Book Appointment
                                            </h3>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <div>
                                                <h3>Reason *</h3>
                                                <input type="text" name="reason" onChange={e => setReason(e.target.value)} 
                                                style={{ width: "100%" }}
                                                placeholder='pleas enter your reason for this appointment' 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                            </div>
                                            <div className='text-center p-3' style={{color: 'black'}}>
                                                <p>Are you sure you want to book an appointment with {doctorDetails.name} for {scheduleTime} ?</p>
                                                <button className="btn btn-primary" onClick={() => bookAppointment(doctorDetails._id, scheduleId, reason)}>Book</button>
                                                <button className="btn btn-secondary " onClick={togglePopUpForBookAppointment}>Cancel</button>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                    />}
                </div>

            <div>
                <div className="content-profile-page">
                    <div className="profile-user-page card">
                        <div className="img-user-profile">
                            <img className="profile-bgHome" src={bg} />
                            <img className="avatar" src={doctorDetails.profile_image_name != null ? `${imageSrc}/images/${doctorDetails.profile_image_name}`
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
                            <li style={{ color: 'black' }}><strong>9/10</strong><span>Ratings</span></li>
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
                    {Object.keys(freeSchedules).length > 0 ?
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
                                                })} <span className='mr-4'><a href="#" className="btn btn-primary"onClick={() => { 
                                                    const formattedStartTime = new Date(event.startTime).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    });
                                                    const formattedEndTime = new Date(event.endTime).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    });
                                                    const date = new Date(event.startTime).toLocaleDateString('en-US'); // Assuming you want to set the date part as well
                                        
                                                    togglePopUpForBookAppointment(); 
                                                    setScheduleId(event._id); 
                                                    setScheduleTime(`${date}, ${formattedStartTime} to ${formattedEndTime}`);
                                                }}>Book This time</a></span>
                                            </p>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )) : <p>No available schedules</p>}

                </div>

            </div>

        </div>
    )
}

export default DoctorPageAppointment
