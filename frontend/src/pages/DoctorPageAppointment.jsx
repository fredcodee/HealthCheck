import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Api from '../Api'
import Navbar from '../components/Navbar'
import DoctorProfile from '../components/DoctorProfile'
import AvailableSchedules from '../components/AvailableSchedules'
import BookingModal from '../components/BookingModal'
import { ArrowLeft, AlertCircle } from 'lucide-react'

function DoctorPageAppointment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctorDetails, setDoctorDetails] = useState(null)
    const [freeSchedules, setFreeSchedules] = useState([])
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [selectedSchedule, setSelectedSchedule] = useState(null)
    const [error, setError] = useState('')
    const token = localStorage.getItem('token') || null
    const [rating, setRating] = useState(0)
    const [ reviews, setReviews] = useState([])

    useEffect(() => {
        getDoctorProfile()
        getDoctorStats()
        getDoctorReviews()
    }, [id])

    const getDoctorProfile = async () => {
        try {
            const response = await Api.post('api/get-doctor-profile', { doctorId: id }, {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            })
            if (response.status === 200) {
                setDoctorDetails(response.data.doctorDetails)
                setFreeSchedules(Object.entries(response.data.freeSchedules))
            } else {
                setError("An error occurred while fetching doctor details. Please try again.")
            }
        } catch (error) {
            setError("An error occurred while fetching doctor details. Please try again.")
        }
    }

    const getDoctorStats = async () => {
        try{
            await Api.get(`api/doctor-stats/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then((response) => {
                    setRating(response.data.avgRating)
                })
        }
        catch (error) {
            setError("error occured, please try again")
        }
    }

    const getDoctorReviews = async () => {
        try{
            const data = {
                doctorId: id
            }
            await Api.post('api/get-doctor-reviews',data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setReviews(response.data)
                })
        }
        catch (error) {
            setError("error occured, please try again")
        }
    }

    const handleBookAppointment = (scheduleId, scheduleTime) => {
        setSelectedSchedule({ id: scheduleId, time: scheduleTime })
        setShowBookingModal(true)
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
                        setShowBookingModal(false)
                        navigate('/appointments/status')
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
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/appointment')}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to search
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {doctorDetails && (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">
                            Book An Appointment With Dr. {doctorDetails.name}
                        </h1>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <DoctorProfile doctor={doctorDetails} numOfReviews={reviews.length} rating={rating} />
                            </div>
                            <div className="lg:col-span-2">
                                <AvailableSchedules 
                                    schedules={freeSchedules} 
                                    onBookAppointment={handleBookAppointment}
                                />
                            </div>
                        </div>
                    </>
                )}

                {showBookingModal && selectedSchedule && (
                    <BookingModal
                        doctorName={doctorDetails.name}
                        scheduleTime={selectedSchedule.time}
                        onClose={() => setShowBookingModal(false)}
                        onBook={(reason) => {
                            bookAppointment(id, selectedSchedule.id, reason)
                        }}
                    />
                )}
            </main>
        </div>
    )
}

export default DoctorPageAppointment

